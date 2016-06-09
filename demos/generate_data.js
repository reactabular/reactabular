'use strict';

var generators = require('annogenerate');
var range = require('lodash/range');

var properties2object = require('schema2object').properties2object;

module.exports = function(o) {
    return range(o.amount).map(() =>
        properties2object({
            generators: generators,
            fieldGenerators: o.fieldGenerators,
            properties: o.properties
        })
    );
};
