import { helper as resizableHelper } from '../src';

describe('helper', function () {
  it('merges column class names correctly', function () {
    const columns = [
      {
        property: 'demo',
        props: {
          className: 'demo'
        },
        visible: true
      }
    ];
    const expected = [
      {
        property: 'demo',
        props: {
          className: 'demo column-foo-bar'
        },
        visible: true
      }
    ];
    const helper = resizableHelper({
      globalId: 'foo',
      getId: () => 'bar'
    });

    expect(helper.initialize(columns)).toEqual(expected);
  });

  it('With nested columns, class names only leaf column correctly', function () {
    const column = {
      property: 'demo1',
      props: {
        className: 'demo1'
      },
      header: {
        label: 'Demo1'
      }
    };
    const childrenColumn = {
      property: 'boo',
      props: {
        className: 'boo'
      },
      header: {
        label: 'Boo'
      }
    };
    const column2 = {
      property: 'demo2',
      props: {
        className: 'demo2'
      },
      header: {
        label: 'Demo2'
      },
      children: [
        {
          property: 'cha',
          props: {
            className: 'cha'
          },
          header: {
            label: 'cha'
          }
        },
        childrenColumn
      ]
    };
    const columns = [column, column2];
    const expected = [
      Object.assign(column, {
        props: {
          className: 'demo1 column-foo-bar'
        }
      }),
      {
        property: 'demo2',
        props: {
          className: 'demo2'
        },
        header: {
          label: 'Demo2'
        },
        children: [
          {
            property: 'cha',
            props: {
              className: 'cha column-foo-bar'
            },
            header: {
              label: 'cha'
            }
          },
          {
            property: 'boo',
            props: {
              className: 'boo column-foo-bar'
            },
            header: {
              label: 'Boo'
            }
          }
        ]
      }
    ];

    const helper = resizableHelper({
      globalId: 'foo',
      getId: () => 'bar'
    });

    expect(helper.initialize(columns)).toEqual(expected);
  });
});
