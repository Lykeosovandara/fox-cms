
export default {
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
    ],
};