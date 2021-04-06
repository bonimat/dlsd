const { expect, assert } = require('chai');

const { Role, sequelize } = require('../models/index');

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
describe('Model Tests', function () {
    describe('test role method', function () {
        it('findOne work', function (done) {
            Role.findOne({ where: { rolename: 'user' } }).then((data) => {
                expect(data.id).exist();
            });
            done();
        });
    });
});
