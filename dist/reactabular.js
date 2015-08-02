(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react/addons"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("lodash"), require("react/addons"));
	else
		root["Reactabular"] = factory(root["lodash"], root["react/addons"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	    Search: __webpack_require__(5),
	    sortColumn: __webpack_require__(13),
	    editors: __webpack_require__(14),
	    formatters: __webpack_require__(6),
	    predicates: __webpack_require__(10),
	    cells: __webpack_require__(18)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _ = __webpack_require__(2);
	
	var merge = _.merge;
	var transform = _.transform;
	var reduce = _.reduce;
	var isFunction = _.isFunction;
	var isPlainObject = _.isPlainObject;
	var isUndefined = _.isUndefined;
	
	var React = __webpack_require__(3);
	var cx = __webpack_require__(4);
	var update = React.addons.update;
	
	module.exports = React.createClass({
	    displayName: 'Table',
	
	    propTypes: {
	        header: React.PropTypes.object,
	        data: React.PropTypes.array,
	        columns: React.PropTypes.array,
	        row: React.PropTypes.func,
	        children: React.PropTypes.object
	    },
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            header: {},
	            data: [],
	            columns: []
	        };
	    },
	
	    render: function render() {
	        var header = this.props.header;
	        var data = this.props.data;
	        var columns = this.props.columns;
	        var rowProps = this.props.row || noop;
	
	        var props = update(this.props, {
	            $merge: {
	                header: undefined,
	                data: undefined,
	                columns: undefined
	            }
	        });
	
	        return React.createElement(
	            'table',
	            props,
	            React.createElement(
	                'thead',
	                null,
	                React.createElement(
	                    'tr',
	                    null,
	                    columns.map(function (column, i) {
	                        var columnHeader = transform(header, function (result, v, k) {
	                            result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;
	                        });
	
	                        return React.createElement(
	                            'th',
	                            _extends({
	                                key: i + '-header',
	                                className: cx(column.classes)
	                            }, columnHeader),
	                            column.header
	                        );
	                    })
	                )
	            ),
	            React.createElement(
	                'tbody',
	                null,
	                data.map(function (row, i) {
	                    return React.createElement(
	                        'tr',
	                        _extends({ key: i + '-row' }, rowProps(row, i)),
	                        columns.map(function (column, j) {
	                            var property = column.property;
	                            var value = row[property];
	                            var cell = column.cell || [id];
	                            var content;
	
	                            cell = isFunction(cell) ? [cell] : cell;
	
	                            content = reduce([value].concat(cell), function (v, fn) {
	                                if (v && React.isValidElement(v.value)) {
	                                    return v;
	                                }
	
	                                if (!isPlainObject(value) && isPlainObject(v)) {
	                                    return merge(v, {
	                                        value: fn(v.value, data, i, property)
	                                    });
	                                }
	
	                                var val = fn(v, data, i, property);
	
	                                if (val && !isUndefined(val.value)) {
	                                    return val;
	                                }
	
	                                return {
	                                    value: val
	                                };
	                            });
	
	                            content = content || {};
	
	                            return React.createElement(
	                                'td',
	                                _extends({ key: j + '-cell' }, content.props),
	                                content.value
	                            );
	                        })
	                    );
	                })
	            ),
	            this.props.children
	        );
	    }
	});
	
	function id(a) {
	    return a;
	}
	function noop() {}
	// formatter shortcut

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	(function () {
		'use strict';
	
		function classNames () {
	
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
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	
	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isString = __webpack_require__(2).isString;
	var React = __webpack_require__(3);
	
	var formatters = __webpack_require__(6);
	var predicates = __webpack_require__(10);
	
	module.exports = React.createClass({
	    displayName: 'Search',
	
	    propTypes: {
	        columns: React.PropTypes.array,
	        data: React.PropTypes.array,
	        onChange: React.PropTypes.func
	    },
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            columns: [],
	            data: [],
	            onChange: function onChange() {}
	        };
	    },
	
	    getInitialState: function getInitialState() {
	        return {
	            column: 'all',
	            query: ''
	        };
	    },
	
	    getOptions: function getOptions() {
	        var columns = this.props.columns;
	        return [{
	            value: 'all',
	            name: 'All'
	        }].concat(columns.map(function (column) {
	            if (column.property && column.header) {
	                return {
	                    value: column.property,
	                    name: column.header
	                };
	            }
	        }).filter(function (a) {
	            return a;
	        }));
	    },
	
	    render: function render() {
	        return React.createElement(
	            'span',
	            { className: 'search' },
	            React.createElement(
	                'select',
	                { onChange: this.onColumnChange, value: this.state.column },
	                this.getOptions().map(function (option) {
	                    return React.createElement(
	                        'option',
	                        { key: option.value + '-option', value: option.value },
	                        option.name
	                    );
	                })
	            ),
	            React.createElement('input', { onChange: this.onQueryChange, value: this.state.query })
	        );
	    },
	
	    onColumnChange: function onColumnChange(event) {
	        var column = event.target.value;
	        var query = this.state.query;
	        this.setState({
	            column: column
	        });
	
	        this.props.onChange({
	            column: column,
	            query: query
	        });
	    },
	
	    onQueryChange: function onQueryChange(event) {
	        var column = this.state.column;
	        var query = event.target.value;
	        this.setState({
	            query: query
	        });
	
	        this.props.onChange({
	            column: column,
	            query: query
	        });
	    },
	
	    componentDidMount: function componentDidMount() {
	        this.props.onChange({
	            column: this.state.column,
	            query: this.state.query
	        });
	    }
	});
	
	module.exports.search = function (data, columns, column, query, options) {
	    if (!query) {
	        return data;
	    }
	
	    options = options || {
	        strategy: predicates.infix,
	        transform: formatters.lowercase
	    };
	
	    if (column !== 'all') {
	        columns = columns.filter(function (col) {
	            return col.property === column;
	        });
	    }
	
	    return data.filter(function (row) {
	        return columns.filter(isColumnVisible.bind(undefined, row)).length > 0;
	    });
	
	    function isColumnVisible(row, col) {
	        var property = col.property;
	        var value = row[property];
	        var formatter = col.search || formatters.identity;
	        var formattedValue = formatter(value);
	
	        if (!formattedValue) {
	            return false;
	        }
	
	        if (!isString(formattedValue)) {
	            formattedValue = formattedValue.toString();
	        }
	
	        var predicate = options.strategy(options.transform(query));
	
	        return predicate.evaluate(options.transform(formattedValue));
	    }
	};
	
	module.exports.matches = function (column, value, query, options) {
	    if (!query) {
	        return {};
	    }
	
	    options = options || {
	        strategy: predicates.infix,
	        transform: formatters.lowercase
	    };
	
	    var predicate = options.strategy(options.transform(query));
	
	    return predicate.matches(options.transform(value));
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    highlight: __webpack_require__(7),
	    identity: __webpack_require__(8),
	    lowercase: __webpack_require__(9)
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(3);
	
	module.exports = function (getHighlights) {
	    return function (value) {
	        var children = [];
	        var highlights = getHighlights(value);
	        var currentPosition = 0;
	        for (var x = 0; x < highlights.length; x++) {
	            var nonMatchingPrefix = value.slice(currentPosition, highlights[x].startIndex);
	            var matchingText = value.slice(highlights[x].startIndex, highlights[x].startIndex + highlights[x].length);
	            currentPosition = highlights[x].startIndex + highlights[x].length;
	
	            if (nonMatchingPrefix.length > 0) {
	                children.push(React.createElement(
	                    'span',
	                    { key: x + '-nonmatch' },
	                    nonMatchingPrefix
	                ));
	            }
	            children.push(React.createElement(
	                'span',
	                { className: 'highlight', key: x + '-match' },
	                matchingText
	            ));
	        }
	        children.push(React.createElement(
	            'span',
	            { key: x + '-remainder' },
	            value.slice(currentPosition)
	        ));
	
	        var element = React.createElement(
	            'span',
	            { className: 'search-result' },
	            children
	        );
	        return element;
	    };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
	    return value;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
	    return value.toLowerCase();
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    infix: __webpack_require__(11),
	    prefix: __webpack_require__(12)
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (infix) {
	    return {
	        evaluate: function evaluate(searchText) {
	            return searchText.indexOf(infix) !== -1;
	        },
	        matches: function matches(searchText) {
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
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (prefix) {
	    return {
	        evaluate: function evaluate(searchText) {
	            return searchText.indexOf(prefix) === 0;
	        },
	        matches: function matches(searchText) {
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _lodash = __webpack_require__(2);
	
	module.exports = function (columns, column, done) {
	    columns.map(function (col) {
	        col.classes = {};
	
	        return col;
	    });
	
	    column.sort = column.sort === 'asc' ? 'desc' : 'asc';
	    column.classes = {
	        'sort-asc': column.sort === 'asc',
	        'sort-desc': column.sort === 'desc'
	    };
	
	    done({
	        sortingColumn: column,
	        columns: columns });
	};
	
	module.exports.sort = function (data, column) {
	    if (!column) {
	        return data;
	    }
	
	    var property = column.property;
	
	    return (0, _lodash.sortByOrder)(data, [property], [column.sort]);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    boolean: __webpack_require__(15),
	    dropdown: __webpack_require__(16),
	    input: __webpack_require__(17)
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(3);
	
	module.exports = function () {
	    return React.createClass({
	        displayName: 'Boolean',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onClick: React.PropTypes.func,
	            onValue: React.PropTypes.func
	        },
	
	        render: function render() {
	            return React.createElement(
	                'span',
	                null,
	                React.createElement(
	                    'button',
	                    {
	                        disabled: this.props.value,
	                        onClick: this.props.onValue.bind(null, true)
	                    },
	                    '✓'
	                ),
	                React.createElement(
	                    'button',
	                    {
	                        disabled: !this.props.value,
	                        onClick: this.props.onValue.bind(null, false)
	                    },
	                    '✗'
	                )
	            );
	        }
	    });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(3);
	
	module.exports = function (options) {
	    return React.createClass({
	        displayName: 'Dropdown',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onValue: React.PropTypes.func
	        },
	
	        render: function render() {
	            var _this = this;
	
	            var edit = function edit(e) {
	                return _this.props.onValue(e.target.value);
	            };
	
	            return React.createElement(
	                'select',
	                { onBlur: edit, onChange: edit, value: this.props.value },
	                options.map(function (option, i) {
	                    return React.createElement(
	                        'option',
	                        {
	                            key: i,
	                            value: option.value
	                        },
	                        option.name
	                    );
	                })
	            );
	        }
	    });
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(3);
	
	module.exports = function () {
	    return React.createClass({
	        displayName: 'Input',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onValue: React.PropTypes.func
	        },
	
	        getInitialState: function getInitialState() {
	            return {
	                value: this.props.value
	            };
	        },
	
	        render: function render() {
	            return React.createElement('input', {
	                value: this.state.value,
	                autoFocus: true,
	                onFocus: this.onFocus,
	                onChange: this.onChange,
	                onKeyUp: this.keyUp,
	                onBlur: this.done });
	        },
	
	        onFocus: function onFocus(e) {
	            this.moveCaretToEnd(e.target);
	        },
	
	        moveCaretToEnd: function moveCaretToEnd(field) {
	            var length = field.value.length;
	            field.selectionStart = length;
	            field.selectionEnd = length;
	        },
	
	        onChange: function onChange(e) {
	            this.setState({
	                value: e.target.value
	            });
	        },
	
	        keyUp: function keyUp(e) {
	            if (e.keyCode === 13) {
	                this.done();
	            }
	        },
	
	        done: function done() {
	            this.props.onValue(this.getDOMNode().value);
	        }
	    });
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    identity: __webpack_require__(19),
	    edit: __webpack_require__(20)
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
	    return {
	        value: value
	    };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(3);
	
	module.exports = function (editProperty, _onValue, o) {
	    _onValue = _onValue || noop;
	
	    var context = this;
	    var editor = o.editor;
	
	    return function (value, data, rowIndex, property) {
	        var idx = rowIndex.toString() + '-' + property;
	        var editedCell = context.state[editProperty];
	
	        if (editedCell === idx) {
	            return {
	                value: React.createElement(editor, {
	                    value: value,
	                    onValue: function onValue(v) {
	                        var state = {};
	
	                        state[editProperty] = null;
	
	                        context.setState(state);
	
	                        _onValue(v, data, rowIndex, property);
	                    }
	                })
	            };
	        }
	
	        if (editor) {
	            return {
	                value: value,
	                props: {
	                    onClick: function onClick() {
	                        var state = {};
	
	                        state[editProperty] = idx;
	
	                        context.setState(state);
	                    }
	                }
	            };
	        }
	
	        return value;
	    };
	};
	
	function noop() {}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map