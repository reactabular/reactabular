import React from 'react';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyPressed = this.onKeyPressed.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPressed);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPressed);
  }
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
  onKeyPressed(e) {
    const { rows, selectedRowIndex, onSelectRow } = this.props;

    // No selection yet, escape
    if (selectedRowIndex < 0) {
      return;
    }

    // Arrow Up
    if (e.keyCode === 38 && selectedRowIndex > 0) {
      e.preventDefault();

      onSelectRow(selectedRowIndex - 1);
    }

    // Arrow Down
    if (e.keyCode === 40 && selectedRowIndex < rows.length - 1) {
      e.preventDefault();

      onSelectRow(selectedRowIndex + 1);
    }
  }
}
Select.propTypes = {
  children: React.PropTypes.any.isRequired,
  selectedRowIndex: React.PropTypes.any,
  onSelectRow: React.PropTypes.func.isRequired,
  // TODO: Same as for table but this is enough for now
  // -> extract reactabular-types?
  rows: React.PropTypes.any.isRequired
};
Select.defaultProps = {
  onSelectRow: () => {}
};

export default Select;
