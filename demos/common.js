import titleCase from 'title-case';
import generators from 'annogenerate';
import sample from 'lodash/sample';
import range from 'lodash/range';

import {properties2object} from 'schema2object';

export function paginate(data, o) {
  data = data || [];

    // adapt to zero indexed logic
  const page = o.page - 1 || 0;
  const perPage = o.perPage;

  const amountOfPages = Math.ceil(data.length / perPage);
  const startPage = page < amountOfPages? page: 0;

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
      const forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
        'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
      const surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

      return sample(forenames) + ' ' + sample(surnames);
    },
    position: function() {
      const positions = ['Boss', 'Contractor', 'Client', ''];

      return sample(positions);
    },
    salary: generators.number.bind(null, 0, 2),
    country: function() {
      return sample(countryValues);
    }
  };
}

export function generateData(o) {
  return attachIds(range(o.amount).map(() =>
    properties2object({
      generators: generators,
      fieldGenerators: o.fieldGenerators,
      properties: o.properties
    })
  ));
};

function attachIds(arr) {
  return arr.map((o, i) => {
    o.id = i;

    return o;
  });
}

export function find(arr, key, value) {
  return arr.reduce((a, b) => a[key] === value ? a : b[key] === value && b);
}
