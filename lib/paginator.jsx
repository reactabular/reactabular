'use strict';

var React = require('react');
var math = require('annomath');


var Paginator = React.createClass({
    render() {
        var onSelect = this.props.onSelect || noop;
        var page = this.props.page;
        var pages = this.props.pages;

        return <ul className='pagination'>{
            math.range(pages).map((i) =>
                <li
                    key={'pagination-' + i}
                    onClick={onSelect.bind(null, i)}
                    className={i === page && 'selected'}>
                    <a href='#' onClick={this.preventDefault}>
                        {i + 1}
                    </a>
                </li>
            )
        }</ul>;
    },

    preventDefault(e) {
        e.preventDefault();
    },
});

function paginate(data, o) {
    data = data || [];
    data = data.filter((d) => !('_visible' in d) || d._visible);

    var page = o.page || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages? page: 0;

    return {
        amount: amountOfPages,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage
    };
}

function noop() {}

Paginator.paginate = paginate;

module.exports = Paginator;
