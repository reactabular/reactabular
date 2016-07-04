import React from 'react';
import tableTypes from './types';
import {
  resolveHeaderRows, evaluateTransforms, mergeClassNames
} from './utils';

// This has to be a React component instead of a function.
// Otherwise refs won't work.
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children, className, ...props } = this.props;
    const { columns } = this.context;

    return (
      <thead {...props}>{
        resolveHeaderRows(columns).map((headerRow, i) => (
          <tr key={`${i}-header-row`}>{
            headerRow.map((column, j) => {
              const columnProps = column.props || {};
              const {
                label,
                transforms = [() => ({})],
                format = a => a,
                component = 'th',
                props // eslint-disable-line no-shadow
              } = column.header || {};
              const extraParameters = {
                columnIndex: j,
                column,
                rowData: label
              };
              const key = `${j}-header`;
              const transformed = evaluateTransforms(transforms, label, extraParameters);

              if (!transformed) {
                console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
              }

              const mergedClassName = mergeClassNames(
                className, transformed && transformed.className
              );

              return React.createElement(
                component,
                {
                  key,
                  ...columnProps,
                  ...props,
                  ...transformed,
                  ...{ className: mergedClassName }
                },
                transformed.children || format(label, extraParameters)
              );
            })
          }
          </tr>
        )
      )}
      {children}
      </thead>
    );
  }
}
Header.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.any
};
Header.contextTypes = {
  columns: tableTypes.columns
};

export default Header;
