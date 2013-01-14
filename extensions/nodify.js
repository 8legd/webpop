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

var http = require('http');
//add node style methods...