/**
 * cart controller
 */

import { factories, Strapi } from '@strapi/strapi'
import { sanitizeEntity } from "@strapi/utils"

export default factories.createCoreController('api::cart.cart', ({ strapi: Strapi }) => ({
    async find(ctx) {

        const { user: { id } } = ctx.state;
        ctx.query = {
            ...ctx.query,
            filters: {
                owner: {
                    id: {
                        $eq: id
                    }
                },
            },
        };
        let meta = {};
        const data = await strapi.entityService.findMany('api::cart.cart',
            ctx.query
        )

        return { data, meta };
    },
    async create(ctx) {
        const { user: { id } } = ctx.state;

        const { varient } = ctx.request.body.data;
        ctx.request.body.data = { ...ctx.request.body.data, owner: id, publishedAt: Date.now() };

        const [cart] = await strapi.entityService.findMany('api::cart.cart', {
            populate: { varient: true },
            filters: {
                varient: {
                    id: {
                        $eq: varient ?? 0
                    },
                }
            },
        })

        if (cart) {
            let oldQty = cart.qty;
            oldQty += 1;
            const updatedResponse = await strapi.entityService
                .update('api::cart.cart', cart.id, { data: { qty: oldQty } })
            return updatedResponse;
        } else {
            return await strapi.entityService.create("api::cart.cart", ctx.request.body);
        }

    },

    async update(ctx) {
        let { id } = ctx.state.user
        let [cart] = await strapi.entityService
            .findMany('api::cart.cart', {
                filters: {
                    owner: {
                        id: {
                            $eq: id ?? 0
                        },
                    }
                }
            })
        if (cart) {
            const response = await super.update(ctx);
            return response;
        } else {
            return ctx.unauthorized();
        }
    }




}));
