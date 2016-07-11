If you want to implement a custom editor, you should accept `value` and `onValue` prop pair. The former will contain the current value and `onValue` should return a new one. It can be convenient to curry your editor so that you can pass custom `props` to it easily. Consider the following example.

```jsx
/*
import React from 'react';
*/

const boolean = ({ props } = {}) => {
  const Boolean = ({ value, onValue }) => (
    <div {...props}>
      <button
        disabled={value}
        onClick={() => onValue(true)}
      >&#10003;
      </button>
      <button
        disabled={!value}
        onClick={() => onValue(false)}
      >&#10007;
      </button>
    </div>
  );
  Boolean.propTypes = {
    value: React.PropTypes.any,
    onClick: React.PropTypes.func,
    onValue: React.PropTypes.func
  };

  return Boolean;
};

const Boolean = boolean({ style: {
  backgroundColor: '#ddd'
}});

<Boolean value onValue={v => alert(`You chose ${v}`)} />
```
