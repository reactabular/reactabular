/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { formatters } from '../src';
import { expect } from 'chai';

const highlight = formatters.highlight;

describe('highlight', function () {
  it('does not highlight if there is no match at all', function () {
    const value = 'foobar';
    const highlighter = highlight(() => []);
    const result = TestUtils.renderIntoDocument(<Wrapper>{highlighter(value)}</Wrapper>);
    const searchResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'search-result'
    );

    expect(searchResult.children[0].innerHTML).to.equal(value);
  });

  it('highlights matching portion', function () {
    const value = 'foobar';
    const highlighter = highlight(() => [{
      startIndex: 0,
      length: 2,
    }]);
    const result = TestUtils.renderIntoDocument(<Wrapper>{highlighter(value)}</Wrapper>);
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).to.equal(value.slice(0, 2));
  });

  it('highlights from the middle', function () {
    const value = 'foobar';
    const highlighter = highlight(() => [{
      startIndex: 2,
      length: 4,
    }]);
    const result = TestUtils.renderIntoDocument(<Wrapper>{highlighter(value)}</Wrapper>);
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).to.equal(value.slice(2));
  });

  it('highlights whole if there is a full match', function () {
    const value = 'foobar';
    const highlighter = highlight(() => [{
      startIndex: 0,
      length: value.length,
    }]);
    const result = TestUtils.renderIntoDocument(<Wrapper>{highlighter(value)}</Wrapper>);
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).to.equal(value);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
