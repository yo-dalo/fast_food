const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({path:"./src/.env"});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
 // database: "Fast_food_3",
 password: process.env.DB_PASSWORD,
 //  password: 'root',
   user: process.env.DB_USER,
 //user: 'root',
});

module.exports = pool;
