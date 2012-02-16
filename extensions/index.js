exports.get = {
 ":name": function(params) {
    switch(request.path) {
        case "/sitemap.xml":
            response.render("system/sitemap.tpl",{},{"Content-Type" : "text/xml"});
          break;  
        case "/robots.txt":
            response.render("system/robots.tpl",{},{"Content-Type" : "text/plain"});
          break;
    }
 }
};

