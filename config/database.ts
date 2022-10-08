import { parse } from "pg-connection-string";



module.exports = ({ env }) => {

  const { host, port, database, user, password } = parse(
    process.env.DATABASE_URL
  );

  console.log("=====>", host);
  console.log("=====>", host);


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
    },
  };

};