/* eslint-disable global-require */
module.exports = {
  Table: require('./Table').default,
  Search: require('./Search').default,
  sort: require('./sort'),
  editors: require('./editors'),
  formatters: require('./formatters'),
  predicates: require('./predicates'),
  cells: require('./cells'),
};
