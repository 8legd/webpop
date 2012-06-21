exports.addTo = function(ejs) {
  
  // filter to convert richtext to plain text by converting / removing html markup
  ejs.filters.plaintext = function(str) {
    var result = "";
    // replace any <br/>'s
    result = str.replace(/<br\/>/i," ");
    return result;
  }

}  