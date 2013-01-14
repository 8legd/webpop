/**
 * Facade for WebPop port of the node.js npm oauth module (node-oauth)
 * https://github.com/ciaranj/node-oauth
 */
exports.OAuth = require('./npm_ports/oauth/lib/oauth').OAuth;
exports.OAuthEcho = require('./npm_ports/oauth/lib/oauth').OAuthEcho;
exports.OAuth2 = require('./npm_ports/oauth/lib/oauth2').OAuth2;
