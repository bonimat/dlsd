const { expect } = require('chai');
const { pool } = require('./../dbConfig');

describe('Database Tests', function () {
    describe('Test works', function () {
        it('it works', function (done) {
            done();
        });
    });

    describe('Test connection', function () {
        it('Auth connection', async function () {
            const result = await pool.query('select 1 as result');
            console.log(result.rows[0].result);
            expect(result.rows[0].result).to.be.equal(1);
        });
    });
});
