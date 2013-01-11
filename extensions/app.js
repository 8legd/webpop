/**
 * WebPop app
 */

// nodify our WebPop app
require('./nodify/index');

var router = require('./router').create({
    // Add any libraries used in the routes here...
});

/**
 * Standard routing strategy that works in node.js and WebPop
 */
exports.get = exports.post = {
    "*": function() {
        router.strategy(request,response);
    }
};