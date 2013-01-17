var storage;
if (CONFIG.webpop) {
  storage = require('storage');
  if(!storage.load) {
    storage.load = function(callback){callback();};
  }
  if(!storage.set) {
    storage.set = storage.put;
  }
} else {
  if (CONFIG.data_store.impl == 'mysql-cubby') {
      var mysql = require('mysql');
      var Cubby = require('mysql-cubby');
      var connection = mysql.createConnection({
          host: CONFIG.data_store.host,
          user: CONFIG.data_store.user,
          password: CONFIG.data_store.password,
          database: CONFIG.data_store.database
      });
      connection.connect();
      storage = new Cubby({connection: connection, table: CONFIG.data_store.table, name: CONFIG.data_store.name});
  } else {
      var Cubby = require('cubby');
      var storage = new Cubby();
      storage.load = function(callback) {callback();};
  }
}

// callback(value,error)
exports.get = function(key,callback) {
    storage.load(function() {
        var value = storage.get(key);
        // TODO error handling?
        if (callback) {
            callback(value);
        } else {
            throw new Error('Missing callback function');
        }
    });
}

// callback(error) stores an object under `key`. The object can be any normal javascript object. If the object is null the key will be removed.
exports.put = function(key,value,callback) {
    storage.load(function() {
        storage.set(key,value);
        // TODO error handling?
        if (callback) {
            callback(value);
        } else {
            throw new Error('Missing callback function');
        }
    });
}

// callback(keys,error) keys is an array with all the keys currently stored for this project
exports.keys = function(callback) {
    storage.load(function() {
        var keys = storage.keys || Object.keys(storage._db);
        // TODO error handling?
        if (callback) {
            callback(keys);
        } else {
            throw new Error('Missing callback function');
        }
    });
}