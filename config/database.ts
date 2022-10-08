import { parse } from "pg-connection-string";



export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      url: env("DATABASE_URL_APP"),
      
    },
  },
});
