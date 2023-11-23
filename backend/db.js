const { Pool } = require('pg');
const dbConfig = require('./config').development;

const pool = new Pool({
  user: dbConfig.username,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
