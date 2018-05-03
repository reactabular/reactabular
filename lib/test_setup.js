/* eslint-disable global-require */
import React from 'react';
import Enzyme from 'enzyme';

let Adapter;

if (React.version.startsWith(16)) {
  Adapter = require('enzyme-adapter-react-16');
}
else {
  Adapter = require('enzyme-adapter-react-15');
}


Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line no-console
global.console = { log: console.log, error: console.error, warn: jest.fn() };
