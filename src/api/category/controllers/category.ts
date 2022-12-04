/**
 * category controller
 */

import { factories } from '@strapi/strapi'



export default factories.createCoreController('api::category.category', ({ strapi: Strapi }) => ({
    async find(ctx) {
        const data = await strapi.entityService.findMany('api::category.category', {
            populate: { image: true },
            filters: {
                image: {
                    id: {
                        $gte: 1
                    },
                }
            },
        })

        return { data };
    },


}));
