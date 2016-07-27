Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

```jsx
/*
import React from 'react';
import EasyTable from 'reactabular-easy';
import cloneDeep from 'lodash/cloneDeep';

import { VisibilityToggles } from './helpers';
*/

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    boss: {
      $ref: '#/definitions/boss'
    }
  },
  required: ['id', 'age', 'boss'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    }
  }
};
const rows = generateRows(20, schema);

const columns = [
  {
    header: {
      label: 'Name',
      sortable: true,
      resizable: true
    },
    cell: {
      property: 'name',
      highlight: true
    },
    props: {
      style: {
        width: 200
      }
    },
    visible: true
  },
  {
    header: {
      label: 'Age',
      sortable: true
    },
    cell: {
      property: 'age',
      highlight: true
    },
    visible: true
  },
  {
    header: {
      label: 'Boss',
      sortable: true
    },
    cell: {
      property: 'boss.name',
      highlight: true
    },
    visible: false
  }
];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns,
      query: {}
    };

    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  render() {
    const { columns, query } = this.state;
    const cols = this.state.columns.filter(column => column.visible);

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <div className="search-container">
          <span>Search</span>
          <Search
            columns={cols}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>

        <EasyTable
          rows={rows}
          rowKey="id"
          columns={cols}
          query={query}
        />
      </div>
    );
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

<Demo />
```
