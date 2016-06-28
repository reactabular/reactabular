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
      cellData: {},
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
      cellData: {},
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
      cellData: {},
      property: 'foo'
    });

    result.children.props.onValue(editorValue);

    expect(receivedValue).to.equal(editorValue);
  });

  it('passes cellData and property to getEditId', function () {
    let passedCellData;
    let passedProperty;
    const testCellData = {
      name: 'demo'
    };
    const testProperty = 'foo';
    const editor = edit({
      getEditId({ cellData, property }) {
        passedCellData = cellData;
        passedProperty = property;

        return cellData.name + property;
      },
      getEditProperty() {
        return testCellData.name + testProperty;
      }
    });
    const editorValue = 'foobar';
    const result = editor('div')('foo', {
      cellData: testCellData,
      property: testProperty
    });

    result.children.props.onValue(editorValue);

    expect(passedCellData).to.deep.equal(testCellData);
    expect(passedProperty).to.equal(testProperty);
  });
});

describe('sort', function () {
  it('defaults to sort-none class', function () {
    const sorter = sort();
    const result = sorter('test')();

    expect(result.className).to.equal('sort-none');
  });

  it('sets sorting class', function () {
    const testProperty = 'test';
    const sortDirection = 'asc';
    const sorter = sort({
      getSortingColumns() {
        return [
          {
            property: testProperty,
            sort: sortDirection
          }
        ];
      }
    });
    const result = sorter(testProperty)();

    expect(result.className).to.equal(`sort-${sortDirection}`);
  });

  it('triggers sorting on click', function () {
    const testProperty = 'test';
    let sorted;
    const sorter = sort({
      onSort(property) {
        sorted = property;
      }
    });
    const result = sorter(testProperty)();

    result.onClick();

    expect(sorted).to.equal(testProperty);
  });
});
