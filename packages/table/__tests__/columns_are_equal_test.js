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
});
