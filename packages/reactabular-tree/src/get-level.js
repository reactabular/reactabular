import getParents from './get-parents';

function getLevel({
  rows,
  index,
  parent = 'parent'
}) {
  return getParents({ rows, index, parent }).length;
}

export default getLevel;
