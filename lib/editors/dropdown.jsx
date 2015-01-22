'use strict';

var React = require('react');


module.exports = (options) => {
    return (active, done) => {
        return <select onChange={(e) => done(e.target.value)} value={active}>
            {options.map((option, i) =>
                <option
                    key={i}
                    value={option.value}
                >{option.name}</option>
            )}
        </select>;
    };
};
