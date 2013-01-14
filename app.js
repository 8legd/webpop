/**
 * WebPop test app for local testing in node.js
 */
CONFIG = require('./config');

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

var routing_strategy = require('./extensions/routing_strategy');
app.get('*', routing_strategy.basic);
app.post('*', routing_strategy.basic);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
