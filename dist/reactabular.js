(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("react/addons"));
	else
		root["Reactabular"] = factory(root["react/addons"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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
	    Table: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./table\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    Search: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./search\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    sortColumn: __webpack_require__(1),
	    editors: __webpack_require__(2),
	    formatters: __webpack_require__(7),
	    predicates: __webpack_require__(11),
	    cells: __webpack_require__(14) };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (columns, column, done) {
	    columns.map(function (col) {
	        col.classes = {};
	
	        return col;
	    });
	
	    column.sort = column.sort ? -column.sort : 1;
	    column.classes = {
	        'sort-asc': column.sort === 1,
	        'sort-desc': column.sort === -1
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
	
	    return data.concat().sort(function (a, b) {
	        var p1 = a[property] || '';
	        var p2 = b[property] || '';
	
	        if (p1.localeCompare) {
	            return p1.localeCompare(p2) * column.sort;
	        }
	
	        return (p1 - p2) * column.sort;
	    });
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    boolean: __webpack_require__(3),
	    dropdown: __webpack_require__(5),
	    input: __webpack_require__(6) };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4);
	
	module.exports = function () {
	    return React.createClass({
	        displayName: 'Boolean',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onClick: React.PropTypes.func,
	            onValue: React.PropTypes.func },
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4);
	
	module.exports = function (options) {
	    return React.createClass({
	        displayName: 'Dropdown',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onValue: React.PropTypes.func },
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4);
	
	module.exports = function () {
	    return React.createClass({
	        displayName: 'Input',
	
	        propTypes: {
	            value: React.PropTypes.string,
	            onValue: React.PropTypes.func },
	
	        getInitialState: function getInitialState() {
	            return {
	                value: this.props.value };
	        },
	
	        render: function render() {
	            return React.createElement('input', {
	                value: this.state.value,
	                onChange: this.onChange,
	                onKeyUp: this.keyUp,
	                onBlur: this.done });
	        },
	
	        onChange: function onChange(e) {
	            this.setState({
	                value: e.target.value });
	        },
	
	        keyUp: function keyUp(e) {
	            if (e.keyCode === 13) {
	                this.done();
	            }
	        },
	
	        done: function done() {
	            this.props.onValue(this.getDOMNode().value);
	        } });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    highlight: __webpack_require__(8),
	    identity: __webpack_require__(9),
	    lowercase: __webpack_require__(10)
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value) {
	    return value;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value) {
	    return value.toLowerCase();
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    infix: __webpack_require__(12),
	    prefix: __webpack_require__(13)
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    identity: __webpack_require__(15),
	    edit: __webpack_require__(16) };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (value) {
	    return {
	        value: value
	    };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4);
	
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
	                }) };
	        }
	
	        if (editor) {
	            return {
	                value: value,
	                props: {
	                    onClick: function onClick() {
	                        var state = {};
	
	                        state[editProperty] = idx;
	
	                        context.setState(state);
	                    } }
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