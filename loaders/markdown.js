'use strict';

var marked = require('marked');
var highlight = require('highlight.js');

marked.setOptions({
    highlight: function(code) {
        return highlight.highlightAuto(code).value;
    }
});


module.exports = function(markdown) {
    this.cacheable();

    return marked(markdown);
};
