const expect  = require('chai').expect;
const request = require('request');

describe('Server Journeys', () => {
    it('Unauthorized API Test', done => {
        request('http://localhost:8000', (error, response, body) => {
            expect(body).to.equal('{\"message\":\"Missing Authorization Header\"}');
            done();
        });
    });
    it('Should sign up a user and they can then login', done => {
        request.post({ url: 'http://localhost:8000/user/signup', form: { username: 'Drew', password: 'password' }}, (error, response, body) => {
            expect(body).to.equal('\"User signed up\"');
            request.post({ url: 'http://localhost:8000/user/login', form: { username: 'Drew', password: 'password' }}, (error, response, body) => {
                expect(body).to.equal('\"RHJldzpwYXNzd29yZA==\"');
                done();
            });
        });
    });
    it('Should log in an existing user and then they can hit the test api', done => {
        request.post({ url: 'http://localhost:8000/user/login', form: { username: 'Drew', password: 'password' }}, (error, response, body) => {
            expect(body).to.equal('\"RHJldzpwYXNzd29yZA==\"');
            request.get({ url: 'http://localhost:8000/api', headers: { authorization: 'Basic RHJldzpwYXNzd29yZA==' }}, (error, response, body) => {
                expect(body).to.equal('{\"message\":\"Server running\"}');
                done();
            });
        });
    });
});
