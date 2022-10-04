"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DATABASE_HOST', 'fox-db-do-user-8146940-0.b.db.ondigitalocean.com'),
            port: env.int('DATABASE_PORT', 25060),
            database: env('DATABASE_NAME', 'dev-fox'),
            user: env('DATABASE_USERNAME', 'dev-fox'),
            password: env('DATABASE_PASSWORD', 'AVNS_9IjxctEbwNQGeRmAidZ'),
            ssl: {
                rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
            },
        },
    },
});
