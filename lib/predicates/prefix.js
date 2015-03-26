'use strict';


module.exports = function (prefix) {
    return {
        matches: function(searchText) {
            return searchText.indexOf(prefix) === 0;
        }
    };
};
