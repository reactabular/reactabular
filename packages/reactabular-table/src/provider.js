import React from 'react';
import PropTypes from 'prop-types';
import { tableTypes, tableDefaults, tableContextTypes } from './types';

const componentDefaults = tableDefaults.renderers;

export default class Provider extends React.Component {
  getChildContext() {
    const { columns, components, renderers } = this.props;
    let finalRenderers = renderers;

    // XXXXX: Drop in the next major version
    if (components) {
      // eslint-disable-next-line no-console
      console.warn('`components` have been deprecated in favor of `renderers` and will be removed in the next major version, please rename!');

      finalRenderers = components;
    }

    return {
      columns,
      renderers: {
        table: finalRenderers.table || componentDefaults.table,
        header: { ...componentDefaults.header, ...finalRenderers.header },
        body: { ...componentDefaults.body, ...finalRenderers.body }
      }
    };
  }
  render() {
    const {
      columns, // eslint-disable-line no-unused-vars
      renderers,
      components, // XXXXX: Drop in the next major version
      children,
      ...props
    } = this.props;

    return React.createElement(
      renderers.table || tableDefaults.renderers.table,
      props,
      children
    );
  }
}
Provider.propTypes = {
  ...tableTypes,
  children: PropTypes.any
};
Provider.defaultProps = {
  ...tableDefaults
};
Provider.childContextTypes = tableContextTypes;
