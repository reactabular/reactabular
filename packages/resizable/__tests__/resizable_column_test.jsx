/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import * as resizable from '../src';

const resizableColumn = resizable.column;

describe('resizableColumn', function () {
  it('throws an error if onDrag is not passed', function () {
    expect(resizableColumn).toThrowError(Error);
  });

  it('allows customization of props', function () {
    const color = 'red';
    const props = {
      container: {
        style: {
          color
        }
      },
      value: {
        style: {
          color
        }
      },
      handle: {
        style: {
          color
        }
      }
    };

    const resizableTransform = resizableColumn({ onDrag: () => {} })('foo', {}, props);
    const renderedContainer = TestUtils.renderIntoDocument(<Wrapper>{resizableTransform}</Wrapper>);
    const container = TestUtils.findRenderedDOMComponentWithClass(renderedContainer, 'resize-container');
    const handle = TestUtils.findRenderedDOMComponentWithClass(renderedContainer, 'resize-handle');
    const value = TestUtils.findRenderedDOMComponentWithClass(renderedContainer, 'resize-value');

    expect(container.style.color).toBe(color);
    expect(handle.style.color).toBe(color);
    expect(value.style.color).toBe(color);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
