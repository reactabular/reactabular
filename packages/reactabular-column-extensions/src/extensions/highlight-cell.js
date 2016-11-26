import * as search from 'searchtabular';

function highlightCell() {
  return {
    match({ cell }) {
      return cell.highlight;
    },
    evaluate() {
      return {
        cell: {
          formatters: [
            search.highlightCell
          ]
        }
      };
    }
  };
}

export default highlightCell;
