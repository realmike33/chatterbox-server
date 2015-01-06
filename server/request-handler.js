var fs = require('fs');
var postMsg = require('./messages.js').post;
var getMsg = require('./messages.js').get;

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "JSON";

  if(request.method === 'POST'){
    postMsg[request.url](request, response);
    response.writeHead(200, {'content-Type': 'JSON'});
  }
  if(request.method === 'GET'){
    // if(request.method === '/') {
      fs.readFile('../client/index.html', function(err, data) {
        if(err) {
          response.end(err);
        }
        response.end(data);
      });
    // }
    // var data = getMsg[request.url](request, response);
  }

  // response.end({});

};

exports.requestHandler = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

