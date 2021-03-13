require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_DBUSER,
        password: process.env.DEV_DBPASS,
        database: process.env.DEV_DBNAME,
        host: process.env.DEV_DBHOST,
        port: process.env.DEV_DBPORT,
        dialect: 'postgres',
    },
    test: {
        username: process.env.DEV_DBUSER,
        password: process.env.DEV_DBPASS,
        database: process.env.TEST_DBNAME,
        host: process.env.DEV_DBHOST,
        port: process.env.DEV_DBPORT,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DEV_DBUSER,
        password: process.env.DEV_DBPASS,
        database: process.env.DEV_DBNAME,
        host: process.env.DEV_DBHOST,
        port: process.env.PROD_DBPORT,
        dialect: 'postgres',
    },
};
