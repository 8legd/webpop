/**
 * Make WebPop globals look like their node.js counter parts,  add some missing node.js globals e.g. console
 * and modify http library to act like a node express app
 *
 * add to this as the code base needs it...
 */
console = {
  log: function(info) {
    log(info);
  }
}
  
if (!request.method) {
  request.method = request.request_method;
}
if (!request.query && request.request_method == 'GET') {
  request.query = request.params;
}
if (!response.redirect) {
  response.redirect = function(url,permanent) {
    if (permanent) {
      this.send("", {"Location" : url}, 301 );
    } else {
      this.send("", {"Location" : url}, 302 );
    }
  }
}

//add node style methods to http...
var http = require('http');

// defensive check that this doesn't exist...you will probably see more of these!!! 
if (!http.original_request_func) {
    http.original_request_func = http.request;
} 

http.request = function(options) {
    if (!options.protocol) {
      options.protocol = 'http';
    }
    return {
        request_options: options,
        events: { response: [] },
        on: function(event,callback) {
            // for now just `emit` response
            switch(event) {
                case 'response':
                    this.events[event].push(callback);
                    break;
                default:
                    //that's all for now!
            }
        },
        write: function(body) {
          this.request_options.body = body;
        },
        end: function() {          
          var webpop_options = {};
          webpop_options.url = this.request_options.protocol + '://' + this.request_options.host + 
                               (this.request_options.port ? ':' + this.request_options.port : '') +
                               this.request_options.path;
          webpop_options.type = this.request_options.method;       
          webpop_options.headers = this.request_options.headers;
          webpop_options.body = this.request_options.body ? this.request_options.body : '';
 
          var response = http.original_request_func(webpop_options);
          if (!response.setEncoding) {
            response.setEncoding = function(enc){console.log('setting enc')};
          }
          if (!response.statusCode) {
            response.statusCode = response.status;
          }      
          if (!response.on) {
            response.events = { data: [] };
            response.on = function(event,callback) {
              // for now just `emit` data and fire it on end
              switch(event) {
                  case 'data':
                      this.events.data.push(callback);
                      break;
                  case 'end':
                      for (var i=0,z=this.events.data.length; i<z; i++) {
                       this.events.data[i](this.body);
                      } 
                      callback();
                      break;
                  default:
                  //that's all for now!
              };   
            }
          }
          // emit the reponse event
          for (var i=0,z=this.events.response.length; i<z; i++) {
            this.events.response[i](response);
          }   
          
          return response;
      }      
    }
}