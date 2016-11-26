function draggableHeader({
  onMoveColumns
}) {
  return {
    match({ header }) {
      return header.draggable;
    },
    evaluate({ header }) {
      if (!header.label) {
        console.warn( // eslint-disable-line no-console
          'reactabular-column-extensions.draggableHeader - missing header.label!'
        );
      }

      return {
        header: {
          props: {
            // DnD needs this to tell header cells apart.
            // TODO: It might be a good idea to model this as an id instead.
            label: header.label,
            onMove: onMoveColumns
          }
        }
      };
    }
  };
}

export default draggableHeader;
