import React from 'react';

// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
const resizableColumn = (
  {
    parent = document,
    onDrag,
    minWidth = 100,
    props = {
      container: {},
      value: {},
      handle: {}
    },
    // XXXXX: remove in the next major version
    styles = {
      container: {},
      value: {},
      handle: {}
    }
  }
) => {
  if (!onDrag) {
    throw new Error('resizableColumn - Missing onDrag!');
  }

  return (label, extraParameters) => {
    class ResizableColumn extends React.Component {
      constructor(props) { // eslint-disable-line no-shadow
        super(props);

        // Track coordinate rows at instance, no React state needed
        this.startX = null;
        this.startWidth = null;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        // Stash ref so we can check width
        this.column = null;
      }
      render() {
        return (
          <div
            className="resize-container"
            ref={(column) => {
              if (column) {
                this.column = column;
              }
            }}
            style={styles.container}
            {...props.container}
          >
            <span
              className="resize-value"
              style={styles.value}
              {...props.value}
            >{label}</span>
            <span
              className="resize-handle"
              onMouseDown={this.onMouseDown}
              style={styles.handle}
              {...props.handle}
            >
              &nbsp;
            </span>
          </div>
        );
      }
      onMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();

        parent.addEventListener('mousemove', this.onMouseMove);
        parent.addEventListener('mouseup', this.onMouseUp);

        this.startX = e.clientX;
        this.startWidth = this.column.offsetWidth;
      }
      onMouseMove(e) {
        e.stopPropagation();
        e.preventDefault();

        onDrag(
          Math.max((this.startWidth - this.startX) + e.clientX, minWidth),
          extraParameters
        );
      }
      onMouseUp(e) {
        e.stopPropagation();
        e.preventDefault();

        parent.removeEventListener('mousemove', this.onMouseMove);
        parent.removeEventListener('mouseup', this.onMouseUp);
      }
    }

    return React.createElement(ResizableColumn);
  };
};

export default resizableColumn;
