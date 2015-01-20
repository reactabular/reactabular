'use strict';

var generators = require('annogenerate');
var math = require('annomath');

var properties2object = require('schema2object').properties2object;


module.exports = function(o) {
    var properties = {
        name: {
            type: 'string'
        },
        position: {
            type: 'string'
        },
        salary: {
            type: 'number'
        },
        country: {
            type: 'string'
        },
        active: {
            type: 'boolean'
        }
    };
    var fieldGenerators = getFieldGenerators(o.countries);

    return math.range(o.amount).map(() =>
        properties2object({
            generators: generators,
            fieldGenerators: fieldGenerators,
            properties: properties
        })
    );
}

function getFieldGenerators(countries) {
    return {
        name: function() {
            var forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
            'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
            var surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

            return math.pick(forenames) + ' ' + math.pick(surnames);
        },
        position: function() {
            var positions = ['Boss', 'Contractor', 'Client'];

            return math.pick(positions);
        },
        salary: generators.number.bind(null, 0, 100000),
        country: function() {
            return math.pick(countries);
        }
    };
}
