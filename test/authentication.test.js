const expect  = require('chai').expect;
const request = require('request');
const sinon = require('sinon');

const authentication = require('../src/authentication');

const res = { status: status => ({ json: json => ({ status, json }) })};
const next = () => 'next';

describe('Authentication', () => {
    it('Should return missing authorization header', done => {
        const req = { headers: { authorization: null } };
        authentication(req, res, next).then(res => {
            expect(res.status).to.equal(401);
            expect(res.json).to.equal('Missing Authorization Header');
        });
        done();
    });
    it('Should return invalid auth credentials for invalid user authentication', done => {
        expect(false).to.be.true;
        done();
    });
    it('Should pass for user urls', done => {
        const req1 = { path: '/user/signup' };
        authentication(req1, res, next).then(res => {
            expect(res).to.equal('next');
        });
        const req2 = { path: '/user/login' };
        authentication(req2, res, next).then(res => {
            expect(res).to.equal('next');
        });
        done();
    });
    it('Should pass for valid user authentication', done => {
        expect(false).to.be.true;
        done();
    });
});
