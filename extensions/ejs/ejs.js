/*!
 * WebPop ejs extension 
 * (ported from node.js module https://github.com/visionmedia/ejs)
 * Provides: 
 *     a pop:ejs:include tag to include an ejs component
 * How to use it:
 *     1. Create an ejs component in a webpop templates folder called components
 *     2. Create a model with the same name in a webpop extensions folder called models
 *        (this must export a map(options, enclosed, scope) function to return the data 
 *        the ejs component uses)
 *     3. Have fun including ejs components in your webpop templates as follows
 *        <pop:ejs:include component="myComponent" escape="false"/>
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
 * no debug option
 * no open/close tag options
 * options.locals provided by webpop models 
 */
exports.include = function(options, enclosed, scope) {
  var result = "";
  try {    
    var model = require("models/" + options.component);
    var ejs = require("ejs/ejs");
    var fs = require("ejs/fs");
    var locals = model.map(options, enclosed, scope);
    // add any extra filters
    var filters = require("ejs/filters.ext");
    if (filters) {
      filters.addTo(ejs);    
    }
    var template = ["/templates/components/",options.component,".ejs"].join("");
    var str = fs.readFileSync(template, 'utf8');
    result = ejs.render(str, { filename: template, locals: locals });   
  } catch (e) {
    log(e);
  }
  return result;
};