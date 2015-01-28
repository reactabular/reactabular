'use strict';

require('purecss/pure.css');
require('highlight.js/styles/github.css');
require('react-ghfork/style.css');
require('react-pagify/style.css');
require('../css/style.css');

var React = require('react');
var Fork = require('react-ghfork');

var FullTable = require('./full_table.jsx');
var EditorsTable = require('./editors_table.jsx');

var readme = require('../README.md');


module.exports = React.createClass({
    render() {
        return <div className='pure-g'>
            <Fork project='bebraw/reactabular'></Fork>
            <header className='pure-u-1'>
                <h1>Reactabular</h1>

                <div className='description'>Spectacular tables for React.js</div>
            </header>
            <article className='pure-u-1'>
                <section className='demonstration'>
                    <div className='description'>
                        <h2>Demonstration</h2>

                        <p>The demo below shows basic features of Reactabular. Besides usual pagination, sorting and filtering by search it is possible to modify various fields by clicking them. In addition you may remove entire rows by hitting `x` at the end of each.</p>

                        <p>Most of this functionality is optional and has been plugged on top of a small core. The rest is just basic React.js code.</p>

                        <p>There are hooks for connecting with data stores (ie. Flux architecture) and the library has been developed extensibility in mind. Ideally you shouldn't have to modify the library itself to get something done.</p>
                    </div>

                    <FullTable></FullTable>
                </section>
                <section className='editors'>
                    <div className='description'>
                        <h2>Editors</h2>

                        <p>The table below contains some sample editors you can use. It is possible to develop your own editors as long as you follow the same interface (`value`, `onValue` props).</p>
                    </div>

                    <EditorsTable></EditorsTable>
                </section>
                <section className='documentation'>
                    <h2>README</h2>

                    <div dangerouslySetInnerHTML={{__html: readme}}></div>
                </section>
            </article>
        </div>;
    },
});
