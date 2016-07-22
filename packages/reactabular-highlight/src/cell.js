import highlightValue from './value';

const highlightCell = (
  value,
  { rowData, property } = { rowData: { _highlights: {} } }
) => (
  highlightValue(
    value,
    rowData._highlights && rowData._highlights[property]
  )
);

export default highlightCell;
