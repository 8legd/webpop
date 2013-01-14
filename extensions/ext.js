// standard extensions used by templates go in here...
// if a method gets to big move it to a sub-dir with an ext- prefix

/**
 * Use this to simply return the specified options.value - handy for conditional comments etc.
 * e.g.
 *   <pop:ext:echo value="<!--[if lt IE 9]>" escape="false" />
 *     <pop:javascript name="/js/html5shiv-min.js" />
 *   <pop:ext:echo value="<![endif]-->" escape="false" />
 */
exports.echo = function(options, enclosed, scope) {
  return options.value;
}