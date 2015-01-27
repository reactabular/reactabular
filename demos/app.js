'use strict';

require('purecss/pure.css');
require('../css/style.css');

var React = require('react');

var FullTable = require('./full_table.jsx');
var EditorsTable = require('./editors_table.jsx');


module.exports = React.createClass({
    render() {
        return <div className='pure-g'>
            <a href='https://github.com/bebraw/reactabular'>
                <img
                    className='github-fork'
                    src='https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67'
                    alt='Fork me on GitHub'
                    data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png'></img>
            </a>
            <header className='pure-u-1'>
                <h1>Reactabular</h1>

                <div className='description'>Spectacular tables for React.js</div>
            </header>
            <article className='pure-u-1'>
                <div className='demonstration'>
                    <div className='description'>
                        <h2>Demonstration</h2>

                        <p>The demo below shows basic features of Reactabular. Besides usual pagination, sorting and filtering by search it is possible to modify various fields by clicking them. In addition you may remove entire rows by hitting `x` at the end of each.</p>

                        <p>Most of this functionality is optional and has been plugged on top of a small core. The rest is just basic React.js code.</p>

                        <p>There are hooks for connecting with data stores (ie. Flux architecture) and the library has been developed extensibility in mind. Ideally you shouldn't have to modify the library itself to get something done.</p>
                    </div>

                    <FullTable></FullTable>
                </div>
                <div className='editors'>
                    <div className='description'>
                        <h2>Editors</h2>

                        <p>The table below contains some sample editors you can use. It is possible to develop your own editors as long as you follow the same interface (`value`, `onValue` props).</p>
                    </div>

                    <EditorsTable></EditorsTable>
                </div>
                <div className='documentation'>
                    <h2>Documentation</h2>

                    <p>Please examine the demonstration source and check out <a href='https://github.com/bebraw/reactabular/blob/master/README.md'>project readme</a> for further information.</p>
                </div>
            </article>
        </div>;
    },
});
