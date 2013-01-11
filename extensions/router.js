/**
 * A basic routing strategy that works in node.js and WebPop
 * (requires nodify to be previously loaded in WebPop e.g. in app.js)
 */
exports.create = function(libs) {
    var result = {};
    result.libs = libs;
    result.strategy = function(req,res) {
        try {
            var route = require('./routes' + req.path + '/index');
            if(route[req.method]) {
                route[req.method](libs,req,res);
            } else {
                console.log('Missing method: ' + req.method + '(libs,req,res) for requested route: extensions/routes' + req.path + '/index.js');
            }
        } catch(e) {
            console.log('Error in route: extensions/routes' + req.path + '/index.js');
            throw e;
        }
    };
    return result;
}