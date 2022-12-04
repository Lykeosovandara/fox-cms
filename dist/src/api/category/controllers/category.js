"use strict";
/**
 * category controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::category.category', ({ strapi: Strapi }) => ({
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
        });
        return { data };
    },
}));
