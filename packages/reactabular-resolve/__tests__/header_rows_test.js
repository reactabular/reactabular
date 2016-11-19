import * as resolve from '../src';

const resolveHeaderRows = resolve.headerRows;

describe('resolveHeaderRows', function () {
  it('returns columns wrapped in an array', function () {
    const column = {
      header: {
        label: 'bar'
      }
    };
    const columns = [column];
    const expected = [
      [
        {
          column: {
            ...column,
            props: {
              rowSpan: 1
            }
          },
          children: [],
          props: {
            className: '',
            rowSpan: 1,
            style: {}
          },
          ...column
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).toEqual(expected);
  });

  it('passes props to column result', function () {
    const props = {
      bar: 'bar'
    };
    const column = {
      header: {
        label: 'bar'
      },
      props
    };
    const columns = [column];
    const expected = [
      [
        {
          column: {
            ...column,
            props: {
              ...props,
              rowSpan: 1
            }
          },
          children: [],
          ...column,
          props: {
            ...props,
            className: '',
            rowSpan: 1,
            style: {}
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).toEqual(expected);
  });

  it('returns columns with child wrapped in an array', function () {
    const childColumn = {
      header: {
        label: 'foo'
      }
    };
    const column = {
      header: {
        label: 'bar'
      },
      children: [
        childColumn
      ]
    };
    const columns = [column];
    const expected = [
      [
        {
          ...column,
          children: [],
          column: {
            header: column.header,
            props: {
              colSpan: 1
            }
          },
          props: {
            className: '',
            colSpan: 1,
            style: {}
          }
        }
      ],
      [
        {
          ...childColumn,
          children: [],
          column: {
            children: [],
            column: {
              header: childColumn.header,
              props: {
                rowSpan: 1
              }
            },
            header: childColumn.header,
            props: {
              className: '',
              rowSpan: 1,
              style: {}
            }
          },
          props: {
            className: '',
            rowSpan: 1,
            style: {}
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).toEqual(expected);
  });

  it('calculates colSpan based on children', function () {
    const childColumn = {
      header: {
        label: 'foo'
      }
    };
    const column = {
      header: {
        label: 'bar'
      },
      children: [
        childColumn,
        childColumn
      ]
    };
    const columns = [column];
    const expected = [
      [
        {
          children: [],
          column: {
            header: column.header,
            props: {
              colSpan: 2
            }
          },
          header: column.header,
          props: {
            className: '',
            colSpan: 2,
            style: {}
          }
        }
      ],
      [
        {
          ...childColumn,
          children: [],
          column: {
            children: [],
            column: {
              header: {
                label: 'foo'
              },
              props: {
                rowSpan: 1
              }
            },
            header: {
              label: 'foo'
            },
            props: {
              className: '',
              rowSpan: 1,
              style: {}
            }
          },
          props: {
            className: '',
            rowSpan: 1,
            style: {}
          }
        },
        {
          ...childColumn,
          children: [],
          column: {
            children: [],
            column: {
              header: {
                label: 'foo'
              },
              props: {
                rowSpan: 1
              }
            },
            header: {
              label: 'foo'
            },
            props: {
              className: '',
              rowSpan: 1,
              style: {}
            }
          },
          props: {
            className: '',
            rowSpan: 1,
            style: {}
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).toEqual(expected);
  });

  it('calculates rowSpan based on siblings', function () {
    const basicColumn = {
      header: {
        label: 'foo'
      }
    };
    const column = {
      header: {
        label: 'bar'
      },
      children: [
        basicColumn,
        basicColumn
      ]
    };
    const columns = [basicColumn, column];
    const expected = [
      [
        {
          ...basicColumn,
          children: [],
          column: {
            header: {
              label: 'foo'
            },
            props: {
              rowSpan: 2
            }
          },
          props: {
            className: '',
            rowSpan: 2,
            style: {}
          }
        },
        {
          children: [],
          column: {
            header: {
              label: 'bar'
            },
            props: {
              colSpan: 2
            }
          },
          header: {
            label: 'bar'
          },
          props: {
            className: '',
            colSpan: 2,
            style: {}
          }
        }
      ],
      [
        {
          ...basicColumn,
          children: [],
          column: {
            children: [],
            column: {
              header: {
                label: 'foo'
              },
              props: {
                rowSpan: 1
              }
            },
            header: {
              label: 'foo'
            },
            props: {
              className: '',
              rowSpan: 1,
              style: {}
            }
          },
          props: {
            className: '',
            rowSpan: 1,
            style: {}
          }
        },
        {
          ...basicColumn,
          children: [],
          column: {
            children: [],
            column: {
              header: {
                label: 'foo'
              },
              props: {
                rowSpan: 1
              }
            },
            header: {
              label: 'foo'
            },
            props: {
              className: '',
              rowSpan: 1,
              style: {}
            }
          },
          props: {
            className: '',
            rowSpan: 1,
            style: {}
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).toEqual(expected);
  });
});
