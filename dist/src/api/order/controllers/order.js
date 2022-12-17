"use strict";
/**
 * order controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::order.order', ({ strapi: Strapi }) => ({
    async find(ctx) {
        const { status, offset = 0, limit = 20 } = ctx.query;
        const { user: { id } } = ctx.state;
        console.log(offset);
        const data = await strapi.entityService.findMany('api::order.order', {
            start: offset,
            limit,
            populate: [],
            filters: {
                owner: {
                    id: {
                        $eq: id
                    }
                },
                status: status !== null && status !== void 0 ? status : "Pending"
            }
        });
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
        });
        return { data };
    },
    async create(ctx) {
        const { user: { id } } = ctx.state;
        const { cartIds, provinceId, districtId } = ctx.request.body.data;
        if (!cartIds || cartIds.length < 0 || !provinceId || !districtId) {
            return ctx.badRequest(' id is missing', { cartIds, provinceId, districtId });
        }
        let promises = [];
        cartIds.forEach((id) => {
            promises.push(strapi.entityService.findOne('api::cart.cart', id, {
                populate: ["product", "varient", "varientImage"],
            }));
        });
        const items = await Promise.all(promises);
        const province = await strapi.entityService.findOne('api::province.province', provinceId);
        const district = await strapi.entityService.findOne('api::district.district', districtId);
        if (items.includes(null) || !province || !district) {
            return ctx.badRequest(' id invalid', { cartIds, provinceId, districtId });
        }
        const addressDelivery = {
            province,
            district
        };
        const total = items.reduce((a, b) => a + (b.varient.price, b.qty), 0);
        const deliveryCost = province.price;
        ctx.request.body.data = { ...ctx.request.body.data, items, total, owner: id, addressDelivery, province: provinceId, district: districtId, deliveryCost };
        await strapi.entityService.create("api::order.order", ctx.request.body);
        let promisesdDel = [];
        cartIds.forEach((id) => {
            promisesdDel.push(strapi.entityService.delete('api::cart.cart', id));
        });
        return await Promise.all(promisesdDel);
    },
}));
