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
  // Pick resolved value by convention
  const resolvedValue = castingStrategy(row[`_${property}`] || row[property]);

  return strategy(transform(query)).evaluate(transform(resolvedValue));
};

export default _columnMatches;
