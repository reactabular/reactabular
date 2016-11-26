import * as resizable from 'reactabular-resizable';

function resizableHeader({
  window,
  onDragColumn,
  props
}) {
  return {
    match({ header }) {
      return header.resizable;
    },
    evaluate() {
      return {
        header: {
          formatters: [
            resizable.column({
              onDrag: onDragColumn,
              parent: window,
              props
            })
          ]
        }
      };
    }
  };
}

export default resizableHeader;
