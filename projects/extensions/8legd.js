exports.redirectLink = function(options, enclosed, scope) {
    return "/server/redirect/" + "s?q=" + encodeURIComponent(options.link);
};