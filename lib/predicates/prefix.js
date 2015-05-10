'use strict';


module.exports = function (prefix) {
    return {
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
