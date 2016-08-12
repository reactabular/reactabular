/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Search from '../src';

describe('Search', function () {
  it('does not have all option with a single column', function () {
    const columns = [
      {
        header: {
          label: 'First'
        },
        cell: {
          property: 'first'
        }
      }
    ];

    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Search columns={columns} />
      </Wrapper>
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).to.equal(1);
    expect(options[0].value).to.equal(columns[0].cell.property);
    expect(options[0].textContent).to.equal(columns[0].header.label);
  });

  it(`has a dropdown that contains columns
    which have both property and header`, function () {
    const columns = [
      {
        header: {
          label: 'First'
        },
        cell: {
          property: 'first'
        }
      },
      {
        cell: {
          property: 'second'
        }
      },
      {
        header: {
          label: 'Third'
        }
      }
    ];

    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Search columns={columns} />
      </Wrapper>
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).to.equal(2);
    expect(options[0].value).to.equal('all');
    expect(options[1].value).to.equal(columns[0].cell.property);
    expect(options[1].textContent).to.equal(columns[0].header.label);
  });

  it('accepts column', function () {
    const expectedColumn = 'column';
    const columns = [
      {
        header: {
          label: 'First'
        },
        cell: {
          property: expectedColumn
        }
      }
    ];

    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Search columns={columns} column={expectedColumn} />
      </Wrapper>
    );
    const select = TestUtils.findRenderedDOMComponentWithTag(
      search, 'select'
    );

    expect(select.value).to.equal(expectedColumn);
  });

  it('yields results', function () {
    const columns = [
      {
        property: 'first',
        header: 'First'
      }
    ];
    const value = 'demo';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Search columns={columns} />
      </Wrapper>
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
    input.value = value;

    TestUtils.Simulate.change(input);
  });

  it('yields zero results', function () {
    const columns = [
      {
        property: 'first',
        header: 'First'
      }
    ];
    const value = 'demo';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Search columns={columns} />
      </Wrapper>
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
    input.value = value + value;

    TestUtils.Simulate.change(input);
  });

  it('supports i18n', function () {
    const columns = [
      {
        header: {
          label: 'First'
        },
        cell: {
          property: 'first'
        }
      },
      {
        cell: {
          property: 'second'
        }
      },
      {
        header: {
          label: 'Third'
        }
      }
    ];
    const expected = 'Kaikki';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Search columns={columns} i18n={{ all: expected }} />
      </Wrapper>
    );
    const select = TestUtils.findRenderedDOMComponentWithTag(search, 'select')[0];

    expect(select.text).to.equal(expected);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
