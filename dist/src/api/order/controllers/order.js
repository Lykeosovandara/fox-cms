"use strict";
/**
 * order controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::order.order', ({ strapi: Strapi }) => ({
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
            return ctx.badRequest(' id is missing', { cartIds, provinceId, districtId });
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
        if (items.includes(null)) {
            return ctx.badRequest('cart id invalid', { "cartids": cartIds });
        }
        const addressDelivery = {
            province,
            district
        };
        const total = items.reduce((a, b) => a + (b.varient.price, b.qty), 0);
        ctx.request.body.data = { ...ctx.request.body.data, items, total, owner: id, addressDelivery };
        return await super.create(ctx);
        // return items;
    },
}));
