
import '@strapi/strapi';

declare module '@strapi/strapi' {
    interface StrapiInterface {
        telegraf: any;
    }
}