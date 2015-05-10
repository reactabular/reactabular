'use strict';


module.exports = function (prefix) {
    return {
        evaluate: function(searchText) {
            return searchText.indexOf(prefix) === 0;
        },
        matches: function(searchText) {
            var prefixIndex = searchText.indexOf(prefix);
            if (prefixIndex === 0) {
                return [{
                    startIndex: 0,
                    length: prefix.length
                }];
            } else {
                return [];
            }
        }
    };
};
