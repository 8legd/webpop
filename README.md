8legd WebPop Work In Progress
=============================
A collection of WebPop extensions, templates etc.. What's [WebPop](http://www.webpop.com/ "Cloud CMS for Designers")?

**The official WebPop repos are at: https://github.com/webpop*


index.js, robots.tpl and sitemap.tpl
------------------------------------
This is an extension and some templates to dynamically generate a robots.txt and sitemap.xml. It currently uses 2 extra content fields (though am currently trying to refactor these out)

- pop:home.canonical_domain (required)

    This field needs to be added to the home section of your content (field type: Link) and is used to store the web site domain without a trailing slash e.g. http://www.example.com

- pop:content.menu_link (optional)

    I use this field for sections that just point to an external URL e.g. you might host a blog elsewhere and are including this as a section to display in a menu (well I have!) - anyway we wouldn't want to include this in a sitemap. Field type: Link
