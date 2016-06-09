import React from 'react';
import Form from 'react-jsonschema-form';

// TODO: write wrappers for purecss so that the styling works
const EditCell = ({formData, properties, onSubmit, onCancel, ...props}) => {
    return (
        <Form
            className='pure-form pure-form-aligned'
            schema={{
                type: 'object',
                properties
            }}
            formData={formData}
            onSubmit={({formData}) => onSubmit(formData)}
            {...props}>
            <input type='submit'
                className='pure-button pure-button-primary ok-button'
                value='OK' />
            <input type='submit'
                onClick={e => {
                    e.preventDefault();

                    onCancel();
                }}
                className='pure-button cancel-button'
                value='Cancel' />
        </Form>
    );
};
EditCell.propTypes = {
    formData: React.PropTypes.object,
    properties: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func
};

export default EditCell;