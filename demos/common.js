import titleCase from 'title-case';
import generators from 'annogenerate';
import uuid from 'uuid';
import sample from 'lodash/sample';

export function paginate(data, o) {
    data = data || [];

    // adapt to zero indexed logic
    var page = o.page - 1 || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages? page: 0;

    return {
        amount: amountOfPages,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage
    };
}

export function augmentWithTitles(o) {
    for (var property in o) {
        o[property].title = titleCase(property);
    }

    return o;
}

export function getFieldGenerators(countryValues) {
    return {
        name: function() {
            var forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
            'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
            var surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

            return sample(forenames) + ' ' + sample(surnames);
        },
        position: function() {
            var positions = ['Boss', 'Contractor', 'Client', ''];

            return sample(positions);
        },
        salary: generators.number.bind(null, 0, 2),
        country: function() {
            return sample(countryValues);
        },
        id: function() {
            return uuid.v4();
        }
    };
}

export function attachIds(arr) {
    return arr.map((o, i) => {
        o.id = i;

        return o;
    });
}

export function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value ? a : b[key] === value && b);
}
