/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { search, highlight } from '../src';

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
});

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

describe('highlighter', function () {
  it('sorts ascending by default', function () {
    const columns = [
      {
        cell: {
          property: 'name'
        }
      }
    ];
    const rows = [
      { name: 'demo' },
      { name: 'another' }
    ];
    const expected = [
      {
        _highlights: {
          name: [
            {
              startIndex: 0,
              length: 4
            }
          ]
        },
        name: 'demo'
      },
      {
        _highlights: {
          name: []
        },
        name: 'another'
      }
    ];
    const result = highlight.highlighter({
      columns,
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(result).to.deep.equal(expected);
  });

  it('highlights resolved values', function () {
    const columns = [
      {
        cell: {
          property: 'name',
          resolve: v => v + v
        }
      }
    ];
    const rows = [
      { name: 'demo' },
      { name: 'another' }
    ];
    const expected = [
      {
        _highlights: {
          name: [
            {
              startIndex: 0,
              length: 4
            },
            {
              startIndex: 4,
              length: 4
            }
          ]
        },
        name: 'demo'
      },
      {
        _highlights: {
          name: []
        },
        name: 'another'
      }
    ];
    const result = highlight.highlighter({
      columns,
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(result).to.deep.equal(expected);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
