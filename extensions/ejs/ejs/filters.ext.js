/*!
 * Add any extra filters for your views here... 
 */
exports.addTo = function(ejs) {
  
  // an example filter to convert rich text to plain text by converting / removing html markup
  ejs.filters.plaintext = function(str) {
    var result = "";
    // replace any <br/>'s
    result = str.replace(/<br\/>/i," ");
    return result;
  }

}  