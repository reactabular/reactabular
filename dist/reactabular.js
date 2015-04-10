(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("react/addons"));
	else
		root["Reactabular"] = factory(root["react/addons"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
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
	var merge = __webpack_require__(18);
	var transform = __webpack_require__(19);
	var reduce = __webpack_require__(20);
	var isFunction = __webpack_require__(21);
	var isPlainObject = __webpack_require__(22);
	var isUndefined = __webpack_require__(23);
	
	var React = __webpack_require__(8);
	var cx = __webpack_require__(17);
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isString = __webpack_require__(24);
	var React = __webpack_require__(8);
	
	var formatters = __webpack_require__(5);
	var predicates = __webpack_require__(6);
	
	
	module.exports = React.createClass({
	    displayName: 'Search',
	
	    propTypes: {
	        onChange: React.PropTypes.func,
	        columns: React.PropTypes.array,
	    },
	
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
	
	        return (
	            React.createElement("span", {className: "search"}, 
	                React.createElement("select", {ref: "column", onChange: this.change}, options.map(function(option) 
	                    {return React.createElement("option", {key: option.value + '-option', value: option.value}, option.name);}
	                )
	                ), 
	                React.createElement("input", {ref: "query", onChange: this.change})
	            )
	        );
	    },
	
	    change:function() {
	        (this.props.onChange || noop)({
	            search: {
	                query: this.refs.query.getDOMNode().value,
	                column: this.refs.column.getDOMNode().value,
	            }
	        });
	    },
	});
	
	module.exports.search = function(search, columns, data) {
	    var query = search.query;
	    var column = search.column;
	
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
	
	        // TODO: allow strategy to be passed, now just defaulting to prefix
	        var predicate = predicates.prefix(query.toLowerCase());
	
	        return predicate.matches(formattedValue.toLowerCase());
	    }
	};
	
	module.exports.highlight = function(getQuery) {
	    return function(value) {
	        var query = getQuery();
	
	        if(query) {
	            var match = value.slice(0, query.length);
	
	            if(query.toLowerCase() !== match.toLowerCase()) {
	                return value;
	            }
	
	            var rest = value.slice(query.length);
	
	            return (
	                React.createElement("span", {className: "search-result"}, 
	                    React.createElement("span", {className: "highlight"}, match), 
	                    React.createElement("span", {className: "rest"}, rest)
	                )
	            );
	        }
	
	        return value;
	    };
	};
	
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
	    boolean: __webpack_require__(9),
	    dropdown: __webpack_require__(10),
	    input: __webpack_require__(11),
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = {
	    identity: __webpack_require__(12),
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = {
	    infix: __webpack_require__(13),
	    prefix: __webpack_require__(14)
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    identity: __webpack_require__(15),
	    edit: __webpack_require__(16),
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(8);
	
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(8);
	
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(8);
	
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function(value)  {
	    return value;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function (infix) {
	    return {
	        matches: function(searchText) {
	            return searchText.indexOf(infix) !== -1;
	        }
	    };
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function (prefix) {
	    return {
	        matches: function(searchText) {
	            return searchText.indexOf(prefix) === 0;
	        }
	    };
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	module.exports = function(value)  {
	    return {
	        value: value
	    };
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(8);
	
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	function classNames() {
		var classes = '';
		var arg;
	
		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}
	
			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}
	
	// safely export classNames in case the script is included directly on a page
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(25),
	    createAssigner = __webpack_require__(26);
	
	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it is invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments; (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize merging properties.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);
	
	module.exports = merge;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(27),
	    baseCallback = __webpack_require__(28),
	    baseCreate = __webpack_require__(29),
	    baseForOwn = __webpack_require__(30),
	    isArray = __webpack_require__(31),
	    isFunction = __webpack_require__(21),
	    isObject = __webpack_require__(32),
	    isTypedArray = __webpack_require__(33);
	
	/**
	 * An alternative to `_.reduce`; this method transforms `object` to a new
	 * `accumulator` object which is the result of running each of its own enumerable
	 * properties through `iteratee`, with each invocation potentially mutating
	 * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	 * with four arguments; (accumulator, value, key, object). Iterator functions
	 * may exit iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Array|Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The custom accumulator value.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.transform([2, 3, 4], function(result, n) {
	 *   result.push(n *= n);
	 *   return n % 2 == 0;
	 * });
	 * // => [4, 9]
	 *
	 * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
	 *   result[key] = n * 3;
	 * });
	 * // => { 'a': 3, 'b': 6 }
	 */
	function transform(object, iteratee, accumulator, thisArg) {
	  var isArr = isArray(object) || isTypedArray(object);
	  iteratee = baseCallback(iteratee, thisArg, 4);
	
	  if (accumulator == null) {
	    if (isArr || isObject(object)) {
	      var Ctor = object.constructor;
	      if (isArr) {
	        accumulator = isArray(object) ? new Ctor : [];
	      } else {
	        accumulator = baseCreate(isFunction(Ctor) && Ctor.prototype);
	      }
	    } else {
	      accumulator = {};
	    }
	  }
	  (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
	    return iteratee(accumulator, value, index, object);
	  });
	  return accumulator;
	}
	
	module.exports = transform;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(34),
	    baseCallback = __webpack_require__(28),
	    baseEach = __webpack_require__(35),
	    baseReduce = __webpack_require__(36),
	    isArray = __webpack_require__(31);
	
	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` through `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not provided the first element of `collection` is used as the initial
	 * value. The `iteratee` is bound to `thisArg`and invoked with four arguments;
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as interatees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `merge`, and `sortAllBy`
	 *
	 * @static
	 * @memberOf _
	 * @alias foldl, inject
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * });
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
	 *   result[key] = n * 3;
	 *   return result;
	 * }, {});
	 * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator, thisArg) {
	  var func = isArray(collection) ? arrayReduce : baseReduce;
	  return func(collection, baseCallback(iteratee, thisArg, 4), accumulator, arguments.length < 3, baseEach);
	}
	
	module.exports = reduce;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var baseIsFunction = __webpack_require__(37),
	    isNative = __webpack_require__(38);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/** Native method references. */
	var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return objToString.call(value) == funcTag;
	};
	
	module.exports = isFunction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(38),
	    shimIsPlainObject = __webpack_require__(39);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/** Native method references. */
	var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	  if (!(value && objToString.call(value) == objectTag)) {
	    return false;
	  }
	  var valueOf = value.valueOf,
	      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
	
	  return objProto
	    ? (value == objProto || getPrototypeOf(value) == objProto)
	    : shimIsPlainObject(value);
	};
	
	module.exports = isPlainObject;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return typeof value == 'undefined';
	}
	
	module.exports = isUndefined;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(40);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
	}
	
	module.exports = isString;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(27),
	    baseForOwn = __webpack_require__(30),
	    baseMergeDeep = __webpack_require__(41),
	    isArray = __webpack_require__(31),
	    isLength = __webpack_require__(42),
	    isObject = __webpack_require__(32),
	    isObjectLike = __webpack_require__(40),
	    isTypedArray = __webpack_require__(33);
	
	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merging properties.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns the destination object.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));
	  (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    var value = object[key],
	        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	        isCommon = typeof result == 'undefined';
	
	    if (isCommon) {
	      result = srcValue;
	    }
	    if ((isSrcArr || typeof result != 'undefined') &&
	        (isCommon || (result === result ? (result !== value) : (value === value)))) {
	      object[key] = result;
	    }
	  });
	  return object;
	}
	
	module.exports = baseMerge;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(43),
	    isIterateeCall = __webpack_require__(44);
	
	/**
	 * Creates a function that assigns properties of source object(s) to a given
	 * destination object.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return function() {
	    var args = arguments,
	        length = args.length,
	        object = args[0];
	
	    if (length < 2 || object == null) {
	      return object;
	    }
	    var customizer = args[length - 2],
	        thisArg = args[length - 1],
	        guard = args[3];
	
	    if (length > 3 && typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(args[1], args[2], guard)) {
	      customizer = length == 3 ? null : customizer;
	      length = 2;
	    }
	    var index = 0;
	    while (++index < length) {
	      var source = args[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createAssigner;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(45),
	    baseMatchesProperty = __webpack_require__(46),
	    baseProperty = __webpack_require__(47),
	    bindCallback = __webpack_require__(43),
	    identity = __webpack_require__(48),
	    isBindable = __webpack_require__(49);
	
	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return (typeof thisArg != 'undefined' && isBindable(func))
	      ? bindCallback(func, thisArg, argCount)
	      : func;
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return typeof thisArg == 'undefined'
	    ? baseProperty(func + '')
	    : baseMatchesProperty(func + '', thisArg);
	}
	
	module.exports = baseCallback;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(32);
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function Object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      Object.prototype = prototype;
	      var result = new Object;
	      Object.prototype = null;
	    }
	    return result || global.Object();
	  };
	}());
	
	module.exports = baseCreate;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(50),
	    keys = __webpack_require__(51);
	
	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(42),
	    isNative = __webpack_require__(38),
	    isObjectLike = __webpack_require__(40);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
	};
	
	module.exports = isArray;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is the language type of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || (value && type == 'object') || false;
	}
	
	module.exports = isObject;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(42),
	    isObjectLike = __webpack_require__(40);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
	}
	
	module.exports = isTypedArray;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initFromArray] Specify using the first element of `array`
	 *  as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initFromArray) {
	  var index = -1,
	      length = array.length;
	
	  if (initFromArray && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(30),
	    isLength = __webpack_require__(42),
	    toObject = __webpack_require__(52);
	
	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	function baseEach(collection, iteratee) {
	  var length = collection ? collection.length : 0;
	  if (!isLength(length)) {
	    return baseForOwn(collection, iteratee);
	  }
	  var index = -1,
	      iterable = toObject(collection);
	
	  while (++index < length) {
	    if (iteratee(iterable[index], index, iterable) === false) {
	      break;
	    }
	  }
	  return collection;
	}
	
	module.exports = baseEach;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight` without support
	 * for callback shorthands or `this` binding, which iterates over `collection`
	 * using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initFromCollection Specify using the first or last element
	 *  of `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initFromCollection
	      ? (initFromCollection = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}
	
	module.exports = baseReduce;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.isFunction` without support for environments
	 * with incorrect `typeof` results.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 */
	function baseIsFunction(value) {
	  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
	  return typeof value == 'function' || false;
	}
	
	module.exports = baseIsFunction;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var escapeRegExp = __webpack_require__(53),
	    isObjectLike = __webpack_require__(40);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reNative = RegExp('^' +
	  escapeRegExp(objToString)
	  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reNative.test(fnToString.call(value));
	  }
	  return (isObjectLike(value) && reHostCtor.test(value)) || false;
	}
	
	module.exports = isNative;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(54),
	    isObjectLike = __webpack_require__(40);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * A fallback implementation of `_.isPlainObject` which checks if `value`
	 * is an object created by the `Object` constructor or has a `[[Prototype]]`
	 * of `null`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 */
	function shimIsPlainObject(value) {
	  var Ctor;
	
	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
	      (!hasOwnProperty.call(value, 'constructor') &&
	        (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	}
	
	module.exports = shimIsPlainObject;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return (value && typeof value == 'object') || false;
	}
	
	module.exports = isObjectLike;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(55),
	    isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(31),
	    isLength = __webpack_require__(42),
	    isPlainObject = __webpack_require__(22),
	    isTypedArray = __webpack_require__(33),
	    toPlainObject = __webpack_require__(57);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merging properties.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];
	
	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = typeof result == 'undefined';
	
	  if (isCommon) {
	    result = srcValue;
	    if (isLength(srcValue.length) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (value ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Used as the maximum length of an array-like value.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * for more details.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on ES `ToLength`. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	 * for more details.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(48);
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (typeof thisArg == 'undefined') {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	module.exports = bindCallback;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isIndex = __webpack_require__(58),
	    isLength = __webpack_require__(42),
	    isObject = __webpack_require__(32);
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number') {
	    var length = object.length,
	        prereq = isLength(length) && isIndex(index, length);
	  } else {
	    prereq = type == 'string' && index in object;
	  }
	  if (prereq) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(59),
	    isStrictComparable = __webpack_require__(60),
	    keys = __webpack_require__(51);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var props = keys(source),
	      length = props.length;
	
	  if (length == 1) {
	    var key = props[0],
	        value = source[key];
	
	    if (isStrictComparable(value)) {
	      return function(object) {
	        return object != null && object[key] === value && hasOwnProperty.call(object, key);
	      };
	    }
	  }
	  var values = Array(length),
	      strictCompareFlags = Array(length);
	
	  while (length--) {
	    value = source[props[length]];
	    values[length] = value;
	    strictCompareFlags[length] = isStrictComparable(value);
	  }
	  return function(object) {
	    return baseIsMatch(object, props, values, strictCompareFlags);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(61),
	    isStrictComparable = __webpack_require__(60);
	
	/**
	 * The base implementation of `_.matchesProperty` which does not coerce `key`
	 * to a string.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} value The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(key, value) {
	  if (isStrictComparable(value)) {
	    return function(object) {
	      return object != null && object[key] === value;
	    };
	  }
	  return function(object) {
	    return object != null && baseIsEqual(value, object[key], null, true);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.property` which does not coerce `key` to a string.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(62),
	    isNative = __webpack_require__(38),
	    support = __webpack_require__(63);
	
	/** Used to detect named functions. */
	var reFuncName = /^\s*function[ \n\r\t]+\w/;
	
	/** Used to detect functions containing a `this` reference. */
	var reThis = /\bthis\b/;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/**
	 * Checks if `func` is eligible for `this` binding.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
	 */
	function isBindable(func) {
	  var result = !(support.funcNames ? func.name : support.funcDecomp);
	
	  if (!result) {
	    var source = fnToString.call(func);
	    if (!support.funcNames) {
	      result = !reFuncName.test(source);
	    }
	    if (!result) {
	      // Check if `func` references the `this` keyword and store the result.
	      result = reThis.test(source) || isNative(func);
	      baseSetData(func, result);
	    }
	  }
	  return result;
	}
	
	module.exports = isBindable;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(52);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iterator functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	function baseFor(object, iteratee, keysFunc) {
	  var index = -1,
	      iterable = toObject(object),
	      props = keysFunc(object),
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    if (iteratee(iterable[key], key, iterable) === false) {
	      break;
	    }
	  }
	  return object;
	}
	
	module.exports = baseFor;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(42),
	    isNative = __webpack_require__(38),
	    isObject = __webpack_require__(32),
	    shimKeys = __webpack_require__(64);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  if (object) {
	    var Ctor = object.constructor,
	        length = object.length;
	  }
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && (length && isLength(length)))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(32);
	
	/**
	 * Converts `value` to an object if it is not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toObject;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(65);
	
	/**
	 * Used to match `RegExp` special characters.
	 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	 * for more details.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);
	
	/**
	 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https://lodash\.com/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return (string && reHasRegExpChars.test(string))
	    ? string.replace(reRegExpChars, '\\$&')
	    : string;
	}
	
	module.exports = escapeRegExp;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(50),
	    keysIn = __webpack_require__(66);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	module.exports = baseForIn;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = arrayCopy;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(42),
	    isObjectLike = __webpack_require__(40);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  var length = isObjectLike(value) ? value.length : undefined;
	  return (isLength(length) && objToString.call(value) == argsTag) || false;
	}
	
	module.exports = isArguments;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(67),
	    keysIn = __webpack_require__(66);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Used as the maximum length of an array-like value.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * for more details.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = +value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(61);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} props The source property names to match.
	 * @param {Array} values The source values to match.
	 * @param {Array} strictCompareFlags Strict comparison flags for source values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
	  var length = props.length;
	  if (object == null) {
	    return !length;
	  }
	  var index = -1,
	      noCustomizer = !customizer;
	
	  while (++index < length) {
	    if ((noCustomizer && strictCompareFlags[index])
	          ? values[index] !== object[props[index]]
	          : !hasOwnProperty.call(object, props[index])
	        ) {
	      return false;
	    }
	  }
	  index = -1;
	  while (++index < length) {
	    var key = props[index];
	    if (noCustomizer && strictCompareFlags[index]) {
	      var result = hasOwnProperty.call(object, key);
	    } else {
	      var objValue = object[key],
	          srcValue = values[index];
	
	      result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (typeof result == 'undefined') {
	        result = baseIsEqual(srcValue, objValue, customizer, true);
	      }
	    }
	    if (!result) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(32);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(68);
	
	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
	  // Exit early for identical values.
	  if (value === other) {
	    // Treat `+0` vs. `-0` as not equal.
	    return value !== 0 || (1 / value == 1 / other);
	  }
	  var valType = typeof value,
	      othType = typeof other;
	
	  // Exit early for unlike primitive values.
	  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
	      value == null || other == null) {
	    // Return `false` unless both values are `NaN`.
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(48),
	    metaMap = __webpack_require__(69);
	
	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};
	
	module.exports = baseSetData;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isNative = __webpack_require__(38);
	
	/** Used to detect functions containing a `this` reference. */
	var reThis = /\bthis\b/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to detect DOM support. */
	var document = (document = global.window) && document.document;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * An object environment feature flags.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};
	
	(function(x) {
	
	  /**
	   * Detect if functions can be decompiled by `Function#toString`
	   * (all but Firefox OS certified apps, older Opera mobile browsers, and
	   * the PlayStation 3; forced `false` for Windows 8 apps).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });
	
	  /**
	   * Detect if `Function#name` is supported (all but IE).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.funcNames = typeof Function.name == 'string';
	
	  /**
	   * Detect if the DOM is supported.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.dom = document.createDocumentFragment().nodeType === 11;
	  } catch(e) {
	    support.dom = false;
	  }
	
	  /**
	   * Detect if `arguments` object indexes are non-enumerable.
	   *
	   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	   * checks for indexes that exceed their function's formal parameters with
	   * associated values of `0`.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	  } catch(e) {
	    support.nonEnumArgs = true;
	  }
	}(0, 0));
	
	module.exports = support;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(31),
	    isIndex = __webpack_require__(58),
	    isLength = __webpack_require__(42),
	    keysIn = __webpack_require__(66),
	    support = __webpack_require__(63);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = length && isLength(length) &&
	    (isArray(object) || (support.nonEnumArgs && isArguments(object)));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = shimKeys;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}
	
	module.exports = baseToString;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(31),
	    isIndex = __webpack_require__(58),
	    isLength = __webpack_require__(42),
	    isObject = __webpack_require__(32),
	    support = __webpack_require__(63);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies the properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Array} props The property names to copy.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, object, props) {
	  if (!props) {
	    props = object;
	    object = {};
	  }
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}
	
	module.exports = baseCopy;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(70),
	    equalByTag = __webpack_require__(71),
	    equalObjects = __webpack_require__(72),
	    isArray = __webpack_require__(31),
	    isTypedArray = __webpack_require__(33);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	  if (valWrapped || othWrapped) {
	    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);
	
	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);
	
	  stackA.pop();
	  stackB.pop();
	
	  return result;
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isNative = __webpack_require__(38);
	
	/** Native method references. */
	var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;
	
	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;
	
	module.exports = metaMap;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length,
	      result = true;
	
	  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
	    return false;
	  }
	  // Deep compare the contents, ignoring non-numeric properties.
	  while (result && ++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    result = undefined;
	    if (customizer) {
	      result = isWhere
	        ? customizer(othValue, arrValue, index)
	        : customizer(arrValue, othValue, index);
	    }
	    if (typeof result == 'undefined') {
	      // Recursively compare arrays (susceptible to call stack limits).
	      if (isWhere) {
	        var othIndex = othLength;
	        while (othIndex--) {
	          othValue = other[othIndex];
	          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
	          if (result) {
	            break;
	          }
	        }
	      } else {
	        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
	      }
	    }
	  }
	  return !!result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} value The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        // But, treat `-0` vs. `+0` as not equal.
	        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(51);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isWhere) {
	    return false;
	  }
	  var hasCtor,
	      index = -1;
	
	  while (++index < objLength) {
	    var key = objProps[index],
	        result = hasOwnProperty.call(other, key);
	
	    if (result) {
	      var objValue = object[key],
	          othValue = other[key];
	
	      result = undefined;
	      if (customizer) {
	        result = isWhere
	          ? customizer(othValue, objValue, key)
	          : customizer(objValue, othValue, key);
	      }
	      if (typeof result == 'undefined') {
	        // Recursively compare objects (susceptible to call stack limits).
	        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
	      }
	    }
	    if (!result) {
	      return false;
	    }
	    hasCtor || (hasCtor = key == 'constructor');
	  }
	  if (!hasCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalObjects;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map