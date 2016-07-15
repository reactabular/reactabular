Besides the search API itself, you are going to need some way to handle the user input. The following implementation tracks the search query and provides it through the `onChange` prop. You can consume it from there and plug it into the search algorithm to filter data.

```jsx
/*
import React from 'react';
*/

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      column: 'all',
      query: ''
    };

    this.onColumnChange = this.onColumnChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  componentDidMount() {
    this.props.onChange({
      [this.state.column]: this.state.query
    });
  }
  render() {
    const {
      onChange, columns, data, i18n, ...props
    } = this.props;

    return (
      <div {...props}>
        <SearchOptions
          onChange={this.onColumnChange} value={this.state.column}
          columns={columns} i18n={i18n}
        />
        <input onChange={this.onQueryChange} value={this.state.query} />
      </div>
    );
  }
  onColumnChange(event) {
    const column = event.target.value;
    const query = this.state.query;

    this.setState({ column });
    this.props.onChange({
      [column]: query
    });
  }
  onQueryChange(event) {
    const column = this.state.column;
    const query = event.target.value;

    this.setState({ query });
    this.props.onChange({
      [column]: query
    });
  }
}
Search.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  onChange: React.PropTypes.func,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  })
};
Search.defaultProps = {
  columns: [],
  data: [],
  onChange: () => {},
  i18n: {
    all: 'All'
  }
};

const SearchOptions = ({ columns, i18n, ...props }) => (
  <select {...props}>{
    getOptions(columns, i18n).map(({ name, value }) =>
      <option key={`${value}-option`} value={value}>{name}</option>
    )
  }</select>
);
SearchOptions.propTypes = {
  columns: React.PropTypes.array,
  i18n: React.PropTypes.object
};

const getOptions = (columns, i18n) => (
  (columns.length > 1 ? [{
    value: 'all',
    name: i18n.all
  }] : []).concat(columns.map(column => {
    if (
      (column.cell && column.cell.property) &&
      (column.header && column.header.label)
    ) {
      return {
        value: column.cell.property,
        name: column.header.label
      };
    }

    return null;
  }).filter(column => column))
);

<Search columns={columns} data={data} />
```