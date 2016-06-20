import 'purecss/build/pure.css';
import 'highlight.js/styles/github.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import './main.css';
import './skylight.css';
import '../style.css';

import pkg from '../package.json';

Catalog.render({
  title: `Reactabular v${pkg.version}`,
  pages: [
    {
      path: '/',
      title: 'Introduction',
      src: '../README.md'
    },
    // Other pages …
  ],
}, document.getElementById('app'));
