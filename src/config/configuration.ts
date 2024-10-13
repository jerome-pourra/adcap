export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT),
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME,
    user: {
      name: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_USER_PASSWORD,
    },
  },
});
