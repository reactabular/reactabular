import calculateAverageHeight from './calculate-average-height';

const calculateRows = ({
  measuredRows,
  height,
  rowKey,
  rows,
  rowStartIndex,
  scrollTop = 0,
  overScan = 0
}) => {
  // Calculate amount of rows to render based on average height and take the
  // amount of actual rows into account.
  const averageHeight = calculateAverageHeight({ measuredRows, rows, rowKey });
  const amountOfRowsToRender = overScan * 2 + Math.ceil(height / averageHeight);

  const accumulatedRows = rows.slice(0, Math.max(rowStartIndex, 0));
  const accumulatedHeight = rowStartIndex > 0 ? accumulatedRows
    .map(row => measuredRows[row[rowKey]] || averageHeight)
    .reduce((a, b) => a + b, 0) : 0;

  const renderedOverScanRows = Math.max(startIndex - overScan, 0);
  const startIndex = Math.floor(scrollTop / averageHeight);
  const rowsToRender = rows.slice(
    renderedOverScanRows,
    Math.max(startIndex + overScan * 2 + amountOfRowsToRender, 0)
  );

  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.LOG_VIRTUALIZED) {
    console.log(
      // eslint-disable-line no-console
      'update rows to render',
      'scroll top',
      scrollTop,
      'measured rows',
      measuredRows,
      'amount of rows to render',
      amountOfRowsToRender,
      'rows to render',
      rowsToRender,
      'start index',
      startIndex,
      'average height',
      averageHeight
    );
  }

  // Escape if there are no rows to render for some reason
  if (!rowsToRender.length) {
    return null;
  }

  const startHeight = overScan < startIndex ? Math.max(Math.min(startIndex, overScan - 1) * averageHeight - accumulatedHeight, 0) : 0;

  // Calculate the padding of the last row so we can match whole height. This
  // won't be totally accurate if row heights differ but should get close
  // enough in most cases.
  const endHeight = Math.max(
    (rows.length - amountOfRowsToRender - overScan) * averageHeight -
      startHeight,
    0
  );

  if (
    process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.LOG_VIRTUALIZED
  ) {
    console.log(
      // eslint-disable-line no-console
      'average height',
      averageHeight,
      'body height',
      height,
      'scroll top',
      scrollTop,
      'start height',
      startHeight,
      'end height',
      endHeight
    );
  }

  return {
    rowsToRender,
    startIndex,
    showExtraRow: !(startIndex + overScan % 2),
    startHeight,
    endHeight
  };
};

export default calculateRows;
