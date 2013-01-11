/**
 * WebPop test app for local testing in node.js
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  // make sure static files take precedence as per WebPop
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);


});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var router = require('./extensions/router').create({
    // Add any libraries used in the routes here...
});
app.get('*', router.strategy);
app.post('*', router.strategy);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
