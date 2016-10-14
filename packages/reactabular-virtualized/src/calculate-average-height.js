import { resolveRowKey } from 'reactabular-utils';

const calculateAverageHeight = ({
  measuredRows, rows, rowKey
}) => {
  const resolvedRowKeys = rows.map((rowData, rowIndex) => (
    resolveRowKey({ rowData, rowIndex, rowKey }))
  );
  const measuredAmounts = Object.keys(measuredRows).filter(
    key => resolvedRowKeys.indexOf(key) >= 0
  ).map(key => measuredRows[key]);
  const amountOfMeasuredRows = measuredAmounts.length;

  return measuredAmounts.reduce(
    (a, b) => a + (b / amountOfMeasuredRows),
    0
  );
};

export default calculateAverageHeight;
