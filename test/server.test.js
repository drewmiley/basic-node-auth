var expect  = require('chai').expect;
var request = require('request');

describe('Server Journeys', () => {
    it('Unauthorized API Test', done => {
        request('http://localhost:8000', (error, response, body) => {
            expect(body).to.equal('{\"message\":\"Missing Authorization Header\"}');
            done();
        });
    });
    it('Should sign up a user and they can then login', done => {
        expect(false).to.be.true;
        done();
    });
    it('Should log in an existing user and then they can hit the test api', done => {
        expect(false).to.be.true;
        done();
    });
});
