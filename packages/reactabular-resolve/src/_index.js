function index({ rowIndex }) {
  return rowData => ({
    ...rowData,
    _index: rowIndex
  });
}

export default index;
