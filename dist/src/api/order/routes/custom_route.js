"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'PUT',
            path: '/order/profile',
            handler: 'api::order.order.updateProfile',
            config: {
                find: {
                    auth: true
                }
            }
        },
        {
            method: 'POST',
            path: '/order/telegram',
            handler: 'api::order.order.telegramHook',
            config: {
                find: {
                    auth: false
                }
            }
        },
    ],
};
