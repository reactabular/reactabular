/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import resizableColumn from '../src';

describe('resizableColumn', function () {
  it('throws an error if onDrag is not passed', function () {
    expect(resizableColumn).to.throw(Error);
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

    const resizableTransform = resizableColumn({
      onDrag: () => {},
      props
    })('foo', {});
    const renderedContainer = TestUtils.renderIntoDocument(
      <Wrapper>{resizableTransform}</Wrapper>
    );
    const container = TestUtils.findRenderedDOMComponentWithClass(
      renderedContainer, 'resize-container'
    );
    const handle = TestUtils.findRenderedDOMComponentWithClass(
      renderedContainer, 'resize-handle'
    );
    const value = TestUtils.findRenderedDOMComponentWithClass(
      renderedContainer, 'resize-value'
    );

    expect(container.style.color).to.equal(color);
    expect(handle.style.color).to.equal(color);
    expect(value.style.color).to.equal(color);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
