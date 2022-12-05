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
        const { varient } = ctx.request.body.data;
        ctx.request.body.data = { ...ctx.request.body.data, owner: id };
        const [cart] = await strapi.entityService.findMany('api::cart.cart', {
            populate: { varient: true },
            filters: {
                varient: {
                    id: {
                        $eq: varient !== null && varient !== void 0 ? varient : 0
                    },
                }
            },
        });
        if (cart) {
            let oldQty = cart.qty;
            oldQty += 1;
            const updatedResponse = await strapi.entityService
                .update('api::cart.cart', cart.id, { data: { qty: oldQty } });
            return updatedResponse;
        }
        else {
            return await strapi.entityService.create("api::cart.cart", ctx.request.body);
        }
    },
    async update(ctx) {
        let { id } = ctx.state.user;
        let [cart] = await strapi.entityService
            .findMany('api::cart.cart', {
            filters: {
                owner: {
                    id: {
                        $eq: id !== null && id !== void 0 ? id : 0
                    },
                }
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
