import strategies from './strategies';

const _columnMatches = ({
  query,
  castingStrategy = v => (Array.isArray(v) ? v : String(v)),
  column = {},
  row,
  strategy = strategies.infix,
  transform = (v = '') => v && v.toLowerCase && v.toLowerCase()
}) => {
  const property = column.property;
  if (!property) {
    return false;
  }
  const value = row[`_${property}`] || row[property];
  if (value == null) {
    return false;
  }
  // Pick resolved value by convention
  const resolvedValue = castingStrategy(value);

  return strategy(transform(query)).evaluate(transform(resolvedValue));
};

export default _columnMatches;
