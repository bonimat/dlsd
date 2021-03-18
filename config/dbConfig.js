require('dotenv').config();
const { Pool } = require('pg');

const env = process.env.NODE_ENV || 'development';
let connectionString = '';

switch (env) {
    case 'development':
        connectionString = `postgresql://${process.env.DEV_DBUSER}:${process.env.DEV_DBPASS}@${process.env.DEV_DBHOST}:${process.env.DEV_DBPORT}/${process.env.DEV_DBNAME}`;
        break;
    case 'test':
        connectionString = `postgresql://${process.env.TEST_DBUSER}:${process.env.TEST_DBPASS}@${process.env.TEST_DBHOST}:${process.env.TEST_DBPORT}/${process.env.TEST_DBNAME}`;
    case 'production':
        connectionString = `postgresql://${process.env.PROD_DBUSER}:${process.env.PROD_DBPASS}@${process.env.PROD_DBHOST}:${process.env.PROD_DBPORT}/${process.env.PROD_DBNAME}`;
        break;
    default:
        connectionString = `postgresql://${process.env.DEV_DBUSER}:${process.env.DEV_DBPASS}@${process.env.DEV_DBHOST}:${process.env.DEV_DBPORT}/${process.env.DEV_DBNAME}`;
        break;
}

// const isProduction = process.env.NODE_ENV === 'production';
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString,
});

module.exports = { pool };
