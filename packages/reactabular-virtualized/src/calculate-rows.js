import calculateAverageHeight from './calculate-average-height';

const calculateRows = ({
  measuredRows,
  height,
  rowKey,
  rows,
  scrollTop = 0
}) => {
  // Calculate amount of rows to render based on average height and take the
  // amount of actual rows into account.
  const averageHeight = calculateAverageHeight({ measuredRows, rows, rowKey });
  const amountOfRowsToRender = Math.ceil(height / averageHeight) + 2;

  const startIndex = Math.floor(scrollTop / averageHeight);
  const rowsToRender = rows.slice(
    startIndex,
    startIndex + amountOfRowsToRender
  );

  if (process.env.NODE_ENV !== 'production' && window.LOG_VIRTUALIZED) {
    console.log( // eslint-disable-line no-console
      'update rows to render',
      'scroll top', scrollTop,
      'measured rows', measuredRows,
      'amount of rows to render', amountOfRowsToRender,
      'rows to render', rowsToRender,
      'start index', startIndex
    );
  }

  // Escape if there are no rows to render for some reason
  if (!rowsToRender.length) {
    return null;
  }

  const startHeight = startIndex * averageHeight;

  // Calculate the padding of the last row so we can match whole height. This
  // won't be totally accurate if row heights differ but should get close
  // enough in most cases.
  const endHeight = Math.max(
    (
      (
        rows.length - amountOfRowsToRender
      ) * averageHeight
    ) - startHeight,
    0
  );

  if (process.env.NODE_ENV !== 'production' && window.LOG_VIRTUALIZED) {
    console.log( // eslint-disable-line no-console
      'average height', averageHeight,
      'body height', height,
      'scroll top', scrollTop,
      'start height', startHeight,
      'end height', endHeight
    );
  }

  return {
    amountOfRowsToRender,
    startIndex,
    showExtraRow: !(startIndex % 2),
    startHeight,
    endHeight
  };
};

export default calculateRows;
