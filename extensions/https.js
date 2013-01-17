// TODO wrap around WebPop's http library
var http = require('http');

exports.request = function(options) {
  options.protocol = 'https';
  return http.request(options);
};