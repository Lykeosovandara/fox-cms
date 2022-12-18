"use strict";
/**
 * product controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::product.product', ({ strapi }) => ({
    async findOne(ctx) {
        const orderid = ctx.params.id;
        const data = await strapi.entityService.findOne('api::product.product', orderid, {
            populate: ["images", "varients", "brands"],
        });
        const varients = data.varients;
        let promises = [];
        varients.forEach(({ id }) => {
            promises.push(strapi.entityService.findOne('api::varient.varient', id, {
                populate: ["images"],
            }));
        });
        const varientsResult = await Promise.all(promises);
        return { ...data, varients: varientsResult };
    },
}));
