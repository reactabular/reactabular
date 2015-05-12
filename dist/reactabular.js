(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react/addons"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("lodash"), require("react/addons"));
	else
		root["Reactabular"] = factory(root["lodash"], root["react/addons"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	    Table: __webpack_require__(10),
	    Search: __webpack_require__(2),
	    sortColumn: __webpack_require__(3),
	    editors: __webpack_require__(4),
	    formatters: __webpack_require__(5),
	    predicates: __webpack_require__(6),
	    cells: __webpack_require__(7),
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(9);
	
	
	module.exports = function()  {
	    return React.createClass({
	        displayName: 'Boolean',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onClick: React.PropTypes.func,
	            onValue: React.PropTypes.func,
	        },
	
	        render:function() {
	            return (
	                React.createElement("span", null, 
	                    React.createElement("button", {
	                        disabled: this.props.value, 
	                        onClick: this.props.onValue.bind(null, true)
	                    }, "✓"
	                    ), 
	                    React.createElement("button", {
	                        disabled: !this.props.value, 
	                        onClick: this.props.onValue.bind(null, false)
	                    }, "✗"
	                    )
	                )
	            );
	        }
	    });
	}.bind(this);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isString = __webpack_require__(8).isString;
	var React = __webpack_require__(9);
	
	var formatters = __webpack_require__(5);
	var predicates = __webpack_require__(6);
	
	
	module.exports = React.createClass({
	    displayName: 'Search',
	
	    propTypes: {
	        columns: React.PropTypes.array,
	        data: React.PropTypes.array,
	        onChange: React.PropTypes.func,
	        options: React.PropTypes.object
	    },
	
	    getDefaultProps:function() {
	        return {
	            columns: [],
	            data: [],
	            options: {
	                strategy: predicates.infix,
	                transform: formatters.lowercase
	            }
	        };
	    },
	
	    getInitialState:function() {
	        return {
	            column: 'all',
	            query: ''
	        };
	    },
	
	    render:function() {
	        var columns = this.props.columns;
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
	
	        return (
	            React.createElement("span", {className: "search"}, 
	                React.createElement("select", {onChange: this.onColumnChange, value: this.state.column}, options.map(function(option) 
	                    {return React.createElement("option", {key: option.value + '-option', value: option.value}, option.name);}
	                )
	                ), 
	                React.createElement("input", {onChange: this.onQueryChange, value: this.state.query})
	            )
	        );
	    },
	
	    onColumnChange:function(event) {
	        var column = event.target.value;
	        var query = this.state.query;
	        this.setState({
	            column: column
	        });
	
	        (this.props.onChange || noop)(
	            {
	                column: column,
	                data: this.filterData(column, query),
	                query: query
	            }
	        );
	    },
	
	    onQueryChange:function(event) {
	        var column = this.state.column;
	        var query = event.target.value;
	        this.setState({
	            query: query
	        });
	
	        (this.props.onChange || noop)(
	            {
	                column: column,
	                data: this.filterData(column, query),
	                query: query
	            }
	        );
	    },
	
	    componentDidMount:function() {
	        var column = this.state.column;
	        var query = this.state.query;
	
	        (this.props.onChange || noop)(
	            {
	                column: column,
	                data: this.filterData(column, query),
	                query: query
	            }
	        );
	    },
	
	    filterData:function(column, query) {
	        var columns = this.props.columns;
	        var data = this.props.data;
	
	        if(!query) {
	            return data;
	        }
	
	        if(column !== 'all') {
	            columns = columns.filter(function(col) 
	                {return col.property === column;}
	            );
	        }
	
	        return data.filter(function(row) 
	            {return columns.filter(isColumnVisible.bind(this, row)).length > 0;}.bind(this)
	        );
	
	        function isColumnVisible(row, col) {
	            var property = col.property;
	            var value = row[property];
	            var formatter = col.search || formatters.identity;
	            var formattedValue = formatter(value);
	
	            if (!formattedValue) {
	                return false;
	            }
	
	            if(!isString(formattedValue)) {
	                formattedValue = formattedValue.toString();
	            }
	
	            var predicate = this.props.options.strategy(this.props.options.transform(query));
	
	            return predicate.evaluate(this.props.options.transform(formattedValue));
	        }
	    },
	    matches:function(column, value) {
	        if (this.state.column !== 'all' && this.state.column !== column) {
	            return [];
	        }
	
	        var predicate = this.props.options.strategy(this.props.options.transform(this.state.query));
	        return predicate.matches(this.props.options.transform(value));
	    }
	});
	
	function id(a) {
	    return a;
	}
	
	function noop() {}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function(columns, column, data, done, sorter)  {
	    sorter = sorter || defaultSorter;
	
	    columns.map(function(column)  {
	        column.classes = {};
	
	        return column;
	    });
	
	    column.sort = column.sort? -column.sort: 1;
	    column.classes = {
	        'sort-asc': column.sort === 1,
	        'sort-desc': column.sort === -1
	    };
	
	    sorter(data, column);
	
	    done({
	        columns: columns,
	        data: data
	    });
	};
	
	function defaultSorter(data, column) {
	    var property = column.property;
	
	    data.sort(function(a, b)  {
	        var p1 = a[property] || '';
	        var p2 = b[property] || '';
	
	        if(p1.localeCompare) {
	            return p1.localeCompare(p2) * column.sort;
	        }
	
	        return (p1 - p2) * column.sort;
	    });
	}
	module.exports.defaultSorter = defaultSorter;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = {
	    boolean: __webpack_require__(1),
	    dropdown: __webpack_require__(11),
	    input: __webpack_require__(12),
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = {
	    highlight: __webpack_require__(13),
	    identity: __webpack_require__(14),
	    lowercase: __webpack_require__(15)
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = {
	    infix: __webpack_require__(16),
	    prefix: __webpack_require__(17)
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    identity: __webpack_require__(18),
	    edit: __webpack_require__(19),
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(8);
	
	var merge = _.merge;
	var transform = _.transform;
	var reduce = _.reduce;
	var isFunction = _.isFunction;
	var isPlainObject = _.isPlainObject;
	var isUndefined = _.isUndefined;
	
	var React = __webpack_require__(9);
	var cx = __webpack_require__(20);
	var formatters = __webpack_require__(5);
	var update = React.addons.update;
	
	
	module.exports = React.createClass({
	    displayName: 'Table',
	
	    propTypes: {
	        header: React.PropTypes.object,
	        data: React.PropTypes.array,
	        columns: React.PropTypes.array
	    },
	
	    getDefaultProps:function() {
	        return {
	            header: {},
	            data: [],
	            columns: []
	        };
	    },
	
	    render:function() {
	        var header = this.props.header;
	        var data = this.props.data;
	        var columns = this.props.columns;
	
	        var props = update(this.props, {
	            $merge: {
	                header: undefined,
	                data: undefined,
	                columns: undefined
	            }
	        });
	
	        return (
	            React.createElement("table", React.__spread({},  props), 
	                React.createElement("thead", null, 
	                    React.createElement("tr", null, 
	                        columns.map(function(column, i)  {
	                            var columnHeader = transform(header, function(result, v, k)  {
	                                result[k] = k.indexOf('on') === 0? v.bind(null, column): v;
	                            });
	
	                            return (
	                                React.createElement("th", React.__spread({
	                                    key: i + '-header', 
	                                    className: cx(column.classes)}, 
	                                    columnHeader
	                                ), column.header)
	                            );
	                        })
	                    )
	                ), 
	                React.createElement("tbody", null, 
	                    data.map(function(row, i)  {return React.createElement("tr", {key: i + '-row'}, 
	                        columns.map(function(column, j)  {
	                            var property = column.property;
	                            var value = row[property];
	                            var cell = column.cell || [formatters.identity];
	                            var content;
	
	                            cell = isFunction(cell)? [cell]: cell;
	
	                            content = reduce([value].concat(cell), function(v, fn)  {
	                                if(v && React.isValidElement(v.value)) {
	                                    return v;
	                                }
	
	                                if(isPlainObject(v)) {
	                                    return merge(v, {
	                                        value: fn(v.value, data, i, property)
	                                    });
	                                }
	
	                                var val = fn(v, data, i, property);
	
	                                if(val && !isUndefined(val.value)) {
	                                    return val;
	                                }
	
	                                // formatter shortcut
	                                return {
	                                    value: val
	                                };
	                            });
	
	                            content = content || {};
	
	                            return React.createElement("td", React.__spread({key: j + '-cell'},  content.props), content.value);
	                        }
	                    ));})
	                ), 
	                this.props.children
	            )
	        );
	    }
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(9);
	
	
	module.exports = function(options)  {
	    return React.createClass({
	        displayName: 'Dropdown',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onValue: React.PropTypes.func,
	        },
	
	        render:function() {
	            var edit = function(e)  {return this.props.onValue(e.target.value);}.bind(this);
	
	            return (
	                React.createElement("select", {onBlur: edit, onChange: edit, value: this.props.value}, 
	                    options.map(function(option, i) 
	                        {return React.createElement("option", {
	                            key: i, 
	                            value: option.value
	                        }, option.name);}
	                    )
	                )
	            );
	        }
	    });
	}.bind(this);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(9);
	
	
	module.exports = function()  {
	    return React.createClass({
	        displayName: 'Input',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onValue: React.PropTypes.func,
	        },
	
	        getInitialState:function() {
	            return {
	                value: '',
	            };
	        },
	
	        render:function() {
	            return (
	                React.createElement("input", {
	                    value: this.state.value || this.props.value, 
	                    onChange: this.onChange, 
	                    onKeyUp: this.keyUp, 
	                    onBlur: this.done}
	                )
	            );
	        },
	
	        onChange:function(e) {
	            this.setState({
	                value: e.target.value,
	            });
	        },
	
	        keyUp:function(e) {
	            if(e.keyCode === 13) {
	                this.done();
	            }
	        },
	
	        done:function() {
	            this.props.onValue(this.getDOMNode().value);
	        },
	    });
	}.bind(this);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(9);
	
	module.exports = function(getHighlights) {
	    return function(value) {
	        var children = [];
	        var highlights = getHighlights(value);
	        var currentPosition = 0;
	        for (var x = 0; x < highlights.length; x++) {
	            var nonMatchingPrefix = value.slice(currentPosition, highlights[x].startIndex);
	            var matchingText = value.slice(highlights[x].startIndex, highlights[x].startIndex + highlights[x].length);
	            currentPosition = highlights[x].startIndex + highlights[x].length;
	
	            if (nonMatchingPrefix.length > 0) {
	                children.push(React.createElement('span', null, nonMatchingPrefix));
	            }
	            children.push(React.createElement('span', {className: 'highlight'}, matchingText));
	        }
	        children.push(React.createElement('span', null, value.slice(currentPosition)));
	
	        var element = React.createElement('span', {className: 'search-result'}, children);
	        return element;
	    };
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function(value)  {
	    return value;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function(value)  {
	    return value.toLowerCase();
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function (infix) {
	    return {
	        evaluate: function(searchText) {
	            return searchText.indexOf(infix) !== -1;
	        },
	        matches: function(searchText) {
	            var splitString = searchText.split(infix);
	            var matches = [];
	            var currentPosition = 0;
	            for (var x = 0; x < splitString.length; x++) {
	                matches.push({
	                    startIndex: currentPosition + splitString[x].length,
	                    length: infix.length
	                });
	                currentPosition += splitString[x].length + infix.length;
	            }
	            matches.pop();
	            return matches;
	        }
	    };
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function (prefix) {
	    return {
	        evaluate: function(searchText) {
	            return searchText.indexOf(prefix) === 0;
	        },
	        matches: function(searchText) {
	            var prefixIndex = searchText.indexOf(prefix);
	            if (prefixIndex === 0) {
	                return [{
	                    startIndex: 0,
	                    length: prefix.length
	                }];
	            } else {
	                return [];
	            }
	        }
	    };
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function(value)  {
	    return {
	        value: value
	    };
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(9);
	
	
	module.exports = function(editProperty, onValue, o) {
	    onValue = onValue || noop;
	
	    var context = this;
	    var editor = o.editor;
	
	    return function(value, data, rowIndex, property)  {
	        var idx = rowIndex.toString() + '-' + property;
	        var editedCell = context.state[editProperty];
	
	        if(editedCell === idx) {
	            return {
	                value: React.createElement(editor, {
	                    value: value,
	                    onValue: function(value)  {
	                        var o = {};
	
	                        o[editProperty] = null;
	
	                        context.setState(o);
	
	                        onValue(value, data, rowIndex, property);
	                    }
	                }),
	            };
	        }
	
	        if(editor) {
	            return {
	                value: value,
	                props: {
	                    onClick: function()  {
	                        var o = {};
	
	                        o[editProperty] = idx;
	
	                        context.setState(o);
	                    },
	                }
	            };
	        }
	
	        return value;
	    };
	};
	
	function noop() {}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	function classNames () {
		'use strict';
	
		var classes = '';
	
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;
	
			var argType = typeof arg;
	
			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;
	
			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);
	
			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}
	
		return classes.substr(1);
	}
	
	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}
	
	/* global define */
	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map