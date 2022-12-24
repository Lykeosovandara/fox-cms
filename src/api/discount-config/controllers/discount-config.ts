/**
 * discount-config controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::discount-config.discount-config', ({ strapi }) => ({

    async find(ctx) {

        const discountes = await strapi.entityService.findMany('api::discount-config.discount-config', {
            limit: 3,
            sort: { createdAt: 'desc' },
        })

        return discountes;


    }

}));
