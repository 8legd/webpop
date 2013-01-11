// utils used by templates go in here...

/**
 * Use this to simply return the specified options.value - handy for conditional comments etc.
 * e.g.
 *   <pop:utils:echo value="<!--[if lt IE 9]>" escape="false" /> 
 *     <pop:javascript name="/js/html5shiv-min.js" />
 *   <pop:utils:echo value="<![endif]-->" escape="false" /> 
 */
exports.echo = function(options, enclosed, scope) {
  return options.value;
}