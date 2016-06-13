import React from 'react';

export default (attrs={}) => {
  class Input extends React.Component {
    constructor(props) {
      super(props);

      // TODO: capture initial value on mount too?
      this.state = {
        value: props.value
      };

      this.onFocus = this.onFocus.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.done = this.done.bind(this);
    }
    render() {
      return (
        <input
          ref='input'
          value={this.state.value}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onBlur={this.done}
          {...attrs} />
      );
    }
    onFocus(e) {
      this.moveCaretToEnd(e.target);
    }
    moveCaretToEnd(field) {
      const length = field.value.length;

      field.selectionStart = length;
      field.selectionEnd = length;
    }
    onChange(e) {
      this.setState({
        value: e.target.value,
      });
    }
    onKeyUp(e) {
      if(e.keyCode === 13) {
        this.done();
      }
    }
    done() {
      this.props.onValue(this.refs.input.value);
    }
  }
  Input.propTypes = {
    value: React.PropTypes.string,
    onValue: React.PropTypes.func,
  };

  return Input;
}
