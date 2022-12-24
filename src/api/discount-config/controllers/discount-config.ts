/**
 * discount-config controller
 */

import { factories } from '@strapi/strapi'
import { orderTotalFromBigger } from '../../order/controllers/help';

export default factories.createCoreController('api::discount-config.discount-config', ({ strapi }) => ({

    async find(ctx) {

        const discountes = await strapi.entityService.findMany('api::discount-config.discount-config', {
            limit: 3,
            sort: { createdAt: 'desc' },
        })

        const newDiscount = orderTotalFromBigger(discountes);

        return {
            data: newDiscount
        };

    }

}));
