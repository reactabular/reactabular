import React from 'react';

const toFormatter = (transform, element = 'div') => (
  React.createElement(
    element,
    transform
  )
);

export default {
  toFormatter
};
