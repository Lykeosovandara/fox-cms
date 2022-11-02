import * as pgS from "pg-connection-string";


export default ({ env }) => ({
  // connection: {
  //   client: 'postgres',
  //   connection: {
  //     host: process.env.DATABASE_HOST,
  //     port: process.env.DATABASE_PORT,
  //     database: process.env.DATABASE_NAME,
  //     user: process.env.DATABASE_USERNAME,
  //     password: process.env.DATABASE_PASSWORD,
  //   },
  // },
  connection: {
    client: 'postgres',
    connection: {
      host: pgS.parse(process.env.DATABASE_URL).host,
      port: pgS.parse(process.env.DATABASE_URL).port,
      database: pgS.parse(process.env.DATABASE_URL).database,
      user: pgS.parse(process.env.DATABASE_URL).user,
      password: pgS.parse(process.env.DATABASE_URL).password,
      ssl: {

        rejectUnauthorized: false,
      },
    },
  },
});
