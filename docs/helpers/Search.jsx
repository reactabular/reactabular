import React from 'react';

export default class Search extends React.Component {
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
      onChange, columns, rows, i18n, ...props // eslint-disable-line no-unused-vars
    } = this.props;

    return (
      <div {...props}>
        <SearchOptions
          onChange={this.onColumnChange} value={this.state.column}
          columns={columns} i18n={i18n}
        />
        {columns.length ?
          <input onChange={this.onQueryChange} value={this.state.query} /> :
          null
        }
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
  rows: React.PropTypes.array,
  onChange: React.PropTypes.func,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  })
};
Search.defaultProps = {
  columns: [],
  rows: [],
  onChange: () => {},
  i18n: {
    all: 'All'
  }
};

const SearchOptions = ({ columns, i18n, ...props }) => (
  columns.length ? <select {...props}>{
    getOptions(columns, i18n).map(({ name, value }) =>
      <option key={`${value}-option`} value={value}>{name}</option>
    )
  }</select> : null
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
