'use strict';

var React = require('react');
var zip = require('annozip');


exports.boolean = () => {
    return (active, done) => {
        return <span>
            <button
                disabled={active}
                onClick={done.bind(null, true)}
            >&#10003;
            </button>
            <button
                disabled={!active}
                onClick={done.bind(null, false)}
            >&#10007;
            </button>
        </span>
    };
};

exports.dropdown = (options) => {
    return (active, done) => {
        return <select onChange={(e) => done(e.target.value)} value={active}>
            {zip(options).map((pair, i) =>
                <option
                    key={i}
                    value={pair[0]}
                >{pair[1]}</option>
            )}
        </select>
    };
};
