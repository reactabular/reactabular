import React from 'react';
import { expect } from 'chai';
import { transforms } from '../src';

const { edit, sort } = transforms;

describe('edit', function () {
  it('activates editing', function () {
    const testIndex = 'test';
    let index;
    const editor = edit({
      getEditId() {
        return testIndex;
      },
      onActivate(idx) {
        index = idx;
      }
    });
    const result = editor('div')('foo', {
      rowData: {},
      property: 'foo'
    });

    result.onClick();

    expect(index).to.equal(testIndex);
  });

  it('returns an editor', function () {
    const testIndex = 'test';
    const editor = edit({
      getEditId() {
        return testIndex;
      },
      getEditProperty() {
        return testIndex;
      }
    });
    const value = 'foo';
    const editorElement = 'div';
    const result = editor(editorElement)(value, {
      rowData: {},
      property: 'foo'
    });

    expect(result.children.type).to.equal(editorElement);
    expect(result.children.props.value).to.equal(value);
  });

  it('passes onValue to an editor', function () {
    const testIndex = 'test';
    let receivedValue;
    const editor = edit({
      getEditId() {
        return testIndex;
      },
      getEditProperty() {
        return testIndex;
      },
      onValue({ value }) {
        receivedValue = value;
      }
    });
    const editorValue = 'foobar';
    const result = editor('div')('foo', {
      rowData: {},
      property: 'foo'
    });

    result.children.props.onValue(editorValue);

    expect(receivedValue).to.equal(editorValue);
  });

  it('passes rowData and property to getEditId', function () {
    let passedRowData;
    let passedProperty;
    const testRowData = {
      name: 'demo'
    };
    const testProperty = 'foo';
    const editor = edit({
      getEditId({ rowData, property }) {
        passedRowData = rowData;
        passedProperty = property;

        return rowData.name + property;
      },
      getEditProperty() {
        return testRowData.name + testProperty;
      }
    });
    const editorValue = 'foobar';
    const result = editor('div')('foo', {
      rowData: testRowData,
      property: testProperty
    });

    result.children.props.onValue(editorValue);

    expect(passedRowData).to.deep.equal(testRowData);
    expect(passedProperty).to.equal(testProperty);
  });

  it('converts to a formatter', function () {
    const editor = edit();
    const formatter = editor('div').toFormatter();

    expect(React.isValidElement(formatter)).to.equal(true);
  });
});

describe('sort', function () {
  it('defaults to sort-none class', function () {
    const sorter = sort();
    const result = sorter()('testValue', { columnIndex: 0 });

    expect(result.className).to.equal('sort sort-none');
  });

  it('sets sorting class', function () {
    const testColumnIndex = 0;
    const sortDirection = 'asc';
    const sorter = sort({
      getSortingColumns() {
        return {
          [testColumnIndex]: sortDirection
        };
      }
    });
    const result = sorter()('testValue', { columnIndex: testColumnIndex });

    expect(result.className).to.equal(`sort sort-${sortDirection}`);
  });

  it('triggers sorting on click', function () {
    const testColumnIndex = 0;
    let sorted;
    const sorter = sort({
      onSort(columnIndex) {
        sorted = columnIndex;
      }
    });
    const result = sorter()('testValue', { columnIndex: testColumnIndex });

    result.onClick();

    expect(sorted).to.equal(testColumnIndex);
  });

  it('converts to a formatter', function () {
    const sorter = sort();
    const formatter = sorter().toFormatter('testValue', { columnIndex: 0 });

    expect(React.isValidElement(formatter)).to.equal(true);
  });
});
