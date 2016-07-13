import get from 'lodash/get';
import has from 'lodash/has';
import { resolveBodyColumns } from './table/utils';

function resolve({ columns }) {
  return rows => rows.map(
    row => resolveRow(columns, row)
  );
}

function resolveRow(columns, row) {
  const ret = { ...row }; // shallow clone

  resolveBodyColumns(columns).filter(a => a).forEach(
    column => {
      const property = column.cell && column.cell.property;

      if (!property) {
        return;
      }

      if (!has(row, property)) {
        console.warn(`resolve - Failed to find "${property}" property from`, row); // eslint-disable-line max-len, no-console
      }

      ret[`_${property}`] = get(row, property);
    }
  );

  return ret;
}

export default resolve;
