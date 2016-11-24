import { columnsAreEqual } from '../src';

describe('utils.columnsAreEqual', function () {
  it('empties are equal', function () {
    const oldColumns = [];
    const newColumns = [];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(true);
  });

  it('definitions content are not equal', function () {
    const oldColumns = [];
    const newColumns = [{}];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(false);
  });

  it('definitions with different field values are not equal', function () {
    const oldColumns = [{
      property: 'demo'
    }];
    const newColumns = [{
      property: 'another'
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(false);
  });

  it('definitions with same field values are equal', function () {
    const oldColumns = [{
      property: 'demo'
    }];
    const newColumns = [{
      property: 'demo'
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(true);
  });

  it('definitions with same field values and functions are equal', function () {
    const oldColumns = [{
      property: 'demo',
      demo: () => {}
    }];
    const newColumns = [{
      property: 'demo',
      demo: () => {}
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(true);
  });
});
