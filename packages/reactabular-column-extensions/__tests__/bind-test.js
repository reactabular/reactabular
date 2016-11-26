import { bind } from '../src';

describe('reactabular-column-extensions.bind', function () {
  it('returns the same structure without extensions', function () {
    const extensions = [];
    const columns = [
      {}
    ];

    expect(bind(extensions)(columns)).toEqual(columns);
  });

  it('matches and merges an extension', function () {
    const extensions = [
      {
        match({ cell }) {
          return cell.ok;
        },
        evaluate() {
          return {
            cell: {
              evaluated: true
            }
          };
        }
      }
    ];
    const columns = [
      {
        cell: {
          ok: true
        }
      }
    ];
    const expected = [
      {
        cell: {
          ok: true,
          evaluated: true
        }
      }
    ];

    expect(bind(extensions)(columns)).toEqual(expected);
  });

  it('passes column to evaluator', function () {
    const extensions = [
      {
        match({ cell }) {
          return cell.ok;
        },
        evaluate({ cell: { ok } }) {
          return {
            cell: {
              ok: ok + ok
            }
          };
        }
      }
    ];
    const columns = [
      {
        cell: {
          ok: 'foo'
        }
      }
    ];
    const expected = [
      {
        cell: {
          ok: 'foofoo'
        }
      }
    ];

    expect(bind(extensions)(columns)).toEqual(expected);
  });

  it('works with multiple evaluators', function () {
    const extensions = [
      {
        match({ cell }) {
          return cell.ok;
        },
        evaluate() {
          return {
            cell: {
              evaluated: true
            }
          };
        }
      },
      {
        match({ cell }) {
          return cell.ok;
        },
        evaluate() {
          return {
            cell: {
              evaluatedAgain: true
            }
          };
        }
      }
    ];
    const columns = [
      {
        cell: {
          ok: true
        }
      }
    ];
    const expected = [
      {
        cell: {
          ok: true,
          evaluated: true,
          evaluatedAgain: true
        }
      }
    ];

    expect(bind(extensions)(columns)).toEqual(expected);
  });
});
