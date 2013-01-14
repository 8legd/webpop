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
    dropboxOAuth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        if(error) {
            res.send(500); // :(
        }
        else {
            req.session.req_oauth_token = oauth_token;
            req.session.req_oauth_token_secret = oauth_token_secret;
            res.redirect('https://www.dropbox.com/1/oauth/authorize?oauth_token=' +
                oauth_token + '&oauth_callback=' + encodeURIComponent(CONFIG.dropbox.oauth_callback));
        }
    });
}

