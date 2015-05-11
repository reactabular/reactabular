'use strict';


module.exports = function (infix) {
    return {
        evaluate: function(searchText) {
            return searchText.indexOf(infix) !== -1;
        },
        matches: function(searchText) {
            var splitString = searchText.split(infix);
            var matches = [];
            var currentPosition = 0;
            for (var x = 0; x < splitString.length; x++) {
                matches.push({
                    startIndex: currentPosition + splitString[x].length,
                    length: infix.length
                });
                currentPosition += splitString[x].length + infix.length;
            }
            matches.pop();
            return matches;
        }
    };
};
