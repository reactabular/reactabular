import getParents from './get-parents';

const getLevel = ({
  index,
  parentField = 'parent'
} = {}) => rows => (
  getParents({ index, parentField })(rows).length
);

export default getLevel;
