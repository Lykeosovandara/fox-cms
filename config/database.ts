import * as pgS from "pg-connection-string";


export default ({ env }) => ({
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
