const app = require('../server');
const request = require('supertest');
const application = request(app);
const expectchai = require('chai').expect;

describe('Route tests', function () {
    describe('Test works', function () {
        it('it works', function (done) {
            done();
        });
    });

    describe('Test application', function () {
        it('Check root status ', function (done) {
            application.get('/').expect(200, done);
        });
    });

    describe('Test application', function () {
        it('Check status Home', function (done) {
            application
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    expectchai(res.status).to.equal(200);
                    expectchai(res.text).to.contain('Home');
                    return done();
                });
        });
        it('Check status Login', function (done) {
            application.get('/users/login').expect(200, done);
        });
        it('Check status Registration', function (done) {
            application.get('/users/register').expect(200, done);
        });
        it('Check status Dashboard - No Registration - Redirect to Login', function (done) {
            application.get('/users/dashboard').expect(302, done);
            application.post('/users/dashboard').send({
                email: 'bonimat@hotmail.com',
                password: 'bonimat',
            });
        });
    });
});
