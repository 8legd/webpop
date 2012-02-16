exports.get = {
 ":name": function(params) {
    switch(request.path) {
        case "/server/stylesheets/backgrounds.css":
          response.render("stylesheets/backgrounds.css.tpl",{},{"Content-Type" : "text/css"});
          break;            
    }
 }
};