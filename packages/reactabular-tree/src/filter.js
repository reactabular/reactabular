import getParents from './get-parents';

const filterTree = ({
  fieldName,
  parentField = 'parent'
} = {}) => rows => rows.filter((row, index) => {
  if (typeof row[parentField] === 'undefined' || row[parentField] === null) {
    return true;
  }

  const parents = getParents({ index, parentField })(rows);

  return parents.filter(
    parent => parent[fieldName]
  ).length === parents.length;
});

export default filterTree;
