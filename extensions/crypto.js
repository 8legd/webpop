exports.createHmac = exports.Hmac = function(hmac, key) {
    var result = {};
    switch(hmac) {
        case 'sha1':
            var CryptoJS = require('./cryptojs/rollups/hmac-sha1').create();
            result.hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, key);
            break;
        case 'sha256':
            var CryptoJS = require('./cryptojs/rollups/hmac-sha256').create();
            result.hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
            break;
        default:
            // thats all for now!
    };
    result.update = function(data) {
        this.hmac = this.hmac.update(data);
        return this;
    };
    result.digest = function(enc) {
        var result;
        this.hmac = this.hmac.finalize();
        switch(enc) {
            case 'base64':
                result = this.hmac.toString(CryptoJS.enc.Base64);
                break;
            case 'hex':
                result = this.hmac.toString(CryptoJS.enc.Hex);
                break;
            default:
                // thats all for now!
        };
        return result;
    }
    return result;
}

//var hash = crypto.createHash('md5').update(new Buffer(requestBody).toString('binary')).digest('hex');
exports.createHash = function(hash, key) {
    var result = {};
    switch(hash) {
        case 'md5':
            var CryptoJS = require('./cryptojs/rollups/md5').create();
            result.hash = CryptoJS.algo.MD5.create();
            break;
        default:
        // thats all for now!
    };
    result.update = function(data) {
        this.hash = this.hash.update(data);
        return this;
    };
    result.digest = function(enc) {
        var result;
        this.hash = this.hash.finalize();
        switch(enc) {
            case 'base64':
                result = this.hmac.toString(CryptoJS.enc.Base64);
                break;
            case 'hex':
                result = this.hmac.toString(CryptoJS.enc.Hex);
                break;
            default:
            // thats all for now!
        };
        return result;
    }
    return result;
}