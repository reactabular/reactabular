import React from 'react';

// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
const resizableColumn = ({
  parent = document,
  onDragStart = (width, extra) => {}, // eslint-disable-line no-unused-vars
  onDrag = (width, extra) => {}, // eslint-disable-line no-unused-vars
  onDragEnd = (width, extra) => {}, // eslint-disable-line no-unused-vars
  minWidth = 10,
  props = {
    container: {},
    value: {},
    handle: {}
  }
}) => {
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
            {...props.container}
          >
            <span
              className="resize-value"
              {...props.value}
            >{label}
            </span>
            <span
              className="resize-handle"
              onMouseDown={this.onMouseDown}
              {...props.handle}
            >
              &nbsp;
            </span>
          </div>
        );
      }
      onMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();

        parent.addEventListener('mousemove', this.onMouseMove);
        parent.addEventListener('mouseup', this.onMouseUp);

        this.startX = event.clientX;
        this.startWidth = this.column.offsetWidth;

        this.triggerMove(onDragStart, event);
      }
      onMouseMove(event) {
        event.stopPropagation();
        event.preventDefault();

        this.triggerMove(onDrag, event);
      }
      onMouseUp(event) {
        event.stopPropagation();
        event.preventDefault();

        this.triggerMove(onDragEnd, event);

        parent.removeEventListener('mousemove', this.onMouseMove);
        parent.removeEventListener('mouseup', this.onMouseUp);
      }
      triggerMove(handler, event) {
        handler(
          Math.max(
            (this.startWidth - this.startX) + event.clientX,
            (extraParameters.column && extraParameters.column.minWidth) || minWidth
          ),
          extraParameters
        );
      }
    }

    return React.createElement(ResizableColumn);
  };
};

export default resizableColumn;
