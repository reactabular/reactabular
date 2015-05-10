'use strict';
var React = require('react/addons');

module.exports = function(getHighlights) {
    return function(value) {
        var children = [];
        var highlights = getHighlights(value);
        var currentPosition = 0;
        for (var x = 0; x < highlights.length; x++) {
            var nonMatchingPrefix = value.slice(currentPosition, highlights[x].startIndex);
            var matchingText = value.slice(highlights[x].startIndex, highlights[x].startIndex + highlights[x].length);
            currentPosition = highlights[x].startIndex + highlights[x].length;

            if (nonMatchingPrefix.length > 0) {
                children.push(React.createElement('span', null, nonMatchingPrefix));
            }
            children.push(React.createElement('span', {className: 'highlight'}, matchingText));
        }
        children.push(React.createElement('span', null, value.slice(currentPosition)));

        var element = React.createElement('span', {className: 'search-result'}, children);
        return element;
    };
};
