var CryptoJS = require('../cryptojs/rollups/aes').create();
var bcrypt = require('bcrypt');

exports.encrypt = function(plain_text,key) {
    return CryptoJS.AES.encrypt(plain_text,key).toString();
}

exports.decrypt = function(encrypted_text,key) {
    return CryptoJS.AES.decrypt(encrypted_text,key).toString(CryptoJS.enc.Utf8);
}

exports.bcrypt_hash = function(plain_text) {
    if (false) {
        return bcrypt.hash(plain_text);
    } else {
        return bcrypt.hashSync(plain_text, 10);
    }
}

exports.bcrypt_check = function(plain_text, hash) {
    if (false) {
        return bcrypt.check(plain_text, hash);
    } else {
        return bcrypt.compareSync(plain_text, hash);
    }
}

/*
 Some notes on bcrypt...
 A bcrypt hash looks something like this $2a$10$rhLvODzbwREO7PI4sdmCdep3HRnrlPO5QqWar0LIj5chPbObHvj42
 $ is used as a delimiter
 2a is the bcrypt algorithm version
 10 is the cost factor e.g. 2 to the power of 10 iterations
 rhLvODzbwREO7PI4sdmCdep3HRnrlPO5QqWar0LIj5chPbObHvj42 is the salt and the hash in modified Base64 (first 22 chars are the salt)
 */