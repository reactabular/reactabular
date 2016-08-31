import React from 'react';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

// This has to be a class as otherwise Virtualized.Body won't work (ref issue)
class BodyWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children, ...props } = this.props;
    const { startHeight, endHeight, showExtraRow } = this.context;
    const startRow = tr({
      key: 'start-row',
      style: {
        height: startHeight
      }
    });
    const endRow = tr({
      key: 'end-row',
      style: {
        height: endHeight
      }
    });
    // Extra row to keep onRow indexing stable instead of even/odd. This is important
    // for styling.
    const rows = [startRow].concat(children).concat(endRow);

    if (showExtraRow) {
      rows.unshift(tr({
        key: 'extra-row',
        style: {
          height: 0
        }
      }));
    }

    return React.createElement('tbody', props, rows);
  }
}
BodyWrapper.contextTypes = bodyWrapperContextTypes;
BodyWrapper.propTypes = bodyWrapperTypes;

function tr(props) {
  return React.createElement('tr', props);
}

export default BodyWrapper;
