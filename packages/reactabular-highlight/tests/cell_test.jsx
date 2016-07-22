/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import * as highlight from '../src';

describe('highlight.cell', function () {
  it('digs data from _highlights of the row', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.cell(value, {
        rowData: {
          _highlights: {
            demo: [{ startIndex: 0, length: value.length }]
          }
        },
        property: 'demo'
      })}</Wrapper>
    );
    const highlightedResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightedResult.innerHTML).to.equal(value);
  });

  it('does not crash if only value is provided', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.cell(value)}</Wrapper>
    );
    const resultElement = TestUtils.findRenderedDOMComponentWithTag(
      result, 'span'
    );

    expect(resultElement.innerHTML).to.equal(value);
  });

  it('does not crash without _highlights', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.cell(value, { rowData: {} })}</Wrapper>
    );
    const resultElement = TestUtils.findRenderedDOMComponentWithTag(
      result, 'span'
    );

    expect(resultElement.innerHTML).to.equal(value);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
