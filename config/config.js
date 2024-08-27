require("dotenv").config();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DP_PASS } = process.env;

module.exports = {
  development: {
    username: DB_USER || "postgres",
    password: DP_PASS || "postgres",
    database: DB_NAME || "todo_app",
    host: DB_HOST || "db",
    dialect: "postgres",
    port: DB_PORT || 5432,
  },
  test: {
    username: DB_USER || "postgres",
    password: DP_PASS || "postgres",
    database: DB_NAME || "todo_app_test",
    host: "localhost",
    dialect: "postgres",
    port: DB_PORT || 5432,
    logging: false,
  },
  production: {
    username: DB_USER || "postgres",
    password: DP_PASS || "postgres",
    database: DB_NAME || "todo_app_prod",
    host: DB_HOST || "db",
    dialect: "postgres",
    port: DB_PORT || 5432,
    logging: false,
  },
};
