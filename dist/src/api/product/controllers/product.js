"use strict";
/**
 * product controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::product.product', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
        return {
            data: "Sucess"
        };
    },
}));
