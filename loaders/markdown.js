const marked = require('marked');
const highlight = require('highlight.js');

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});

module.exports = function (markdown) {
  this.cacheable();

  return marked(markdown);
};
