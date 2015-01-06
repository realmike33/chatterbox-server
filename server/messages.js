var posts = [];

exports.post = {
  '/classes/messages': function(request, response) {
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

  }
}



