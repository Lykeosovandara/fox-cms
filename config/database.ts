import * as pgS from "pg-connection-string";




/// GOd
console.log(process.env.DATABASE_URL);



export default ({ env }) => ({
  connection: {
    client: env('postgres'),
    connection: {
      host: pgS.parse(env('DATABASE_URL')).host,
      port: pgS.parse(env.int('DATABASE_URL')).port,
      database: pgS.parse(env('DATABASE_URL')).database,
      user: pgS.parse(env('DATABASE_URL')).user,
      password: pgS.parse(env('DATABASE_URL')).password,
      ssl: {
        /// Pleasse 
        rejectUnauthorized: false, 
      },
    },
  },
});
