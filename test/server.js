var expect  = require('chai').expect;
var request = require('request');

it('Unauthorized API Test', function(done) {
    request('http://localhost:8000' , function(error, response, body) {
        expect(body).to.equal('{\"message\":\"Missing Authorization Header\"}');
        done();
    });
});
