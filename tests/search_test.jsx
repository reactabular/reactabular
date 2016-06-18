import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Search } from '../src';
import { expect } from 'chai';

describe('Search', function () {
  it('should have a dropdown with default `all` option', function () {
    const search = TestUtils.renderIntoDocument(
      <Search />
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).to.equal(1);
    expect(options[0].value).to.equal('all');
  });

  it('should have a dropdown that contain columns that have both property and header', function () {
    const columns = [
      {
        property: 'first',
        header: 'First',
      },
      {
        property: 'second',
      },
      {
        header: 'Third',
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
    expect(options[1].value).to.equal(columns[0].property);
    expect(options[1].textContent).to.equal(columns[0].header);
  });

  it('should be able to yield results', function () {
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

  it('should be able to yield zero results', function () {
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

  it('should allow i18n', function () {
    const expected = 'Kaikki';
    const search = TestUtils.renderIntoDocument(
      <Search i18n={{ all: expected }} />
    );
    const select = TestUtils.findRenderedDOMComponentWithTag(search, 'select')[0];

    expect(select.text).to.equal(expected);
  });
});
