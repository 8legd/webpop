/*!
 * webpop fs
 */

var file = require('file');

exports.readFileSync = function(path, encoding) {
  if (file.exists(path)) {
    return file.read(path);
  } else {
    throw 'Invalid path : ' + path;
  }
}