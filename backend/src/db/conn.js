const express = require('express');
const mysql = require('mysql2');
const db = mysql.createConnection({
  //host: "127.0.0.1",
  host: process.env.DB_HOST,
 // database: process.env.DB_NAME,
  database: "Fast_food_3",
 // password: process.env.DB_PASSWORD,
   password: 'root',
   //user: process.env.DB_USER,
 user: 'root',

  
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...'+process.env.DB_USER);
  console.log('MySQL DB_NAME...'+process.env.DB_NAME);
  console.log('MySQL DB_PASSWORD...'+process.env.DB_PASSWORD);
  console.log(typeof process.env.DB_USER);
});

module.exports = db;