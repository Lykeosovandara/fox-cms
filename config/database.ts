const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  if (process.env.NODE_ENV === "development") {
    
    return {
      connection: {
        client: "postgres",
        connection: {
          host: "postgres",
          port: 5432,
          database: "strapi",
          user: "strapi",
          password: "strapi",
          ssl: false,
        },
      },
    };
  } else {
    const { host, port, database, user, password } = parse(
      process.env.DATABASE_URL
    );

    return {
      connection: {
        client: "postgres",
        connection: {
          host,
          port,
          database,
          user,
          password,
          ssl: {
            rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
          },
        },
        pool: {
          min: 0,
          max: 2,
          acquireTimeoutMillis: 60000,
          createTimeoutMillis: 60000,
          destroyTimeoutMillis: 20000,
          idleTimeoutMillis: 60000,
          reapIntervalMillis: 1000,
          createRetryIntervalMillis: 1000,
        },
      },
      settings: { forceMigration: false },
    };
  }
};