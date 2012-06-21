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
    var template = ["/templates/components/",options.component,".ejs"].join("");
    var str = fs.readFileSync(template, 'utf8');
    result = ejs.render(str, { filename: template, locals: locals });   
  } catch (e) {
    log(e);
  }
  return result;
};

/**
 * save content from webpop scope and/or options to ejs options.local.content
 * most recent content overrides any stored values
 * any specified options values override any scope values
 *
 * webpop              ejs 
 * ------              ---
 * scope + options  >  options.locals.content
 *
 */
exports.content = function(options, enclosed, scope) {
  for (var prop in scope) { data[prop] = scope[prop]; }
  for (var prop in options) { data[prop] = options[prop]; }
}

/**
 * push content to an array from webpop scope to ejs options.local.content
 * requires options.name for the name to give the array
 * and options.from for the name(s) of the content to push (seperate multiple values with commas)
 * an optional options.to can be used to specify the name(s) %TODO% describe this better!
 * any existing array will be appended to
 * any existing  object will be converted to an array and appened to
 *
 * webpop                                                ejs 
 * ------                                                ---
 * scope[options.name]   >  options.locals.content[name].[values[name]]
 *
 */
exports.push = function(options, enclosed, scope) {
  if (options.name && options.from) {
    var values = data[options.name];
    var from = options.from.split(",");
    var to = options.to ? options.to.split(",") : from;
    if (from.length !== to.length) {
      throw "Syntax Error: Number of 'from' values does not match the number of 'to' values";
    }
    var obj = {};
    for ( i = 0, z = from.length; i < z; i++ ) {  
      obj[to[i]] = scope[from[i]];
    }
    (values ? ( Array.isArray(values) ? values : values = [values] ) : values = []).push(obj);
    data[options.name] = values;  
  }
}


