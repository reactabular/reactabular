import strategies from './strategies';

const matches = ({
  value, query, strategy = strategies.infix, transform = v => v.toLowerCase()
} = {}) => {
  if (!query) {
    return {};
  }

  const val = value && value.toString ? value.toString() : '';

  return strategy(transform(query)).matches(transform(val));
};

export default matches;
