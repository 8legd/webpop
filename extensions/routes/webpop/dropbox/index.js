var OAuth= require('oauth').OAuth;

//requestUrl, accessUrl, consumerKey, consumerSecret, version, authorize_callback, signatureMethod, nonceSize, customHeaders) {
var dropboxOAuth = new OAuth('https://api.dropbox.com/1/oauth/request_token',
    'https://api.dropbox.com/1/oauth/access_token',
    CONFIG.dropbox.app_key,
    CONFIG.dropbox.app_secret,
    '1.0',
    CONFIG.dropbox.oauth_callback,
    'HMAC-SHA1'
);

exports.GET = function(req,res) {
    if (req.path == '/auth') {
        requestDropboxAuth(req,res);
    } else {
        if (req.path == '/access') {
            requestDropboxAccess(req,res);
        } else {
            res.send(404);
        }
    }
}

var requestDropboxAuth = function(req,res) {
    dropboxOAuth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        if(error) util.puts('error :' + error)
        else {
            req.session.req_oauth_token = oauth_token;
            req.session.req_oauth_token_secret = oauth_token_secret;
            res.redirect('https://www.dropbox.com/1/oauth/authorize?oauth_token=' +
                oauth_token + '&oauth_callback=' + encodeURIComponent(CONFIG.dropbox.oauth_callback));
        }
    });
}

var requestDropboxAccess = function(req,res) {
    if (req.query.oauth_token == req.session.req_oauth_token) {
        // :)
        req.session.req_oauth_token = null;
        var req_oauth_token_secret = req.session.req_oauth_token_secret;
        req.session.req_oauth_token_secret = null;
        dropboxOAuth.getOAuthAccessToken(req.query.oauth_token, req_oauth_token_secret, function(error, oauth_access_token, oauth_access_token_secret, results2) {
            var data= "";
            dropboxOAuth.getProtectedResource('https://api.dropbox.com/1/delta', 'POST', oauth_access_token, oauth_access_token_secret,  function (error, data, response) {
                util.puts(data);
            });
        });
    } else {
        // :( TODO error
    }
}