'use strict';

var generators = require('annogenerate');
var math = require('annomath');

var properties2object = require('schema2object').properties2object;


module.exports = function(o) {
    return math.range(o.amount).map(() =>
        properties2object({
            generators: generators,
            fieldGenerators: o.fieldGenerators,
            properties: o.properties
        })
    );
};
