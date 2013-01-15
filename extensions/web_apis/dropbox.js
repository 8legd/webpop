var OAuth = require('oauth').OAuth;

exports.create = function(options) {
    if (!options) {
        options = {};
    }
    var result = {};
    result.OAuth = new OAuth('https://api.dropbox.com/1/oauth/request_token',
        'https://api.dropbox.com/1/oauth/access_token',
        CONFIG.dropbox.app_key,
        CONFIG.dropbox.app_secret,
        '1.0',
        CONFIG.dropbox.oauth_callback,
        'HMAC-SHA1'
    );
    result.oauth_request_token = options.oauth_request_token;
    result.oauth_request_token_secret = options.oauth_request_token_secret;
    result.oauth_access_token = options.oauth_access_token;
    result.oauth_access_token_secret = options.oauth_access_token_secret;
    // callback(error, oauth_token, oauth_token_secret, results)
    result.requestRequestToken = function(callback) {
        this.OAuth.getOAuthRequestToken(callback);
    };
    result.buildAuthURL = function(oauth_request_token) {
        return 'https://www.dropbox.com/1/oauth/authorize?oauth_token=' +
            oauth_request_token + '&oauth_callback=' + encodeURIComponent(CONFIG.dropbox.oauth_callback);
    }
    // callback(error, oauth_access_token, oauth_access_token_secret, results)
    result.requestAccessToken = function(callback) {
        this.OAuth.getOAuthAccessToken(this.oauth_request_token, this.oauth_request_token_secret, callback);
    };
    // callback(error, data, response)
    result.requestDelta = function (cursor, callback) {
        var url = 'https://api.dropbox.com/1/delta';
        if (cursor) {
            url = 'https://api.dropbox.com/1/delta?cursor=' + cursor;
        }
        this.OAuth.getProtectedResource(url,
            'POST',
            this.oauth_access_token,
            this.oauth_access_token_secret,
            callback);
    }
    return result;
}