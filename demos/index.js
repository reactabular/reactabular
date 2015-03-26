'use strict';

require('purecss/build/pure.css');
require('highlight.js/styles/github.css');
require('react-ghfork/gh-fork-ribbon.ie.css');
require('react-ghfork/gh-fork-ribbon.css');
require('react-pagify/style.css');
require('./main.css');
require('./skylight.css');
require('../style.css');

var React = require('react'),
    App = require('./app');


React.render(<App />, document.body);
