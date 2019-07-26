const expect  = require('chai').expect;
const request = require('request');
const mongoUnit = require('mongo-unit');
const testMongoUrl = process.env.MONGO_URL;

const testData = require('./testData.json');

const authentication = require('../src/authentication');

const res = { status: status => ({ json: json => ({ status, json }) })};
const next = () => 'next';

describe('Authentication', () => {

    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
    afterEach(() => mongoUnit.drop());

    it('Should return missing authorization header', () => {
        const req = { headers: { authorization: null } };
        return authentication(req, res, next).then(res => {
            expect(res.json.status).to.equal(401);
            expect(res.json.message).to.equal('Missing Authorization Header');
        });
    });
    it('Should return invalid auth credentials for invalid user authentication', () => {
        const req = { headers: { authorization: 'Basic qweqewqweq' } };
        return authentication(req, res, next).then(res => {
            expect(res.json.status).to.equal(401);
            expect(res.json.message).to.equal('Invalid Authentication Credentials');
        });
    });
    it('Should pass for user urls', () => {
        const req1 = { path: '/user/signup' };
        return authentication(req1, res, next).then(res => {
            expect(res.authenticated).to.equal(true);
            const req2 = { path: '/user/login' };
            authentication(req2, res, next).then(res => {
                expect(res.authenticated).to.equal(true);
            });
        });
    });
    it('Should pass for valid user authentication', () => {
        const req = { headers: { authorization: 'Basic RHJldzpwYXNzd29yZA==' } };
        return authentication(req, res, next).then(res => {
            expect(res.authenticated).to.equal(true);
        });
    });
});
