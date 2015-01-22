(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("React"));
	else
		root["Reactabular"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = {
	    Table: __webpack_require__(1),
	    Search: __webpack_require__(2),
	    Paginator: __webpack_require__(3),
	    sortColumn: __webpack_require__(4),
	    editors: __webpack_require__(5),
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);

	var Cell = __webpack_require__(7);


	module.exports = React.createClass({displayName: "exports",
	    render:function() {
	        var events = this.props.events || {
	            selectedHeader: noop,
	            edited: noop
	        };
	        var data = this.props.data || [];
	        var columns = this.props.columns || [];

	        var cx = React.addons.classSet;

	        return (
	            React.createElement("table", null, 
	                React.createElement("thead", null, 
	                    React.createElement("tr", null, 
	                        columns.map(function(column, i) 
	                            {return React.createElement("th", {
	                                key: i + '-header', 
	                                className: cx(column.classes), 
	                                onClick: events.selectedHeader.bind(null, column)
	                            }, 
	                                column.header
	                            );})
	                        
	                    )
	                ), 
	                React.createElement("tbody", null, 
	                    data.filter(function(row) 
	                        {return !('_visible' in row) || row._visible;}
	                    ).map(function(row, i)  {return React.createElement("tr", {key: i + '-row'}, 
	                        columns.map(function(column, j) 
	                            {return column.cell? React.createElement("td", {key: j + '-cell'}, column.cell(i)):
	                            React.createElement(Cell, {
	                                key: j + '-cell', 
	                                formatter: column.formatter, 
	                                value: row[column.property], 
	                                editor: column.editor, 
	                                edited: function(value) 
	                                    {return events.edited(
	                                        i,
	                                        column.property,
	                                        value
	                                    );}
	                                }
	                            );}
	                    ));})
	                ), 
	                this.props.children
	            )
	        );
	    },
	});

	function noop() {}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);


	module.exports = React.createClass({displayName: "exports",
	    render:function() {
	        var columns = this.props.columns || [];
	        var options = [{
	            value: 'all',
	            name: 'All'
	        }].concat(columns.map(function(column)  {
	            if(column.property && column.header) {
	                return {
	                    value: column.property,
	                    name: column.header
	                };
	            }
	        }).filter(id));

	        return React.createElement("span", {className: "search"}, 
	            React.createElement("select", {ref: "column", onChange: this.change}, options.map(function(option) 
	                {return React.createElement("option", {key: option.value + '-option', value: option.value}, option.name);}
	            )
	            ), 
	            React.createElement("input", {ref: "query", onChange: this.change})
	        );
	    },

	    change:function(e) {
	        var query = this.refs.query.getDOMNode().value;
	        var column = this.refs.column.getDOMNode().value;

	        this.search(query, column);
	    },

	    search:function(query, column) {
	        if(!this.props.columns) {
	            return;
	        }

	        var data = this.props.data || [];
	        var columns = this.props.columns;

	        if(column !== 'all') {
	            columns = this.props.columns.filter(function(col) 
	                {return col.property === column;}
	            );
	        }

	        (this.props.onResult || noop)({
	            data: data.map(function(row)  {
	                row._visible = columns.filter(isColumnVisible.bind(null, row)).length > 0;

	                return row;
	            })
	        });

	        function isColumnVisible(row, column) {
	            var formatter = column.formatter || id;
	            var formattedValue = formatter(row[column.property]);

	            if(!formattedValue) {
	                return;
	            }

	            if(formattedValue.toLowerCase) {
	                return formattedValue.toLowerCase().indexOf(query.toLowerCase()) === 0;
	            }
	        }
	    },
	});

	function id(a) {return a;}
	function noop() {}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);


	var Paginator = React.createClass({displayName: "Paginator",
	    render:function() {
	        var onSelect = this.props.onSelect || noop;
	        var page = this.props.page;
	        var pages = this.props.pages;

	        return React.createElement("ul", {className: "pagination"}, 
	            range(pages).map(function(i) 
	                {return React.createElement("li", {
	                    key: 'pagination-' + i, 
	                    onClick: onSelect.bind(null, i), 
	                    className: i === page && 'selected'}, 
	                    React.createElement("a", {href: "#", onClick: this.preventDefault}, 
	                        i + 1
	                    )
	                );}.bind(this)
	            )
	        );
	    },

	    preventDefault:function(e) {
	        e.preventDefault();
	    },
	});

	function range(amount) {
	    var ret = [];
	    var i;

	    for(i = 0; i < amount; i++) {
	        ret.push(i);
	    }

	    return ret;
	}

	function paginate(data, o) {
	    data = data || [];
	    data = data.filter(function(d)  {return !('_visible' in d) || d._visible;});

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = function(columns, data, done)  {
	    return function(column)  {
	        var property = column.property;

	        columns.map(function(column)  {
	            column.classes = {};

	            return column;
	        });

	        column.sort = column.sort? -column.sort: 1;
	        column.classes = {
	            'sort-asc': column.sort === 1,
	            'sort-desc': column.sort === -1
	        };

	        data.sort(function(a, b)  {
	            if(a[property].localeCompare) {
	                return a[property].localeCompare(b[property]) * column.sort;
	            }

	            return (a[property] - b[property]) * column.sort;
	        });

	        done({
	            columns: columns,
	            data: data
	        });
	    };
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = {
	    boolean: __webpack_require__(8),
	    dropdown: __webpack_require__(9),
	    input: __webpack_require__(10),
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);


	module.exports = React.createClass({displayName: "exports",
	    getInitialState:function() {
	        return {
	            editing: false,
	        };
	    },

	    render:function() {
	        var value = this.props.value || '';
	        var formatter = this.props.formatter || id;

	        if(this.state && this.state.editing) {
	            return React.createElement(this.props.editor, {
	                value: value,
	                onEdit: this.edited
	            });
	        }

	        return React.createElement("td", {onClick: this.edit}, 
	            formatter(value)
	        );
	    },

	    edit:function() {
	        if(this.props.editor) {
	            this.setState({
	                editing: true
	            });
	        }
	    },

	    edited:function(value) {
	        (this.props.edited || noop)(value);

	        this.setState({
	            editing: false
	        });
	    },
	});

	function id(a) {return a;}
	function noop() {}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);


	module.exports = function()  {
	    return React.createClass({
	        render:function() {
	            return React.createElement("span", null, 
	            React.createElement("button", {
	                disabled: this.props.value, 
	                onClick: this.props.onEdit.bind(null, true)
	            }, "✓"
	            ), 
	            React.createElement("button", {
	                disabled: !this.props.value, 
	                onClick: this.props.onEdit.bind(null, false)
	            }, "✗"
	            )
	        );
	        }
	    });
	}.bind(this);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);


	module.exports = function(options)  {
	    return React.createClass({
	        render:function() {
	            var edit = function(e)  {return this.props.onEdit(e.target.value);}.bind(this);

	            return React.createElement("select", {onBlur: edit, onChange: edit, value: this.props.value}, 
	            options.map(function(option, i) 
	                {return React.createElement("option", {
	                    key: i, 
	                    value: option.value
	                }, option.name);}
	            )
	        );
	        }
	    });
	}.bind(this);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);


	module.exports = function()  {
	    return React.createClass({
	        render:function() {
	            return React.createElement("input", {
	                defaultValue: this.props.value, 
	                onKeyUp: this.keyUp, 
	                onBlur: this.done}
	            );
	        },

	        keyUp:function(e) {
	            if(e.keyCode === 13) {
	                this.done();
	            }
	        },

	        done:function() {
	            this.props.onEdit(this.getDOMNode().value);
	        },
	    });
	}.bind(this);


/***/ }
/******/ ])
});
