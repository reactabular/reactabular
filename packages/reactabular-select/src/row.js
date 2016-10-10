function selectRow({
  rows,
  isSelected = (row, selectedRowId) => row.id === selectedRowId, // eslint-disable-line no-shadow
  selectedRowId
}) {
  let selectedRow;

  // Reset selected flags and select the given row
  const newRows = rows.map((row) => {
    let selected = false;

    if (isSelected(row, selectedRowId)) {
      selected = true;

      selectedRow = row;
    }

    return {
      ...row,
      selected
    };
  });

  return {
    rows: newRows,
    selectedRow
  };
}

export default selectRow;
