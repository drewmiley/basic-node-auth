const expect  = require('chai').expect;
const request = require('request');
const mongoUnit = require('mongo-unit');
const testMongoUrl = process.env.MONGO_URL;

const testData = require('./testData.json');

const userRouter = require('../src/userRouter');

describe('User Router', () => {

    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
    afterEach(() => mongoUnit.drop());

    it('Should sign up a new user if correct request body', () => {
        const req = { body: { username: 'Drew', password: 'password' }};
        return userRouter.signup(req).then(res => {
            expect(res).to.equal('User signed up');
        })
    });
    it('Should not sign up a new user if incorrect request body', () => {
        const req = { body: {}};
        return userRouter.signup(req).then(res => {
            expect(res).to.equal('Invalid sign up body');
        })
    });
    it('Should return a bearer token for a valid log in', () => {
        const req = { body: { username: 'Drew', password: 'password' }};
        return userRouter.login(req).then(res => {
            expect(res).to.equal('RHJldzpwYXNzd29yZA==');
        })
    });
    it('Should return a User not found message for an invalid log in', () => {
        const req = { body: { username: 'Drew', password: 'password1' }};
        return userRouter.login(req).then(res => {
            expect(res).to.equal('User not found');
        })
    });
});
