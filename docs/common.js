import mapValues from 'lodash/mapValues';

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

export function find(arr, key, value) {
  return arr.reduce((a, b) => {
    if (a[key] === value) {
      return a;
    }

    return b[key] === value && b;
  });
}
