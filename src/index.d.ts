
import '@strapi/strapi';

declare module '@strapi/strapi' {
    interface Strapi {
        telegraf: any;
    }
}