'use strict';

var React = require('react');


module.exports = () => {
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
        </span>;
    };
};
