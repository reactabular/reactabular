import * as resizable from 'reactabular-resizable';

function resizableHeader({
  window,
  onDragColumnStart,
  onDragColumn,
  onDragColumnEnd,
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
              onDragStart: onDragColumnStart,
              onDrag: onDragColumn,
              onDragEnd: onDragColumnEnd,
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
