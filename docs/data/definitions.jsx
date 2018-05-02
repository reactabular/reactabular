const rows = [
  {
    id: 100,
    name: 'Adam',
    dad: 'John',
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: 'George',
    lovesBeeGees: false
  }
];

const columns = [
  {
    headerCell: 'Name',
    bodyCell: ({ name }, { renderer }) => renderer(name)
  },
  {
    headerCell: 'Dad',
    bodyCell: ({ dad }, { renderer }) => renderer(dad)
  }
];

export {
  rows,
  columns
};
