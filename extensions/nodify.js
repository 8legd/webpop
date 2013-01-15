/**
 * Make WebPop globals look like their node.js counter parts and add some missing node.js globals e.g. console
 *
 * add to this as the code base needs it...
 */

console = {
  log: function(info) {
    log(info);
  }
}
  
request.method = request.request_method;

//add node style methods to http...
var http = require('http');

// defensive check that this doesn't exist!!!
if (!http.original_request_func) {
    http.original_request_func = http.request;
} else {
    //TODO error
}
http.request = function(options) {
    //TODO

}