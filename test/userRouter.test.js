const expect  = require('chai').expect;
const request = require('request');
const mongoUnit = require('mongo-unit');
const testMongoUrl = process.env.MONGO_URL;

const testData = require('./testData.json');

const userRouter = require('../src/userRouter');

describe('User Router', () => {

    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
    afterEach(() => mongoUnit.drop());

    it('Should sign up a new user if correct request body', done => {
        request.post({ url: 'http://localhost:8000/user/signup', form: { username: 'Drew', password: 'password' }}, (error, response, body) => {
            expect(body).to.equal('\"User signed up\"');
            done();
        });
    });
    it('Should not sign up a new user if incorrect request body', done => {
        request.post({ url: 'http://localhost:8000/user/signup' }, (error, response, body) => {
            expect(body).to.equal('\"Invalid sign up body\"');
            done();
        });
    });
    it('Should return a bearer token for a valid log in', done => {
        request.post({ url: 'http://localhost:8000/user/login', form: { username: 'Drew', password: 'password' }}, (error, response, body) => {
            expect(body).to.equal('\"RHJldzpwYXNzd29yZA==\"');
            done();
        });
    });
    it('Should return a User not found message for an invalid log in', done => {
        request.post({ url: 'http://localhost:8000/user/login', form: { username: 'Drew', password: 'password1' }}, (error, response, body) => {
            expect(body).to.equal('\"User not found\"');
            done();
        });
    });
});
