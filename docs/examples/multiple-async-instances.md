A usual scenario is one where we need to show several tables on the same page, where each table displays different data sets (either columns or rows, or both) received asynchronously. Ideally we'd like to re-use the same *Reactabular* component. Here is an example use-case that fulfills the following requirements:

- Both columns and rows are received/updated asynchronously via props, hence not known beforehand at first render.
- Multiple instances of the same Reactabular-based component are simultaneously rendered.
- Columns are configurable as *editable* dynamically.
- `Container` component manages the data externally.

In this particular case the data is received in this particular format (or a permutation of it):

```javascript
rows = [{id:'4348efbbb2e0',product:'Apple', company:'Apple Inc.', stock:34772, price:2.56},...{}]

columns = [['product','Product'], ['price','Unit Cost'],['company','Retailer']]
```

Note that each object in `rows` contain more fields than the ones desired to be displayed ( as indicated by `columns`)

```jsx
/*
import React from 'react';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import uuid from 'uuid';

import { generateRows } from './helpers';
*/

const fields = [
  ['id', 'SKU'],
  ['product', 'Product'],
  ['price', 'Unit Cost'],
  ['stock', 'Stock'],
  ['company', 'Retailer'],
  ['address', 'Address']
];
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    product: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    stock: {
      type: 'number'
    },
    address: {
      type: 'string'
    },
    company: {
      type: 'string'
    }
  },
  required: fields
};
function getColumns() {
  let fixed = ['product','price'];
  let fixedfields = fields.filter(e => fixed.includes(e[0]));
  let additional = shuffle(fields.filter(e => !fixed.includes(e[0])) ).slice(0,2);

  return fixedfields.concat(additional);
}
function formatColumns(colin) {
  return colin.map(c => ({
    property: c[0],
    header:{
      label: c[1]
    }
  }));
}
function setEditableColumns(colin) {
  let editable = edit.edit({
    isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
    onActivate: ({ columnIndex, rowData }) => {
      const index = findIndex(this.state.rows, { id: rowData.id });
      const rows = cloneDeep(this.state.rows);

      rows[index].editing = columnIndex;

      this.setState({ rows });
    },
    onValue: ({ value, rowData, property }) => {
      const index = findIndex(this.state.rows, { id: rowData.id });
      const rows = cloneDeep(this.state.rows);

      rows[index][property] = value;
      rows[index].editing = false;

      this.setState({ rows });
    }
  });

  return cloneDeep(colin).map(function(c) {
    c['cell'] = {}
    c['cell']['transforms'] = [editable(edit.input())]

    return c;
  });
}

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [], // NO initial rows
      columns: [] // NO initial columns
    };
  }
  componentWillReceiveProps(nextProps) {
    let { rows, columns } = nextProps;
    columns = setEditableColumns.call(this, formatColumns(columns))

    this.setState({ rows, columns });
  }
  render(){
    let { columns, rows } = this.state;
    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableA: {
        rows: [],
        columns: []
      },
      tableB: {
        rows: [],
        columns: []
      }
    };
    this.changeSet=this.changeSet.bind(this)
  }
  changeSet(letter) {
    const newset = {}

    newset['table'+letter] = {
      columns: getColumns(),
      rows: generateRows(5,schema)
    };

    this.setState({ ...newset });
  }
  componentWillMount() {
    const tableA = {
      columns: getColumns(),
      rows: generateRows(5,schema)
    };
    const tableB = {
      columns: getColumns(),
      rows: generateRows(5,schema)
    };
    setTimeout( ()=>{
      this.setState({ tableA,tableB } )
    },300)
  }
  render() {
    const {tableA,tableB} = this.state;

    return (
      <div>
        <div>
          <h4>
            Table A
            &emsp;
            <button title='Click to randomize the dataset' onClick={()=> this.changeSet('A')}>Change Table A</button>
          </h4>
          <MyTable rows={tableA.rows} columns={tableA.columns}/>
        </div>
        <div>
          <h4>
            Table B
            &emsp;
            <button title='Click to randomize the dataset' onClick={()=> this.changeSet('B')}>Change Table B</button>
          </h4>
          <MyTable rows={tableB.rows} columns={tableB.columns}/>
        </div>
      </div>
    );
  }
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

<Container />
```
