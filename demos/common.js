import titleCase from 'title-case';
import generators from 'annogenerate';
import sample from 'lodash/sample';
import range from 'lodash/range';
import mapValues from 'lodash/mapValues';

import { properties2object } from 'schema2object';

export function paginate(data = [], o) {
    // adapt to zero indexed logic
  const page = o.page - 1 || 0;
  const perPage = o.perPage;

  const amountOfPages = Math.ceil(data.length / perPage);
  const startPage = page < amountOfPages ? page : 0;

  return {
    amount: amountOfPages,
    data: data.slice(startPage * perPage, startPage * perPage + perPage),
    page: startPage,
  };
}

export function augmentWithTitles(o) {
  return mapValues(o, (v, k) => ({
    ...v,
    title: titleCase(k),
  }));
}

export function getFieldGenerators(countryValues) {
  return {
    boss() {
      return {
        name: this.name(),
      };
    },
    name() {
      const forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
        'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
      const surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

      return `${sample(forenames)} ${sample(surnames)}`;
    },
    position() {
      const positions = ['Boss', 'Contractor', 'Client', ''];

      return sample(positions);
    },
    salary: generators.number.bind(null, 0, 2),
    country() {
      return sample(countryValues);
    },
  };
}

export function generateData(o) {
  return attachIds(range(o.amount).map(() =>
    properties2object({
      generators,
      ...o,
    })
  ));
}

function attachIds(arr) {
  return arr.map((o, i) => (
    {
      ...o,
      id: i,
    }
  ));
}

export function find(arr, key, value) {
  return arr.reduce((a, b) => {
    if (a[key] === value) {
      return a;
    }

    return b[key] === value && b;
  });
}
