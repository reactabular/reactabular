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
  },
  {
    id: 102,
    name: 'Jack',
    dad: 'George',
    lovesBeeGees: false
  }
];

const columns = [
  {
    property: 'name',
    headerCell: 'Name'
  },
  {
    property: 'dad',
    headerCell: 'Dad'
  }
];

export {
  rows,
  columns
};
