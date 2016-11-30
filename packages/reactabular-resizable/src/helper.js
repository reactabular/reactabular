import * as stylesheet from 'stylesheet-helpers';

function helper({ globalId, getId }) {
  // Create a custom stylesheet for tracking styles.
  // Without creating a custom one we would need to modify
  // an existing one.
  //
  // This can fail on old IE due to low maximum stylesheet limit.
  const { styleSheetElement, styleSheet } = stylesheet.create();

  return {
    initialize(columns) {
      return columns.map((column, index) => {
        const className = getClassName(globalId, getId(column, index));

        updateWidth({
          styleSheet,
          className,
          width: column.width
        });

        return {
          props: {
            ...column.props,
            className // XXX: This overrides possible className!
          },
          ...column
        };
      });
    },
    cleanup() {
      styleSheetElement.remove();
    },
    update({ column, width }) {
      updateWidth({
        styleSheet,
        className: getClassName(globalId, getId(column)),
        width
      });
    }
  };
}

function getClassName(globalId, localId) {
  return `column-${globalId}-${localId}`;
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

export default helper;
