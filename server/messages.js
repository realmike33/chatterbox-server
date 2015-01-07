var fs = require('fs');
var posts = require('../classes/storage.js').data.results;
var data = require('../classes/storage.js').data;

exports.post = {
  '/classes/messages': function(request, response) {
      var chunkedData = '';
      request.on('data', function(chunk){
        chunkedData += chunk;
      });
      request.on('end', function() {
        if(posts.length >= 100){
          posts.shift();
        }
        posts.push(JSON.parse(chunkedData));
      });
    },
  '/classes/typing': function(request, response){
    var chunkedData = '';
    request.on('data', function(chunk){
      chunkedData += chunk;
    });
    request.on('end', function(){
      var user = JSON.parse(chunkedData).userName;
      var obj = {user : user};
      response.writeHead(200, {'content-Type': 'application/json'});
      response.end(JSON.stringify(obj));
    });
  }
};

exports.get = {
  '/classes/messages': function(request, response){
    response.writeHead(200, {'content-Type': 'application/json'})
    response.end(JSON.stringify(data));
  }
};

exports.index = {
  '/': function(request, response){
        this.func('../client/index.html','text/html', request, response)
      },
  '/styles/styles.css': function(request, response) {
      this.func('../client/styles/styles.css', 'text/css', request, response);
   },
   '/bower_components/bootstrap-css-only/css/bootstrap.css': function(request, response) {
      this.func('../client/bower_components/bootstrap/dist/css/bootstrap.css','text/css', request, response);
    },
  '/bower_components/jquery/dist/jquery.min.js': function(request, response) {
      this.func('../client/bower_components/jquery/jquery.min.js','application/javascript', request, response);
    },
    '/bower_components/underscore/underscore-min.js': function(request, response){
      this.func('../client/bower_components/underscore/underscore-min.js','application/javascript', request, response);
    },
    '/env/config.json': function(request, response){
      this.func('../client/env/config.json','application/json', request, response);
    },
    '/scripts/app.js': function(request, response){
      this.func('../client/scripts/app.js','application/javascript', request, response);
    },
    '/bower_components/bootstrap-css-only/css/bootstrap.css.map': function(request, response){
      this.func('../client/bower_components/bootstrap/dist/css/bootstrap.css.map','application/x-navimap', request, response)
    },
    '/bower_components/underscore/underscore-min.map' : function(request, response){
      this.func('../client/bower_components/underscore/underscore-min.map','application/x-navimap', request, response);
    },
    '/favicon.ico': function(request, response){
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end(/* icon content here */);
    },
    'func': function(string, type, request, response) {
        fs.readFile(string, function(err, data) {
          if(err) {
            response.writeHead(404, {'content-Type': type});
            response.end(JSON.stringify(err));
          }
          response.writeHead(200, {'content-Type': type});
          response.end(data);
        });
      }
};



