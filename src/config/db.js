const { Pool } = require('pg')
// const { password } = require('pg/lib/defaults')

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
  // ssl: {
  //   rejectUnauthorized: false
  // }
})

// ALTER TABLE products
// ADD typestock varchar(255);

// ALTER TABLE products
// ADD merk varchar(255);

module.exports = pool
