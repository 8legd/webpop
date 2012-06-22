/*!
 * WebPop ejs extension 
 * (ported from node.js module https://github.com/visionmedia/ejs)
 * Provides: 
 *     a pop:ejs:include tag to include an ejs component
 * How to use it:
 *     1. Create an ejs component in a webpop templates folder called components
 *     2. Create a model with the same name in a webpop extensions folder called models
 *        (this must export a map(options, enclosed, scope) function to return the data 
 *        the ejs component uses otherwise it will be ignored)
 *     3. Have fun including ejs components in your webpop templates as follows
 *        <pop:ejs:include component="carousel" debug="<pop:development/>" escape="false"/>
 *     +  Add any extra filters to the ejs/filters.ext.js file 
 *
 * Some webpop extensions reminders...
 *     options:  tag attributes
 *     enclosed: the template fragment inside the tag - not relevant here!
 *     scope:    content from the scope of the tag
 */


/**
 * Minimal mappings to ejs
 * no cache option (leave caching to webpop)
 * debug option - not mapped to ejs but will provide some logging using webpop extensions log()
 * no open/close tag options
 * options.locals data is mapped via the models
 */
exports.include = function(options, enclosed, scope) {
  var result = "";
  var debug = options.debug;
  var step;
  if (debug) {
    step = "init";
  }
  try {    
    var model ="models/" + options.component;
    var ejs = require("ejs/ejs");
    var fs = require("ejs/fs");
    var locals = {};
    var modelMapper = require(model);
    if (modelMapper.map !== undefined) {
      if (debug) {    
        step = "mapping webpop variables to ejs locals via model " + model;
      }
      locals = require(model).map(options, enclosed, scope);    
    }
    // add any extra filters
    var filters = require("ejs/filters.ext");
    if (filters) {
      if (debug) {    
        step = "adding extra filters";
      }
      filters.addTo(ejs);    
    }
    var template = ["/templates/components/",options.component,".ejs"].join("");
    if (debug) {    
      step = "reading template " + template;
    }
    var str = fs.readFileSync(template, 'utf8');
    if (debug) {    
      step = "rendering template " + template;
    }
    result = ejs.render(str, { filename: template, locals: locals });
    if (debug) {    
      log("rendered template " + template);
    }  
  } catch (e) {
    if (debug) {
      log("Caught Exception at Step: " + step + "; Exception: " + e);   
    }
  }
  return result;
};