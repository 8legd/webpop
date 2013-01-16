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
    return {
        options: options,
        events: { error: [], response: []},
        on: function(event,callback) {
            // for now just `emit` response and error
            switch(event) {
                case 'error','response':
                    this.events[event].push(callback);
                    break;
                default:
                    //that's all for now!
            }
        },
        write: function(body) {

        },
        end: function() {
            original_request_func(options);
            // emit events

            // error callback( err )
        }
    }
}



/**
 * WebPop
 *

 REQUEST
 The http module also exports a more general .request(options) method.

 The options for request are:

 url: The url of the request
 type: GET, POST, PUT, DELETE, HEAD or OPTIONS
 data: an object that will be used as the query string in GET requests or as the post body for any other request type.
 headers: an object with HTTP headers
 body: a raw post body - make sure to set the "Content-Type" header as well.
 username: username for HTTP basic auth.
 password: password for HTTP basic auth

 Where GET and POST will return either a string, the result of parsing a JSON document or null when called, request returns a response object. The response object exposes the following properties:

 status: HTTP status code
 body: The response body
 headers: An object representing the response headers

*/


/**
 * node oauth usage
 *

 request.on('response', function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        data+=chunk;
      });
      response.on('end', function () {
        passBackControl( response );
      });


     request.on("error", function(err) {
      callbackCalled= true;
      callback( err )
    });


       request.write(post_body);



    request.end();




 */