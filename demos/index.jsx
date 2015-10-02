import 'purecss/build/pure.css';
import 'highlight.js/styles/github.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import './main.css';
import './skylight.css';
import '../style.css';

import React from 'react';
import App from './App.jsx';

main();

function main() {
    React.render(<App />, document.body);
}
