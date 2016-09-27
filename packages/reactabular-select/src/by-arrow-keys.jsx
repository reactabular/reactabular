import React from 'react';
import Select from './Select';

const byArrowKeys = props => children => React.createElement(Select, props, children);

export default byArrowKeys;
