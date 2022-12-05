/**
 * order controller
 */

import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::order.order', ({ strapi: Strapi }) => ({
    async find(ctx) {
        // some custom logic here

        const { user: { id } } = ctx.state;
        ctx.query = { ...ctx.query, local: 'en', "owner.id": id };
        // console.log(id);


        // Calling the default core action
        const { data, meta } = await super.find(ctx);

        // some more custom logic
        meta.date = Date.now();

        return { data, meta };
    },
    async create(ctx) {
        const { user: { id } } = ctx.state;

        const { cartIds, provinceId, districtId } = ctx.request.body.data;

        if (!cartIds || cartIds.length < 0 || !provinceId || !districtId) {
            return ctx.badRequest(' id is missing', { cartIds, provinceId, districtId })
        }

        let promises = [];

        cartIds.forEach((id) => {
            promises.push(strapi.entityService.findOne('api::cart.cart', id, {
                populate: "*"
            }));
        });



        const items = await Promise.all(promises);
        const province = await strapi.entityService.findOne('api::province.province', provinceId);
        const district = await strapi.entityService.findOne('api::district.district', districtId);

        if (items.includes(null) || !province || !district) {
            return ctx.badRequest(' id invalid', { cartIds, provinceId, districtId })
        }


        const addressDelivery = {
            province,
            district
        }
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
