const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.PGHOST,
  user: process.env.PHUSER,
  database: process.env.PGDATABASE,
  password: process.env.PASSWORD,
  port: process.env.PGPORT
}