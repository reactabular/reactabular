import * as stylesheet from 'stylesheet-helpers';

function helper({ id }) {
  // Create a custom stylesheet for tracking styles.
  // Without creating a custom one we would need to modify
  // an existing one.
  //
  // This can fail on old IE due to low maximum stylesheet limit.
  const { styleSheetElement, styleSheet } = stylesheet.create();

  return {
    initialize(columns) {
      return initializeStyle({
        columns,
        id,
        styleSheet
      });
    },
    cleanup() {
      styleSheetElement.remove();
    },
    update({ column, columnIndex, width }) {
      const className = getClassName(column, columnIndex, id);

      updateWidth({ styleSheet, className, width });
    }
  };
}

function initializeStyle({
  columns,
  id,
  styleSheet
}) {
  return columns.map((column, columnIndex) => {
    const className = getClassName(column, columnIndex, id);

    updateWidth({ styleSheet, className, width: column.width });

    return {
      props: {
        ...column.props,
        className // XXX: This overrides possible className!
      },
      ...column
    };
  });
}

function updateWidth({
  styleSheet,
  className,
  width
}) {
  stylesheet.updateProperties(
    window,
    styleSheet,
    className,
    {
      width: `${width}px`,
      minWidth: `${width}px`,
      maxWidth: `${width}px`
    }
  );
}

function getClassName(column, columnIndex, id) {
  return `column-${id}-${columnIndex}`;
}

export default helper;
