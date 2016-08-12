/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import resizableColumn from '../src';

describe('resizableColumn', function () {
  it('throws an error if onDrag is not passed', function () {
    expect(resizableColumn).to.throw(Error);
  });

  it('allows styling container through the styles parameter', function () {
    const color = 'red';
    const styles = {
      container: {
        color
      }
    };

    const resizableTransform = resizableColumn({
      onDrag: () => {},
      styles
    })('foo', {});
    const renderedContainer = TestUtils.renderIntoDocument(
      <Wrapper>{resizableTransform}</Wrapper>
    );
    const container = TestUtils.findRenderedDOMComponentWithClass(
      renderedContainer, 'resize-container'
    );

    expect(container.style.color).to.equal(color);
  });

  it('allows styling value through the styles parameter', function () {
    const color = 'red';
    const styles = {
      value: {
        color
      }
    };

    const resizableTransform = resizableColumn({
      onDrag: () => {},
      styles
    })('foo', {});
    const renderedContainer = TestUtils.renderIntoDocument(
      <Wrapper>{resizableTransform}</Wrapper>
    );
    const value = TestUtils.findRenderedDOMComponentWithClass(
      renderedContainer, 'resize-value'
    );

    expect(value.style.color).to.equal(color);
  });

  it('allows styling handle through the styles parameter', function () {
    const color = 'red';
    const styles = {
      handle: {
        color
      }
    };

    const resizableTransform = resizableColumn({
      onDrag: () => {},
      styles
    })('foo', {});
    const renderedContainer = TestUtils.renderIntoDocument(
      <Wrapper>{resizableTransform}</Wrapper>
    );
    const handle = TestUtils.findRenderedDOMComponentWithClass(
      renderedContainer, 'resize-handle'
    );

    expect(handle.style.color).to.equal(color);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
