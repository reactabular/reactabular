import React from 'react';

export default function (
  editProperty,
  onValue = () => {},
  { editor, formatter = value => value }
) {
  const Edit = ({ value, cellData, property, cellKey }) => {
    const idx = `${cellKey}-${property}`;
    const editedCell = this.state[editProperty];

    if (editedCell === idx) {
      return React.createElement(
        editor,
        {
          value,
          onValue: (v) => {
            this.setState({ [editProperty]: null });

            onValue(v, cellData, property);
          },
        }
      );
    }

    if (editor) {
      return (
        <span onClick={() => this.setState({ [editProperty]: idx })}>
          {formatter(value)}
        </span>
      );
    }

    return formatter(value);
  };
  Edit.propTypes = {
    value: React.PropTypes.any,
    cellData: React.PropTypes.object.isRequired,
    property: React.PropTypes.string.isRequired,
    cellKey: React.PropTypes.string.isRequired,
  };

  return Edit;
}
