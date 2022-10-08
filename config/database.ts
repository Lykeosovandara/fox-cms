import * as pgS from "pg-connection-string";




/// GOd
console.log(pgS.parse(process.env.DATABASE_URL).host);
console.log(pgS.parse(process.env.DATABASE_URL_APP).host);

// ss last time man

export default ({ env }) => ({
  connection: {
    client: env('postgres'),
    connection: {
      host: pgS.parse(process.env.DATABASE_URL).host,
      port: pgS.parse(process.env.DATABASE_URL).port,
      database: pgS.parse(process.env.DATABASE_URL).database,
      user: pgS.parse(process.env.DATABASE_URL).user,
      password: pgS.parse(process.env.DATABASE_URL).password,
      ssl: {
        /// Pleasse 
        rejectUnauthorized: false, 
      },
    },
  },
});
