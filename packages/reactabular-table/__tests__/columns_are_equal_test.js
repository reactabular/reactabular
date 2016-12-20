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

  it('definitions with same header values and functions are equal', function () {
    const oldColumns = [{
      property: 'demo',
      header: {
        demo: () => {}
      }
    }];
    const newColumns = [{
      property: 'demo',
      header: {
        demo: () => {}
      }
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(true);
  });

  it('definitions with different header values and functions are not equal', function () {
    const oldColumns = [{
      property: 'demo',
      header: {
        label: 'foo',
        demo: () => {}
      }
    }];
    const newColumns = [{
      property: 'demo',
      header: {
        label: 'bar',
        demo: () => {}
      }
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(false);
  });

  it('definitions with same cell values and functions are equal', function () {
    const oldColumns = [{
      property: 'demo',
      cell: {
        demo: () => {}
      }
    }];
    const newColumns = [{
      property: 'demo',
      cell: {
        demo: () => {}
      }
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(true);
  });

  it('definitions with different cell values and functions are not equal', function () {
    const oldColumns = [{
      property: 'demo',
      cell: {
        label: 'foo',
        demo: () => {}
      }
    }];
    const newColumns = [{
      property: 'demo',
      cell: {
        label: 'bar',
        demo: () => {}
      }
    }];

    expect(columnsAreEqual(oldColumns, newColumns)).toEqual(false);
  });
});
