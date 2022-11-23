"use strict";
/**
 * cart controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::cart.cart', ({ strapi: Strapi }) => ({
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
        let response = await super.create(ctx);
        const updatedResponse = await strapi.entityService
            .update('api::cart.cart', response.data.id, { data: { owner: id } });
        return updatedResponse;
    },
    async update(ctx) {
        let { id } = ctx.state.user;
        let [cart] = await strapi.entityService
            .findMany('api::cart.cart', {
            filters: {
                id: ctx.request.params.id,
                author: id
            }
        });
        if (cart) {
            const response = await super.update(ctx);
            return response;
        }
        else {
            return ctx.unauthorized();
        }
    }
}));
