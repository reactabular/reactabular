/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import * as highlight from '../src';

describe('highlight.value', function () {
  it('does not highlight if there is no match at all', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.value(value, [])}</Wrapper>
    );
    const searchResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'search-result'
    );

    expect(searchResult.children[0].innerHTML).to.equal(value);
  });

  it('highlights matching portion', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.value(value, [{ startIndex: 0, length: 2 }])}</Wrapper>
    );
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).to.equal(value.slice(0, 2));
  });

  it('highlights from the middle', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.value(value, [{ startIndex: 2, length: 4 }])}</Wrapper>
    );
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).to.equal(value.slice(2));
  });

  it('highlights whole if there is a full match', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.value(value, [{ startIndex: 0, length: value.length }])}</Wrapper>
    );
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).to.equal(value);
  });

  it('does not crash without highlights', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{highlight.value(value)}</Wrapper>
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
