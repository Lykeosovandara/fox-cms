/**
 * cart controller
 */

import { factories, Strapi } from '@strapi/strapi'
import { sanitizeEntity } from "@strapi/utils"

export default factories.createCoreController('api::cart.cart', ({ strapi: Strapi }) => ({
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

            return await super.create(ctx);
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
