const { expect, assert } = require('chai');
const { pool } = require('./../config/dbConfig');
const { sequelize } = require('../models/index');

describe('Database Tests', function () {
    describe('Test works', function () {
        it('it works', function (done) {
            done();
        });
    });

    describe('Test connection', function () {
        it('Auth connection', async function () {
            await sequelize.authenticate();
            assert(true, true);
        });
    });
});
