import * as tree from 'treetabular';

function toggleChildrenCell({
  idField,
  parentField,
  onToggleShowingChildren,
  props,
  rows
}) {
  return {
    match({ cell }) {
      return cell.toggleChildren;
    },
    evaluate() {
      return {
        cell: {
          formatters: [
            tree.toggleChildren({
              getRows: () => rows,
              getShowingChildren: ({ rowData }) => rowData.showingChildren,
              toggleShowingChildren: onToggleShowingChildren,
              // Without this it will perform checks against default id
              idField,
              parentField,
              props
            })
          ]
        }
      };
    }
  };
}

export default toggleChildrenCell;
