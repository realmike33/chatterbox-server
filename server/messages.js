var posts = [];

exports.post = {
  '/send': function(request, response) {
      var chunkedData = '';
      request.on('data', function(chunk){
        chunkedData += chunk;
      });
      request.on('end', function() {
        if(posts.length >= 100){
          post.shift();
        }
        posts.push(chunkedData);
        console.log(posts);
      });
    },
};


exports.get = {
  '/classes/messages': function(request, response) {
    fs.readFile('../client/index.html', function(err, data) {
      if(err) {
        response.writeHead(404, {'content-Type': 'JSON'});
        response.end(err);
      }
      response.end(post);
    });
  }
};



