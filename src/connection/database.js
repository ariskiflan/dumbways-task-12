const { Pool } = require("pg");

const dbPool = new Pool({
  user: "postgres",
  database: "my_personal_web",
  password: "ariskiflan",
  port: 5432,
});

module.exports = dbPool;
