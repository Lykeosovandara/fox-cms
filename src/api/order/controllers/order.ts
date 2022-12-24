/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import { Strapi } from '@strapi/strapi';
import { calculateDiscount, getDiscountByTotal, orderTotalFromBigger } from "./help";
const { Telegraf } = require('telegraf');


export default factories.createCoreController('api::order.order', ({ strapi }: { strapi: Strapi }) => ({

    async updateProfile(ctx) {

        const { user: { id } } = ctx.state;


        const { image } = ctx.request.body.data;

        if (!image) {
            return ctx.badRequest(' image invalid',);
        }

        await strapi.entityService.update(
            'plugin::users-permissions.user',
            id,
            {
                data: { image }
            }
        );

        return {
            success: true
        }
    },
    async telegramHook(ctx) {

        // const chatId = ctx.request.body.message.chat.id;



        return {
            ok: true
        }
    },

    async find(ctx) {

        const { status, offset = 0, limit = 20 } = ctx.query;
        const { user: { id } } = ctx.state;

        const data = await strapi.entityService.findMany('api::order.order',
            {
                start: offset,
                limit,
                populate: [],
                filters: {
                    owner: {
                        id: {
                            $eq: id
                        }
                    },
                    status: status ?? "Pending"
                }
            }
        )

        return { data };
    },
    async findOne(ctx) {
        // some custom logic here

        const { user: { id } } = ctx.state;

        const orderid = ctx.params.id;


        const data = await strapi.entityService.findOne('api::order.order', orderid, {
            filters: {
                owner: {
                    id: {
                        $eq: id
                    }
                },
            }
        }

        )

        return { data };
    },
    async create(ctx) {

        /// api::discount-config.discount-config

        const { user: { id } } = ctx.state;

        const { cartIds, provinceId, districtId, phone } = ctx.request.body.data;

        if (!cartIds || cartIds.length < 0 || !provinceId || !districtId) {
            return ctx.badRequest(' id is missing', { cartIds, provinceId, districtId })
        }

        /// Promise for cart
        let promises = [];

        cartIds.forEach((id) => {
            promises.push(strapi.entityService.findOne('api::cart.cart', id, {
                populate: ["product", "varient", "varientImage"],
            }));
        });


        const items = await Promise.all(promises); // Carts
        const province = await strapi.entityService.findOne('api::province.province', provinceId);
        const district = await strapi.entityService.findOne('api::district.district', districtId);

        /// Check for invalid id cart
        if (items.includes(null) || !province || !district) {
            return ctx.badRequest(' id invalid', { cartIds, provinceId, districtId })
        }

        // Get all discount
        const discountes = await strapi.entityService.findMany('api::discount-config.discount-config', {
            limit: 3,
            sort: { createdAt: 'desc' },
        })

        const addressDelivery = {
            province,
            district
        }
        const total = items.reduce((a, b) => a + (b.varient.price * b.qty), 0);
        const deliveryCost = district.price;
        const newDiscount = orderTotalFromBigger(discountes);
        const discount = getDiscountByTotal(total, newDiscount);
        const totalDiscount = calculateDiscount(total, discount)

        ctx.request.body.data = { ...ctx.request.body.data, items, total: totalDiscount, owner: id, addressDelivery, province: provinceId, district: districtId, deliveryCost, discount, subTotal: total };

        await strapi.entityService.create("api::order.order", ctx.request.body);

        let promisesdDel = [];

        cartIds.forEach((id) => {
            promisesdDel.push(strapi.entityService.delete('api::cart.cart', id));
        });

        // TELEGRAM BOT
        const telegramAPi = strapi.config.get('telegram.telegramAPI')
        const bot = new Telegraf(telegramAPi, {
            telegram: { webhookReply: true },
        });

        await bot.telegram.sendMessage(-868283463, `
            # ORDER
            Phone: ${phone}
            Provice:  ${province.name}
            District:  ${district.name}

        `, {
            // reply_markup: {
            //     inline_keyboard: [
            //         [{ text: "Delivery", callback_data: `data-` }],
            //     ]

            // }
        });


        return await Promise.all(promisesdDel);


    },

}));    
