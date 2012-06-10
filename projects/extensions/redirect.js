exports.get = {
  ":name": function(params) {
    response.send("", {"Location" : decodeURIComponent(request.query_string.substr(2))}, 303 );
  }
};

