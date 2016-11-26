import * as sort from 'sortabular';

function sortableHeader({
  sortingColumns,
  onSort,
  props,
  strategy
}) {
  return {
    match({ header }) {
      return header.sortable;
    },
    evaluate() {
      const getSortingColumns = () => sortingColumns || {};
      const sortable = sort.sort({
        getSortingColumns,
        onSort: (selectedColumn) => {
          onSort(
            sort.byColumns({
              sortingColumns,
              selectedColumn
            })
          );
        },
        strategy,
        props
      });

      return {
        header: {
          formatters: [
            sort.header({
              sortable,
              getSortingColumns,
              strategy
            })
          ],
          transforms: [
            sort.reset({
              event: 'onDoubleClick',
              getSortingColumns,
              strategy,
              onReset: params => onSort(params.sortingColumns)
            })
          ]
        }
      };
    }
  };
}

export default sortableHeader;
