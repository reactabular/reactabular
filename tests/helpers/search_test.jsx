import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Search } from '../../docs/helpers/';
import { expect } from 'chai';

describe('Search', function () {
  it('has a dropdown with default `all` option', function () {
    const search = TestUtils.renderIntoDocument(
      <Search />
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).to.equal(1);
    expect(options[0].value).to.equal('all');
  });

  it(`has a dropdown that contains columns
    which have both property and header`, function () {
    const columns = [
      {
        header: {
          value: 'First',
        },
        cell: {
          property: 'first',
        },
      },
      {
        cell: {
          property: 'second',
        },
      },
      {
        header: {
          value: 'Third',
        },
      },
    ];

    const search = TestUtils.renderIntoDocument(
      <Search columns={columns} />
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).to.equal(2);
    expect(options[0].value).to.equal('all');
    expect(options[1].value).to.equal(columns[0].cell.property);
    expect(options[1].textContent).to.equal(columns[0].header.value);
  });

  it('yields results', function () {
    const columns = [
      {
        property: 'first',
        header: 'First',
      },
    ];
    const value = 'demo';
    const data = [
      {
        first: value,
      },
    ];
    const result = function (d) {
      expect(d.data).to.equal(data);
    };
    const search = TestUtils.renderIntoDocument(
      <Search columns={columns} data={data} onResult={result} />
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
    input.value = value;

    TestUtils.Simulate.change(input);
  });

  it('yields zero results', function () {
    const columns = [
      {
        property: 'first',
        header: 'First',
      },
    ];
    const value = 'demo';
    const data = [
      {
        first: value,
      },
    ];
    const result = function (d) {
      expect(d.data.length).to.equal(0);
    };
    const search = TestUtils.renderIntoDocument(
      <Search columns={columns} data={data} onResult={result} />
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
    input.value = value + value;

    TestUtils.Simulate.change(input);
  });

  it('supports i18n', function () {
    const expected = 'Kaikki';
    const search = TestUtils.renderIntoDocument(
      <Search i18n={{ all: expected }} />
    );
    const select = TestUtils.findRenderedDOMComponentWithTag(search, 'select')[0];

    expect(select.text).to.equal(expected);
  });
});
