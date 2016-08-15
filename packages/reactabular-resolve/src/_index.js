function index({ rowData, rowIndex }) {
  return {
    ...rowData,
    _index: rowIndex
  };
}

export default index;
