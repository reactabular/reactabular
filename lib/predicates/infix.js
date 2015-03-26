'use strict';


module.exports = function (infix) {
    return {
        matches: function(searchText) {
            return searchText.indexOf(infix) !== -1;
        }
    };
};
