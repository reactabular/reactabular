import React from 'react';

// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
const resizableColumn = (
  {
    onDrag,
    handleWidth = 5,
    minWidth = 100
  }
) => (label, extraParameters) => {
  class ResizableColumn extends React.Component {
    constructor(props) {
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
          ref={column => {
            if (column) {
              this.column = column;
            }
          }}
          style={{
            tableLayout: 'fixed',
            display: 'table',
            width: '100%'
          }}
        >
          <div
            className="resize-value"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              wordBreak: 'break-all',
              wordWrap: 'break-word',
              width: `calc(100% - ${handleWidth}px)`
            }}
          >{label}</div>
          <span
            className="resize-handle"
            style={{
              backgroundColor: '#aaa',
              cursor: 'col-resize',
              float: 'right',
              width: handleWidth
            }}
            onMouseDown={this.onMouseDown}
          >&nbsp;</span>
        </div>
      );
    }
    onMouseDown(e) {
      e.stopPropagation();
      e.preventDefault();

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);

      this.startX = e.clientX;
      this.startWidth = this.column.offsetWidth;
    }
    onMouseMove(e) {
      e.stopPropagation();
      e.preventDefault();

      const offset = this.startX - e.clientX;

      onDrag(
        Math.max(this.startWidth - offset, minWidth),
        extraParameters
      );
    }
    onMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  return React.createElement(ResizableColumn);
};

export default resizableColumn;
