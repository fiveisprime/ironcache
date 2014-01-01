var http = require('../lib/http')
  , nock = require('nock');

require('should');

describe('http', function() {

  it('should correctly format url', function(done) {

    //
    // Mock the iron.io URL. Return a 200 with a text result of "success."
    //
    nock('https://cache-aws-us-east-1.iron.io')
      .get('/1/test?oauth=token')
      .reply(200, 'success');

    http('/test', 'token', 'GET', function(err, response, body) {
      response.request.uri.href.should.equal('https://cache-aws-us-east-1.iron.io/1/test?oauth=token');
      response.statusCode.should.equal(200);
      body.should.equal('success');

      done();
    });

  });
});
