Sometimes blablablalbla
- More than one table
- We dont know columns beforehand
- Columns and rows are received via props asyncly

```jsx
/*
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { Table, edit } from 'reactabular';
import uuid from 'uuid';
import hasIn from 'lodash/hasIn';

import { generateRows } from './helpers';
*/
//import hasIn from 'lodash/hasIn';

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
    company: {
      type: 'string'
    }
  },
  required: ['id', 'product', 'price', 'company']
};
/*
function getColumns(){
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

    return [
      {
        property: 'product',
        header: {
          label: 'Product'
        },
        cell: {
          transforms: [editable(edit.input())]
        }
      },
      {
        property: 'price',
        header: {
          label: 'Price'
        },
        cell: {
          transforms: [editable(edit.input({ props: { type: 'number' } }))]
        }
      },
      {
        property: 'company',
        header: {
          label: 'Company'
        },
        cell: {
          transforms: [editable(edit.input())]
        }
      },
    ];
}
*/
function getColumns(){
  let editable = edit.edit({
    isEditing: function({columnIndex, rowData}){
      return columnIndex === rowData.editing
    },
    onActivate: function({columnIndex, rowData}){
      const index = findIndex(this.state.rows, {id: rowData.id})
      const rows = cloneDeep(this.state.rows);
      rows[index].editing = columnIndex;
      this.setState({ rows });
    },
    onValue: function({value, rowData, property}){
      const index = findIndex(this.state.rows, { id: rowData.id });
      const rows = cloneDeep(this.state.rows);
    
      rows[index][property] = value;
      rows[index].editing = false;
    
      this.setState({ rows });
    }
  })
  return [
    {
      property: 'product',
      header: {
        label: 'Product'
      },
      cell: {
        transforms: [editable(edit.input())]
      }
    },
    {
      property: 'price',
      header: {
        label: 'Price'
      },
      cell: {
        transforms: [editable(edit.input({ props: { type: 'number' } }))]
      }
    },
    {
      property: 'company',
      header: {
        label: 'Company'
      },
      cell: {
        transforms: [editable(edit.input())]
      }
    },
  ];
}

//const bindMeToTransforms = (columns)=>{
function bindMeToTransforms(ob,columns){
  let muloc = cloneDeep(columns)
  console.log('biii ', ob)
  console.log('tr0 ', columns[0]['cell']['transforms'][0])
  columns[0]['cell']['transforms'][0] = columns[0]['cell']['transforms'][0].bind(ob)
}
class MyTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows: [], // NO initial rows
      columns: [] // NO initial columns
    };
  }
  componentWillReceiveProps(nextProps){
    let {rows, columns} = nextProps;
    bindMeToTransforms(this,columns)
    
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
      tableA:{
        rows:[],
        columns:[]
      }
    };
  }
  componentWillMount(){
    let tableA = {
      columns: getColumns(),
      rows: generateRows(5,schema)
    };
    setTimeout( ()=>{
      this.setState({ tableA } )
    },300)
      
  }
  render() {
    const {tableA} = this.state
    return(
      <MyTable rows={tableA.rows} columns={tableA.columns}/>
    );
  }
}

<Container />
```
