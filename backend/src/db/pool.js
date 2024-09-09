const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: "root",
  password: "root",
  database: "Fast_food_3",
});

module.exports = pool;
