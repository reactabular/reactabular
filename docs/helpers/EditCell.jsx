import React from 'react';
import Form from 'react-jsonschema-form';

// TODO: write wrappers for purecss so that the styling works
const EditCell = ({ formData, schema, uiSchema, onSubmit, onCancel, ...props }) => (
  <Form
    className="pure-form pure-form-aligned"
    schema={schema}
    uiSchema={uiSchema}
    formData={formData}
    onSubmit={({ formData }) => onSubmit(formData)} // eslint-disable-line no-shadow
    {...props}
  >
    <input
      type="submit"
      className="pure-button pure-button-primary ok-button"
      value="OK"
    />
    <input
      type="submit"
      onClick={e => {
        e.preventDefault();

        onCancel();
      }}
      className="pure-button cancel-button"
      value="Cancel"
    />
  </Form>
);
EditCell.propTypes = {
  formData: React.PropTypes.object,
  schema: React.PropTypes.object,
  uiSchema: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func
};

export default EditCell;
