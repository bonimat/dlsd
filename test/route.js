const app = require('../server');
const request = require('supertest');
const application = request(app);

const requestchai = require('chai-http');
const chai = require('chai');
const { expect } = require('chai');
chai.use(requestchai);

const agent = chai.request.agent(app);

after(function () {
    agent.close();
});

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
                    expect(res.status).to.equal(200);
                    expect(res.text).to.contain('Home');
                    return done();
                });
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
    describe('Check Login', function () {
        it('Check status Login', function (done) {
            application.get('/users/login').expect(200, done);
        });

        it('Check login form', function (done) {
            application
                .post('/users/login')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ email: 'bonimat@hotmail.com', password: 'bonimat' })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(302);
                    done();
                });
        });
        it('Check login with agent: auth ok', function () {
            agent
                .post('/users/login')
                //  .type('form')
                .send({
                    email: 'bonimat@hotmail.com',
                    password: 'bonimat',
                })
                .then(function (res) {
                    expect(res).to.have.cookie('sessionid');
                });
        });
    });
});
