const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John',
    },
    lovesBeeGees: true,
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George',
    },
    lovesBeeGees: false,
  },
];

const columns = [
  {
    header: {
      label: 'Name',
    },
    cell: {
      property: 'name',
    },
  },
  {
    header: {
      label: 'Dad',
    },
    cell: {
      property: 'dad.name',
    },
  },
];

export {
  data,
  columns,
};
