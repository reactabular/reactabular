import React from 'react';

// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
const resizableColumn = (
  {
    getWidth,
    onDrag,
    handleWidth = 5,
    minWidth = 100
  }
) => (label, extraParameters) => {
  class ResizableColumn extends React.Component {
    constructor(props) {
      super(props);

      // Track coordinate data at instance, no React state needed
      this.startX = null;
      this.startWidth = null;

      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
    }
    render() {
      const width = getWidth(extraParameters.column);

      return (
        <div style={{ width }}>
          <div
            className="resize-value"
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: width - handleWidth
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
      this.startWidth = getWidth(extraParameters.column);
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
