function countRowSpan(columns) {
  let maximumCount = 0;

  columns.forEach((column) => {
    if (column.children && column.children.length) {
      maximumCount = Math.max(
        maximumCount,
        countRowSpan(column.children)
      );
    }
  });

  return maximumCount + 1;
}

export default countRowSpan;
