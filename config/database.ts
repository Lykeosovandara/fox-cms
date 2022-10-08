import { parse } from "pg-connection-string";



export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.PORT),
      database: process.env.DATABASE,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});
