"use strict";
/**
 * discount-config controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const help_1 = require("../../order/controllers/help");
exports.default = strapi_1.factories.createCoreController('api::discount-config.discount-config', ({ strapi }) => ({
    async find(ctx) {
        const discountes = await strapi.entityService.findMany('api::discount-config.discount-config', {
            limit: 3,
            sort: { createdAt: 'desc' },
        });
        const newDiscount = (0, help_1.orderTotalFromBigger)(discountes);
        return {
            data: newDiscount
        };
    }
}));
