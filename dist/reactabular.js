(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("react"));
	else
		root["Reactabular"] = factory(root["React"]);
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.resizableColumn = exports.resolve = exports.highlight = exports.sort = exports.select = exports.search = exports.Search = exports.SearchColumns = exports.Sticky = exports.Table = undefined;
	
	var _reactabularTable = __webpack_require__(1);
	
	var Table = _interopRequireWildcard(_reactabularTable);
	
	var _reactabularSticky = __webpack_require__(95);
	
	var Sticky = _interopRequireWildcard(_reactabularSticky);
	
	var _reactabularSearch = __webpack_require__(98);
	
	var search = _interopRequireWildcard(_reactabularSearch);
	
	var _reactabularSelect = __webpack_require__(104);
	
	var select = _interopRequireWildcard(_reactabularSelect);
	
	var _reactabularSort = __webpack_require__(105);
	
	var sort = _interopRequireWildcard(_reactabularSort);
	
	var _reactabularHighlight = __webpack_require__(113);
	
	var highlight = _interopRequireWildcard(_reactabularHighlight);
	
	var _reactabularResolve = __webpack_require__(117);
	
	var resolve = _interopRequireWildcard(_reactabularResolve);
	
	var _reactabularResizable = __webpack_require__(182);
	
	var _reactabularResizable2 = _interopRequireDefault(_reactabularResizable);
	
	var _reactabularSearchColumns = __webpack_require__(184);
	
	var _reactabularSearchColumns2 = _interopRequireDefault(_reactabularSearchColumns);
	
	var _reactabularSearchField = __webpack_require__(185);
	
	var _reactabularSearchField2 = _interopRequireDefault(_reactabularSearchField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.Table = Table;
	exports.Sticky = Sticky;
	exports.SearchColumns = _reactabularSearchColumns2.default;
	exports.Search = _reactabularSearchField2.default;
	exports.search = search;
	exports.select = select;
	exports.sort = sort;
	exports.highlight = highlight;
	exports.resolve = resolve;
	exports.resizableColumn = _reactabularResizable2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _provider = __webpack_require__(2);
	
	Object.defineProperty(exports, 'Provider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_provider).default;
	  }
	});
	
	var _header = __webpack_require__(13);
	
	Object.defineProperty(exports, 'Header', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_header).default;
	  }
	});
	
	var _body = __webpack_require__(15);
	
	Object.defineProperty(exports, 'Body', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_body).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactabularUtils = __webpack_require__(5);
	
	var _types = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var componentDefaults = _types.tableDefaults.components;
	
	// TODO: shouldComponentUpdate
	
	var Provider = function (_React$Component) {
	  _inherits(Provider, _React$Component);
	
	  function Provider() {
	    _classCallCheck(this, Provider);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).apply(this, arguments));
	  }
	
	  _createClass(Provider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _props = this.props;
	      var columns = _props.columns;
	      var components = _props.components;
	
	      // Merge column props with header/body specific ones so that can be avoided later
	
	      var headerRows = (0, _reactabularUtils.resolveHeaderRows)(columns).map(function (row) {
	        return row.map(function (column) {
	          return column.header ? {
	            props: (0, _reactabularUtils.mergePropPair)(column.props, column.header.props),
	            header: column.header,
	            children: column.children || [], // TODO: test for this case
	            column: column
	          } : {};
	        });
	      });
	
	      var bodyColumns = (0, _reactabularUtils.resolveBodyColumns)(columns).map(function (column) {
	        return {
	          props: (0, _reactabularUtils.mergePropPair)(column.props, column.cell && column.cell.props),
	          cell: column.cell || {},
	          children: column.children || [], // TODO: test for this case
	          property: column.property,
	          column: column
	        };
	      });
	
	      return {
	        headerRows: headerRows,
	        bodyColumns: bodyColumns,
	        components: {
	          table: components.table || componentDefaults.table,
	          header: _extends({}, componentDefaults.header, components.header),
	          body: _extends({}, componentDefaults.body, components.body)
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var columns = _props2.columns;
	      var components = _props2.components;
	      var children = _props2.children;
	
	      var props = _objectWithoutProperties(_props2, ['columns', 'components', 'children']);
	
	      return _react2.default.createElement(components.table || _types.tableDefaults.components.table, props, children);
	    }
	  }]);
	
	  return Provider;
	}(_react2.default.Component);
	
	exports.default = Provider;
	
	process.env.NODE_ENV !== "production" ? Provider.propTypes = _extends({}, _types.tableTypes, {
	  children: _react2.default.PropTypes.any
	}) : void 0;
	Provider.defaultProps = _extends({}, _types.tableDefaults);
	Provider.childContextTypes = _types.tableContextTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _resolve_header_rows = __webpack_require__(6);
	
	Object.defineProperty(exports, 'resolveHeaderRows', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_resolve_header_rows).default;
	  }
	});
	
	var _count_row_span = __webpack_require__(7);
	
	Object.defineProperty(exports, 'countRowSpan', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_count_row_span).default;
	  }
	});
	
	var _resolve_body_columns = __webpack_require__(8);
	
	Object.defineProperty(exports, 'resolveBodyColumns', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_resolve_body_columns).default;
	  }
	});
	
	var _evaluate_transforms = __webpack_require__(9);
	
	Object.defineProperty(exports, 'evaluateTransforms', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_evaluate_transforms).default;
	  }
	});
	
	var _merge_prop_pair = __webpack_require__(10);
	
	Object.defineProperty(exports, 'mergePropPair', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_merge_prop_pair).default;
	  }
	});
	
	var _merge_class_names = __webpack_require__(11);
	
	Object.defineProperty(exports, 'mergeClassNames', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_merge_class_names).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _count_row_span = __webpack_require__(7);
	
	var _count_row_span2 = _interopRequireDefault(_count_row_span);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function resolveHeaderRows() {
	  var columns = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  var resolvedChildren = [];
	
	  var ret = columns.map(function (column) {
	    var children = column.children;
	
	    var col = _objectWithoutProperties(column, ['children']);
	
	    if (children && children.length) {
	      resolvedChildren = resolvedChildren.concat(resolveHeaderRows(children)[0]);
	
	      return _extends({}, col, {
	        props: _extends({}, col.props, {
	          colSpan: children.length
	        })
	      });
	    }
	
	    return _extends({}, col, {
	      props: _extends({}, col.props, {
	        rowSpan: (0, _count_row_span2.default)(columns)
	      })
	    });
	  });
	
	  if (resolvedChildren.length) {
	    return [ret].concat([resolvedChildren]);
	  }
	
	  return [ret];
	}
	
	exports.default = resolveHeaderRows;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function countRowSpan(columns) {
	  var maximumCount = 0;
	
	  columns.forEach(function (column) {
	    if (column.children && column.children.length) {
	      maximumCount = Math.max(maximumCount, countRowSpan(column.children));
	    }
	  });
	
	  return maximumCount + 1;
	}
	
	exports.default = countRowSpan;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function resolveBodyColumns(columns) {
	  var ret = [];
	
	  columns.forEach(function (column) {
	    // If a column has children, skip cell specific configuration
	    if (column.children && column.children.length) {
	      ret = ret.concat(resolveBodyColumns(column.children));
	    } else {
	      ret.push(column);
	    }
	  });
	
	  return ret;
	}
	
	exports.default = resolveBodyColumns;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _merge_prop_pair = __webpack_require__(10);
	
	var _merge_prop_pair2 = _interopRequireDefault(_merge_prop_pair);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function evaluateTransforms() {
	  var transforms = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var value = arguments[1];
	  var extraParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  return transforms.map(function (transform) {
	    return transform(value, extraParameters);
	  }).filter(function (p) {
	    return p;
	  }).reduce(_merge_prop_pair2.default, {}) || {};
	}
	
	exports.default = evaluateTransforms;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _merge_class_names = __webpack_require__(11);
	
	var _merge_class_names2 = _interopRequireDefault(_merge_class_names);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mergePropPair() {
	  var a = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var b = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var ret = _extends({}, a, b, {
	    style: _extends({}, a.style, b.style),
	    className: (0, _merge_class_names2.default)(a.className, b.className)
	  });
	
	  if (a.children || b.children) {
	    ret.children = _extends({}, b.children, a.children); // Reverse order
	  }
	
	  return ret;
	}
	
	exports.default = mergePropPair;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function mergeClassNames(a, b) {
	  if (a && b) {
	    return a + ' ' + b;
	  }
	
	  // Either a or b at this point
	  return (a || '') + (b || '');
	}
	
	exports.default = mergeClassNames;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tableDefaults = exports.tableHeaderContextTypes = exports.tableBodyContextTypes = exports.tableBodyTypes = exports.tableContextTypes = exports.tableTypes = undefined;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayOfObjectColumns = _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	  header: _react2.default.PropTypes.shape({
	    label: _react2.default.PropTypes.string,
	    transforms: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
	    format: _react2.default.PropTypes.func,
	    props: _react2.default.PropTypes.object
	  }),
	  cell: _react2.default.PropTypes.shape({
	    property: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
	    transforms: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
	    format: _react2.default.PropTypes.func,
	    props: _react2.default.PropTypes.object
	  })
	}));
	var arrayOfArrayColumns = _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.array);
	var rowsType = _react2.default.PropTypes.oneOfType([arrayOfObjectColumns, arrayOfArrayColumns]);
	var tableTypes = {
	  columns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object
	};
	var tableContextTypes = {
	  headerRows: _react2.default.PropTypes.array.isRequired,
	  bodyColumns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object
	};
	var tableBodyTypes = {
	  onRow: _react2.default.PropTypes.func,
	  rows: rowsType.isRequired,
	  rowKey: _react2.default.PropTypes.string
	};
	var tableBodyContextTypes = {
	  bodyColumns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object
	};
	var tableHeaderContextTypes = {
	  headerRows: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object
	};
	var tableDefaults = {
	  components: {
	    table: 'table',
	    header: {
	      wrapper: 'thead',
	      row: 'tr',
	      cell: 'th'
	    },
	    body: {
	      wrapper: 'tbody',
	      row: 'tr',
	      cell: 'td'
	    }
	  }
	};
	
	exports.tableTypes = tableTypes;
	exports.tableContextTypes = tableContextTypes;
	exports.tableBodyTypes = tableBodyTypes;
	exports.tableBodyContextTypes = tableBodyContextTypes;
	exports.tableHeaderContextTypes = tableHeaderContextTypes;
	exports.tableDefaults = tableDefaults;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _types = __webpack_require__(12);
	
	var _headerRow = __webpack_require__(14);
	
	var _headerRow2 = _interopRequireDefault(_headerRow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = function (_React$Component) {
	  _inherits(Header, _React$Component);
	
	  // eslint-disable-line max-len, react/prefer-stateless-function
	  function Header(props) {
	    _classCallCheck(this, Header);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));
	
	    _this.ref = null;
	    return _this;
	  }
	
	  _createClass(Header, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var children = _props.children;
	
	      var props = _objectWithoutProperties(_props, ['children']);
	
	      var _context = this.context;
	      var headerRows = _context.headerRows;
	      var components = _context.components;
	
	
	      props.ref = function (header) {
	        _this2.ref = header;
	      };
	
	      return _react2.default.createElement(components.header.wrapper, props, [headerRows.map(function (row, i) {
	        return _react2.default.createElement(_headerRow2.default, {
	          key: i + '-header-row',
	          components: components.header,
	          row: row
	        });
	      })].concat(children));
	    }
	  }, {
	    key: 'getRef',
	    value: function getRef() {
	      return this.ref;
	    }
	  }]);
	
	  return Header;
	}(_react2.default.Component);
	
	process.env.NODE_ENV !== "production" ? Header.propTypes = {
	  children: _react2.default.PropTypes.any
	} : void 0;
	Header.contextTypes = _types.tableHeaderContextTypes;
	
	exports.default = Header;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactabularUtils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HeaderRow = function HeaderRow(_ref) {
	  var row = _ref.row;
	  var components = _ref.components;
	  return _react2.default.createElement(components.row, {}, row.map(function (_ref2, j) {
	    var column = _ref2.column;
	    var _ref2$header = _ref2.header;
	    var header = _ref2$header === undefined ? {} : _ref2$header;
	    var _ref2$props = _ref2.props;
	    var props = _ref2$props === undefined ? {} : _ref2$props;
	    var label = header.label;
	    var _header$transforms = header.transforms;
	    var transforms = _header$transforms === undefined ? [] : _header$transforms;
	    var _header$format = header.format;
	    var format = _header$format === undefined ? function (a) {
	      return a;
	    } : _header$format;
	
	    var extraParameters = {
	      columnIndex: j,
	      column: column,
	      property: column && column.property // TODO: test that this is passed properly
	    };
	    var transformedProps = (0, _reactabularUtils.evaluateTransforms)(transforms, label, extraParameters);
	
	    if (!transformedProps) {
	      console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
	    }
	
	    return _react2.default.createElement(components.cell, _extends({
	      key: j + '-header'
	    }, (0, _reactabularUtils.mergePropPair)(props, transformedProps)), transformedProps.children || format(label, extraParameters));
	  }));
	};
	process.env.NODE_ENV !== "production" ? HeaderRow.propTypes = {
	  row: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	  components: _react2.default.PropTypes.object
	} : void 0;
	
	exports.default = HeaderRow;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _isEqual = __webpack_require__(16);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _types = __webpack_require__(12);
	
	var _bodyRow = __webpack_require__(94);
	
	var _bodyRow2 = _interopRequireDefault(_bodyRow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Body = function (_React$Component) {
	  _inherits(Body, _React$Component);
	
	  function Body(props) {
	    _classCallCheck(this, Body);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Body).call(this, props));
	
	    _this.ref = null;
	    return _this;
	  }
	
	  _createClass(Body, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Skip checking props against `onRow` since that can be bound at render().
	      // That's not particularly good practice but you never know how the users
	      // prefer to define the handler.
	      return !((0, _isEqual2.default)(omitOnRow(this.props), omitOnRow(nextProps)) && (0, _isEqual2.default)(this.context, nextContext));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var onRow = _props.onRow;
	      var rows = _props.rows;
	      var rowKey = _props.rowKey;
	
	      var props = _objectWithoutProperties(_props, ['onRow', 'rows', 'rowKey']);
	
	      var _context = this.context;
	      var bodyColumns = _context.bodyColumns;
	      var components = _context.components;
	
	
	      props.ref = function (body) {
	        _this2.ref = body;
	      };
	
	      return _react2.default.createElement(components.body.wrapper, props, rows.map(function (r, i) {
	        if (process.env.NODE_ENV !== 'production') {
	          // Arrays cannot have rowKeys by definition so we have to go by index there.
	          if (!Array.isArray(r) && !{}.hasOwnProperty.call(r, rowKey)) {
	            console.warn( // eslint-disable-line no-console
	            'Table.Body - Missing valid rowKey!', r, rowKey);
	          }
	        }
	
	        return _react2.default.createElement(_bodyRow2.default, {
	          key: (r[rowKey] || i) + '-row',
	          components: components.body,
	          onRow: onRow,
	          row: r,
	          rowIndex: i,
	          rowData: rows[i],
	          columns: bodyColumns
	        });
	      }));
	    }
	  }, {
	    key: 'getRef',
	    value: function getRef() {
	      return this.ref;
	    }
	  }]);
	
	  return Body;
	}(_react2.default.Component);
	
	process.env.NODE_ENV !== "production" ? Body.propTypes = _types.tableBodyTypes : void 0;
	Body.defaultProps = {
	  onRow: function onRow() {}
	};
	Body.contextTypes = _types.tableBodyContextTypes;
	
	function omitOnRow(props) {
	  var onRow = props.onRow;
	
	  var ret = _objectWithoutProperties(props, ['onRow']); // eslint-disable-line no-unused-vars
	
	  return ret;
	}
	
	exports.default = Body;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(17);
	
	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent,
	 *  else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}
	
	module.exports = isEqual;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(18),
	    isObject = __webpack_require__(41),
	    isObjectLike = __webpack_require__(83);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(19),
	    equalArrays = __webpack_require__(60),
	    equalByTag = __webpack_require__(65),
	    equalObjects = __webpack_require__(70),
	    getTag = __webpack_require__(88),
	    isArray = __webpack_require__(84),
	    isHostObject = __webpack_require__(42),
	    isTypedArray = __webpack_require__(93);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(20),
	    stackClear = __webpack_require__(28),
	    stackDelete = __webpack_require__(29),
	    stackGet = __webpack_require__(30),
	    stackHas = __webpack_require__(31),
	    stackSet = __webpack_require__(32);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(21),
	    listCacheDelete = __webpack_require__(22),
	    listCacheGet = __webpack_require__(25),
	    listCacheHas = __webpack_require__(26),
	    listCacheSet = __webpack_require__(27);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(23);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(24);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(23);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(23);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(23);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(20);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}
	
	module.exports = stackClear;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(20),
	    MapCache = __webpack_require__(33);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(34),
	    mapCacheDelete = __webpack_require__(54),
	    mapCacheGet = __webpack_require__(57),
	    mapCacheHas = __webpack_require__(58),
	    mapCacheSet = __webpack_require__(59);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(35),
	    ListCache = __webpack_require__(20),
	    Map = __webpack_require__(53);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(36),
	    hashDelete = __webpack_require__(49),
	    hashGet = __webpack_require__(50),
	    hashHas = __webpack_require__(51),
	    hashSet = __webpack_require__(52);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(37);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	module.exports = hashClear;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(39),
	    getValue = __webpack_require__(48);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(40),
	    isHostObject = __webpack_require__(42),
	    isMasked = __webpack_require__(43),
	    isObject = __webpack_require__(41),
	    toSource = __webpack_require__(47);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(44);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(45);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(46);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = checkGlobal;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(37);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(37);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(37);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    root = __webpack_require__(45);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(55);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(56);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(55);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(55);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(55);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(61),
	    arraySome = __webpack_require__(64);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(33),
	    setCacheAdd = __webpack_require__(62),
	    setCacheHas = __webpack_require__(63);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(66),
	    Uint8Array = __webpack_require__(67),
	    equalArrays = __webpack_require__(60),
	    mapToArray = __webpack_require__(68),
	    setToArray = __webpack_require__(69);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);
	
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(45);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(45);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(71),
	    keys = __webpack_require__(73);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(72);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}
	
	module.exports = baseHas;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(71),
	    baseKeys = __webpack_require__(74),
	    indexKeys = __webpack_require__(75),
	    isArrayLike = __webpack_require__(79),
	    isIndex = __webpack_require__(86),
	    isPrototype = __webpack_require__(87);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
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
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 74 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(76),
	    isArguments = __webpack_require__(77),
	    isArray = __webpack_require__(84),
	    isLength = __webpack_require__(82),
	    isString = __webpack_require__(85);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(78);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(79),
	    isObjectLike = __webpack_require__(83);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(80),
	    isFunction = __webpack_require__(40),
	    isLength = __webpack_require__(82);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(81);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(84),
	    isObjectLike = __webpack_require__(83);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(89),
	    Map = __webpack_require__(53),
	    Promise = __webpack_require__(90),
	    Set = __webpack_require__(91),
	    WeakMap = __webpack_require__(92),
	    toSource = __webpack_require__(47);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    root = __webpack_require__(45);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    root = __webpack_require__(45);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    root = __webpack_require__(45);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(38),
	    root = __webpack_require__(45);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(82),
	    isObjectLike = __webpack_require__(83);
	
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
	    dataViewTag = '[object DataView]',
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
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _isEqual = __webpack_require__(16);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactabularUtils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BodyRow = function (_React$Component) {
	  _inherits(BodyRow, _React$Component);
	
	  function BodyRow() {
	    _classCallCheck(this, BodyRow);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BodyRow).apply(this, arguments));
	  }
	
	  _createClass(BodyRow, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      var previousProps = this.props;
	
	      return !((0, _isEqual2.default)(previousProps.columns, nextProps.columns) && (0, _isEqual2.default)(previousProps.row, nextProps.row) && (0, _isEqual2.default)(previousProps.rowData, nextProps.rowData));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var columns = _props.columns;
	      var components = _props.components;
	      var row = _props.row;
	      var onRow = _props.onRow;
	      var rowIndex = _props.rowIndex;
	      var rowData = _props.rowData;
	
	
	      return _react2.default.createElement(components.row, onRow(row, rowIndex), columns.map(function (_ref, j) {
	        var column = _ref.column;
	        var cell = _ref.cell;
	        var property = _ref.property;
	        var props = _ref.props;
	
	        var _ref2 = cell || {};
	
	        var _ref2$transforms = _ref2.transforms;
	        var transforms = _ref2$transforms === undefined ? [] : _ref2$transforms;
	        var _ref2$format = _ref2.format;
	        var format = _ref2$format === undefined ? function (a) {
	          return a;
	        } : _ref2$format; // TODO: test against this case
	
	        var extraParameters = {
	          columnIndex: j,
	          column: column,
	          rowData: rowData,
	          rowIndex: rowIndex,
	          property: property
	        };
	        var transformed = (0, _reactabularUtils.evaluateTransforms)(transforms, row[property], extraParameters);
	
	        if (!transformed) {
	          console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
	        }
	
	        return _react2.default.createElement(components.cell, _extends({
	          key: j + '-cell'
	        }, (0, _reactabularUtils.mergePropPair)(props, transformed)), transformed.children || format(row['_' + property] || row[property], extraParameters));
	      }));
	    }
	  }]);
	
	  return BodyRow;
	}(_react2.default.Component);
	
	BodyRow.defaultProps = {
	  onRow: function onRow() {
	    return {};
	  }
	};
	process.env.NODE_ENV !== "production" ? BodyRow.propTypes = {
	  columns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object,
	  row: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
	  onRow: _react2.default.PropTypes.func,
	  rowIndex: _react2.default.PropTypes.number.isRequired,
	  rowData: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired
	} : void 0;
	
	exports.default = BodyRow;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Header = exports.Body = undefined;
	
	var _body = __webpack_require__(96);
	
	var _body2 = _interopRequireDefault(_body);
	
	var _header = __webpack_require__(97);
	
	var _header2 = _interopRequireDefault(_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Body = _body2.default;
	exports.Header = _header2.default;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactabularTable = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/prefer-stateless-function */
	
	
	var Body = function (_React$Component) {
	  _inherits(Body, _React$Component);
	
	  function Body(props) {
	    _classCallCheck(this, Body);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Body).call(this, props));
	
	    _this.ref = null;
	    return _this;
	  }
	
	  _createClass(Body, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var style = _props.style;
	      var tableHeader = _props.tableHeader;
	
	      var props = _objectWithoutProperties(_props, ['style', 'tableHeader']);
	
	      return _react2.default.createElement(_reactabularTable.Body, _extends({
	        ref: function ref(body) {
	          _this2.ref = body && body.getRef();
	        },
	        style: _extends({}, style || {}, {
	          display: 'block',
	          overflow: 'auto'
	        })
	      }, props, {
	        // Override onScroll as otherwise the logic won't work
	        onScroll: function onScroll(_ref) {
	          var scrollLeft = _ref.target.scrollLeft;
	
	          if (tableHeader) {
	            tableHeader.scrollLeft = scrollLeft;
	          }
	        }
	      }));
	    }
	  }, {
	    key: 'getRef',
	    value: function getRef() {
	      return this.ref;
	    }
	  }]);
	
	  return Body;
	}(_react2.default.Component);
	
	process.env.NODE_ENV !== "production" ? Body.propTypes = {
	  style: _react2.default.PropTypes.any,
	  tableHeader: _react2.default.PropTypes.any
	} : void 0;
	
	exports.default = Body;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactabularTable = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/prefer-stateless-function */
	
	
	var Header = function (_React$Component) {
	  _inherits(Header, _React$Component);
	
	  function Header(props) {
	    _classCallCheck(this, Header);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));
	
	    _this.ref = null;
	    return _this;
	  }
	
	  _createClass(Header, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var style = _props.style;
	      var tableBody = _props.tableBody;
	
	      var props = _objectWithoutProperties(_props, ['style', 'tableBody']);
	
	      return _react2.default.createElement(_reactabularTable.Header, _extends({
	        ref: function ref(header) {
	          _this2.ref = header && header.getRef();
	        },
	        style: _extends({}, style || {}, {
	          display: 'block',
	          overflow: 'auto'
	        })
	      }, props, {
	        // Override onScroll as otherwise the logic won't work
	        onScroll: function onScroll(_ref) {
	          var scrollLeft = _ref.target.scrollLeft;
	
	          if (tableBody) {
	            tableBody.scrollLeft = scrollLeft;
	          }
	        }
	      }));
	    }
	  }, {
	    key: 'getRef',
	    value: function getRef() {
	      return this.ref;
	    }
	  }]);
	
	  return Header;
	}(_react2.default.Component);
	
	process.env.NODE_ENV !== "production" ? Header.propTypes = {
	  style: _react2.default.PropTypes.any,
	  tableBody: _react2.default.PropTypes.any
	} : void 0;
	
	exports.default = Header;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _multiple_columns = __webpack_require__(99);
	
	Object.defineProperty(exports, 'multipleColumns', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_multiple_columns).default;
	  }
	});
	
	var _single_column = __webpack_require__(100);
	
	Object.defineProperty(exports, 'singleColumn', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_single_column).default;
	  }
	});
	
	var _column_matches = __webpack_require__(101);
	
	Object.defineProperty(exports, '_columnMatches', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_column_matches).default;
	  }
	});
	
	var _matches = __webpack_require__(103);
	
	Object.defineProperty(exports, 'matches', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_matches).default;
	  }
	});
	
	var _strategies = __webpack_require__(102);
	
	Object.defineProperty(exports, 'strategies', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_strategies).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _single_column = __webpack_require__(100);
	
	var _single_column2 = _interopRequireDefault(_single_column);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var multipleColumns = function multipleColumns(_ref) {
	  var columns = _ref.columns;
	  var query = _ref.query;
	  var strategy = _ref.strategy;
	  var transform = _ref.transform;
	  return function (data) {
	    return query ? Object.keys(query).reduce(function (filteredData, searchColumn) {
	      return (0, _single_column2.default)({
	        columns: columns,
	        searchColumn: searchColumn,
	        query: query[searchColumn],
	        strategy: strategy,
	        transform: transform
	      })(filteredData);
	    }, data) : data;
	  };
	};
	
	exports.default = multipleColumns;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _column_matches = __webpack_require__(101);
	
	var _column_matches2 = _interopRequireDefault(_column_matches);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var singleColumn = function singleColumn(_ref) {
	  var columns = _ref.columns;
	  var _ref$searchColumn = _ref.searchColumn;
	  var searchColumn = _ref$searchColumn === undefined ? 'all' : _ref$searchColumn;
	  var query = _ref.query;
	  var strategy = _ref.strategy;
	  var transform = _ref.transform;
	  return function (rows) {
	    if (!query) {
	      return rows;
	    }
	
	    var ret = columns;
	
	    if (searchColumn !== 'all') {
	      ret = columns.filter(function (col) {
	        return col && col.property === searchColumn;
	      });
	    }
	
	    return rows.filter(function (row) {
	      return ret.filter(function (column) {
	        return (0, _column_matches2.default)({
	          query: query, column: column, strategy: strategy, transform: transform, row: row
	        });
	      }).length > 0;
	    });
	  };
	};
	
	exports.default = singleColumn;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _strategies = __webpack_require__(102);
	
	var _strategies2 = _interopRequireDefault(_strategies);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _columnMatches = function _columnMatches(_ref) {
	  var query = _ref.query;
	  var _ref$column = _ref.column;
	  var column = _ref$column === undefined ? {} : _ref$column;
	  var row = _ref.row;
	  var _ref$strategy = _ref.strategy;
	  var strategy = _ref$strategy === undefined ? _strategies2.default.infix : _ref$strategy;
	  var _ref$transform = _ref.transform;
	  var transform = _ref$transform === undefined ? function () {
	    var v = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    return v && v.toLowerCase && v.toLowerCase();
	  } : _ref$transform;
	
	  var property = column.property;
	  // Pick resolved value by convention
	  var resolvedValue = String(row['_' + property] || row[property]);
	
	  return strategy(transform(query)).evaluate(transform(resolvedValue));
	};
	
	exports.default = _columnMatches;

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var infix = function infix(queryTerm) {
	  return {
	    evaluate: function evaluate() {
	      var searchText = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      if (!searchText) {
	        return false;
	      }
	
	      return searchText.indexOf(queryTerm) !== -1;
	    },
	    matches: function matches() {
	      var searchText = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      if (!searchText) {
	        return [];
	      }
	
	      var splitString = searchText.split(queryTerm);
	      var result = [];
	      var currentPosition = 0;
	
	      for (var x = 0; x < splitString.length; x++) {
	        result.push({
	          startIndex: currentPosition + splitString[x].length,
	          length: queryTerm.length
	        });
	
	        currentPosition += splitString[x].length + queryTerm.length;
	      }
	
	      result.pop();
	
	      return result;
	    }
	  };
	};
	
	var prefix = function prefix(queryTerm) {
	  return {
	    evaluate: function evaluate() {
	      var searchText = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      if (!searchText) {
	        return false;
	      }
	
	      return searchText.indexOf(queryTerm) === 0;
	    },
	    matches: function matches() {
	      var searchText = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	      if (!searchText) {
	        return [];
	      }
	
	      var prefixIndex = searchText.indexOf(queryTerm);
	
	      if (prefixIndex === 0) {
	        return [{
	          startIndex: 0,
	          length: queryTerm.length
	        }];
	      }
	
	      return [];
	    }
	  };
	};
	
	exports.default = {
	  infix: infix,
	  prefix: prefix
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _strategies = __webpack_require__(102);
	
	var _strategies2 = _interopRequireDefault(_strategies);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var matches = function matches() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var value = _ref.value;
	  var query = _ref.query;
	  var _ref$strategy = _ref.strategy;
	  var strategy = _ref$strategy === undefined ? _strategies2.default.infix : _ref$strategy;
	  var _ref$transform = _ref.transform;
	  var transform = _ref$transform === undefined ? function (v) {
	    return v.toLowerCase();
	  } : _ref$transform;
	
	  if (!query) {
	    return {};
	  }
	
	  var val = value && value.toString ? value.toString() : '';
	
	  return strategy(transform(query)).matches(transform(val));
	};
	
	exports.default = matches;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.row = exports.byArrowKeys = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Select = function (_React$Component) {
	  _inherits(Select, _React$Component);
	
	  function Select(props) {
	    _classCallCheck(this, Select);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));
	
	    _this.onKeyPressed = _this.onKeyPressed.bind(_this);
	    return _this;
	  }
	
	  _createClass(Select, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('keydown', this.onKeyPressed);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('keydown', this.onKeyPressed);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;
	
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        children
	      );
	    }
	  }, {
	    key: 'onKeyPressed',
	    value: function onKeyPressed(e) {
	      var _props = this.props;
	      var rows = _props.rows;
	      var selectedRowIndex = _props.selectedRowIndex;
	      var onSelectRow = _props.onSelectRow;
	
	      // No selection yet, escape
	
	      if (selectedRowIndex < 0) {
	        return;
	      }
	
	      // Arrow Up
	      if (e.keyCode === 38 && selectedRowIndex > 0) {
	        e.preventDefault();
	
	        onSelectRow(selectedRowIndex - 1);
	      }
	
	      // Arrow Down
	      if (e.keyCode === 40 && selectedRowIndex < rows.length - 1) {
	        e.preventDefault();
	
	        onSelectRow(selectedRowIndex + 1);
	      }
	    }
	  }]);
	
	  return Select;
	}(_react2.default.Component);
	
	process.env.NODE_ENV !== "production" ? Select.propTypes = {
	  children: _react2.default.PropTypes.any.isRequired,
	  selectedRowIndex: _react2.default.PropTypes.any,
	  onSelectRow: _react2.default.PropTypes.func.isRequired,
	  // TODO: Same as for table but this is enough for now
	  // -> extract reactabular-types?
	  rows: _react2.default.PropTypes.any.isRequired
	} : void 0;
	Select.defaultProps = {
	  onSelectRow: function onSelectRow() {}
	};
	
	var byArrowKeys = function byArrowKeys(props) {
	  return function (children) {
	    return _react2.default.createElement(Select, props, children);
	  };
	};
	
	function selectRow(_ref) {
	  var rows = _ref.rows;
	  var _ref$isSelected = _ref.isSelected;
	  var isSelected = _ref$isSelected === undefined ? function (row, selectedRowId) {
	    return row.id === selectedRowId;
	  } : _ref$isSelected;
	  var selectedRowId = _ref.selectedRowId;
	
	  var selectedRow = void 0;
	
	  // Reset selected flags and select the given row
	  var newRows = rows.map(function (row) {
	    var selected = false;
	
	    if (isSelected(row, selectedRowId)) {
	      selected = true;
	
	      selectedRow = row;
	    }
	
	    return _extends({}, row, {
	      selected: selected
	    });
	  });
	
	  return {
	    rows: newRows,
	    selectedRow: selectedRow
	  };
	}
	
	exports.byArrowKeys = byArrowKeys;
	exports.row = selectRow;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _by_column = __webpack_require__(106);
	
	Object.defineProperty(exports, 'byColumn', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_by_column).default;
	  }
	});
	
	var _by_columns = __webpack_require__(108);
	
	Object.defineProperty(exports, 'byColumns', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_by_columns).default;
	  }
	});
	
	var _header = __webpack_require__(109);
	
	Object.defineProperty(exports, 'header', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_header).default;
	  }
	});
	
	var _sorter = __webpack_require__(110);
	
	Object.defineProperty(exports, 'sorter', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sorter).default;
	  }
	});
	
	var _reset = __webpack_require__(111);
	
	Object.defineProperty(exports, 'reset', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_reset).default;
	  }
	});
	
	var _sort = __webpack_require__(112);
	
	Object.defineProperty(exports, 'sort', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sort).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _default_order = __webpack_require__(107);
	
	var _default_order2 = _interopRequireDefault(_default_order);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var byColumn = function byColumn(_ref) {
	  var sortingColumns = _ref.sortingColumns;
	  var _ref$sortingOrder = _ref.sortingOrder;
	  var sortingOrder = _ref$sortingOrder === undefined ? _default_order2.default : _ref$sortingOrder;
	  var _ref$selectedColumn = _ref.selectedColumn;
	  var selectedColumn = _ref$selectedColumn === undefined ? -1 : _ref$selectedColumn;
	
	  var sort = sortingOrder.FIRST;
	
	  if (selectedColumn < 0) {
	    return sortingColumns;
	  }
	
	  if (sortingColumns && {}.hasOwnProperty.call(sortingColumns, selectedColumn)) {
	    sort = sortingOrder[sortingColumns[selectedColumn].direction];
	
	    if (!sort) {
	      return {};
	    }
	  }
	
	  return _defineProperty({}, selectedColumn, {
	    direction: sort,
	    position: 0
	  });
	};
	
	exports.default = byColumn;

/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultOrder = {
	  FIRST: 'asc',
	  '': 'asc',
	  asc: 'desc',
	  desc: ''
	};
	
	exports.default = defaultOrder;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _default_order = __webpack_require__(107);
	
	var _default_order2 = _interopRequireDefault(_default_order);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var byColumns = function byColumns(_ref) {
	  var sortingColumns = _ref.sortingColumns;
	  var _ref$sortingOrder = _ref.sortingOrder;
	  var sortingOrder = _ref$sortingOrder === undefined ? _default_order2.default : _ref$sortingOrder;
	  var _ref$selectedColumn = _ref.selectedColumn;
	  var selectedColumn = _ref$selectedColumn === undefined ? -1 : _ref$selectedColumn;
	
	  var newSortingColumns = {};
	
	  if (selectedColumn < 0) {
	    return sortingColumns;
	  }
	
	  if (!sortingColumns) {
	    return _defineProperty({}, selectedColumn, {
	      direction: sortingOrder.FIRST,
	      position: 0
	    });
	  } else if ({}.hasOwnProperty.call(sortingColumns, selectedColumn)) {
	    // Clone to avoid mutating the original structure
	    newSortingColumns = _extends({}, sortingColumns);
	
	    var newSort = sortingOrder[newSortingColumns[selectedColumn].direction];
	
	    if (newSort) {
	      newSortingColumns[selectedColumn] = {
	        direction: newSort,
	        position: newSortingColumns[selectedColumn].position
	      };
	    } else {
	      (function () {
	        var oldPosition = newSortingColumns[selectedColumn].position;
	
	        delete newSortingColumns[selectedColumn];
	
	        // Update position of columns after the deleted one
	        Object.keys(newSortingColumns).forEach(function (k) {
	          var v = newSortingColumns[k];
	
	          if (v.position > oldPosition) {
	            v.position--;
	          }
	        });
	      })();
	    }
	
	    return newSortingColumns;
	  }
	
	  return _extends({}, sortingColumns, _defineProperty({}, selectedColumn, {
	    direction: sortingOrder.FIRST,
	    position: Object.keys(sortingColumns).length
	  }));
	};
	
	exports.default = byColumns;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultStyles = {
	  container: {},
	  value: {},
	  order: {}
	};
	
	var header = function header(_ref) {
	  var sortable = _ref.sortable;
	  var getSortingColumns = _ref.getSortingColumns;
	  var _ref$styles = _ref.styles;
	  var styles = _ref$styles === undefined ? {} : _ref$styles;
	  var _ref$fieldName = _ref.fieldName;
	  var fieldName = _ref$fieldName === undefined ? 'columnIndex' : _ref$fieldName;
	
	  if (!sortable) {
	    throw new Error('header - Missing sortable!');
	  }
	  if (!getSortingColumns) {
	    throw new Error('header - Missing getSortingColumns!');
	  }
	
	  var headerStyles = _extends({}, defaultStyles, styles);
	
	  return function (value, extra) {
	    var sortingColumns = getSortingColumns();
	    var sortingColumn = sortingColumns && sortingColumns[extra[fieldName]] || {};
	    var sortingPosition = sortingColumn.position;
	
	    return _react2.default.createElement(
	      'div',
	      { className: 'sort-container', style: headerStyles.container },
	      _react2.default.createElement(
	        'span',
	        {
	          className: 'sort-value',
	          style: headerStyles.value
	        },
	        value
	      ),
	      {}.hasOwnProperty.call(sortingColumn, 'position') ? _react2.default.createElement(
	        'span',
	        {
	          className: 'sort-order',
	          style: headerStyles.order
	        },
	        sortingPosition + 1
	      ) : null,
	      _react2.default.createElement('span', sortable(value, extra))
	    );
	  };
	};
	
	exports.default = header;

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// sorter === lodash orderBy
	// https://lodash.com/docs#orderBy
	var sorter = function sorter() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var columns = _ref.columns;
	  var sortingColumns = _ref.sortingColumns;
	  var sort = _ref.sort;
	  var _ref$getColumn = _ref.getColumn;
	  var getColumn = _ref$getColumn === undefined ? function (columns, sortingColumnKey) {
	    return columns[sortingColumnKey];
	  } : _ref$getColumn;
	  return function (data) {
	    if (!columns) {
	      throw new Error('sort.sorter - Missing columns!');
	    }
	
	    if (!sortingColumns) {
	      return data;
	    }
	
	    var columnIndexList = new Array(sortingColumns.length);
	    var orderList = new Array(sortingColumns.length);
	
	    Object.keys(sortingColumns).forEach(function (sortingColumnKey) {
	      var realColumn = getColumn(columns, sortingColumnKey) || {};
	      var sortingColumn = sortingColumns[sortingColumnKey];
	
	      columnIndexList[sortingColumn.position] = function (row) {
	        var property = realColumn.property;
	        var value = row[property];
	        // Pick resolved value by convention
	        var resolvedValue = row['_' + property] || value;
	
	        if (resolvedValue && resolvedValue.toLowerCase) {
	          return resolvedValue.toLowerCase();
	        }
	
	        if (value && value.toLowerCase) {
	          return value.toLowerCase();
	        }
	
	        return value;
	      };
	
	      orderList[sortingColumn.position] = sortingColumn.direction;
	    });
	
	    return sort(data, columnIndexList, orderList);
	  };
	};
	
	exports.default = sorter;

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var reset = function reset(_ref) {
	  var _ref$event = _ref.event;
	  var event = _ref$event === undefined ? 'onDoubleClick' : _ref$event;
	  var _ref$getSortingColumn = _ref.getSortingColumns;
	  var getSortingColumns = _ref$getSortingColumn === undefined ? function () {
	    return [];
	  } : _ref$getSortingColumn;
	  var _ref$onReset = _ref.onReset;
	  var onReset = _ref$onReset === undefined ? function () {} : _ref$onReset;
	  var _ref$fieldName = _ref.fieldName;
	  var fieldName = _ref$fieldName === undefined ? 'columnIndex' : _ref$fieldName;
	  return function (value, extra) {
	    return _defineProperty({}, event, function () {
	      var sortingColumns = getSortingColumns();
	
	      if (!sortingColumns || !Object.keys(sortingColumns).length) {
	        return;
	      }
	
	      var field = extra[fieldName];
	
	      var position = sortingColumns[field].position;
	      var newSortingColumns = {};
	
	      delete sortingColumns[field];
	
	      Object.keys(sortingColumns).forEach(function (k) {
	        var column = sortingColumns[k];
	
	        if (column.position > position) {
	          newSortingColumns[k] = _extends({}, column, {
	            position: column.position - 1
	          });
	        } else {
	          newSortingColumns[k] = column;
	        }
	      });
	
	      onReset({
	        sortingColumns: newSortingColumns
	      });
	    });
	  };
	};
	
	exports.default = reset;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reactabularUtils = __webpack_require__(5);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var sort = function sort() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var _ref$event = _ref.event;
	  var event = _ref$event === undefined ? 'onClick' : _ref$event;
	  var _ref$getSortingColumn = _ref.getSortingColumns;
	  var getSortingColumns = _ref$getSortingColumn === undefined ? function () {
	    return [];
	  } : _ref$getSortingColumn;
	  var _ref$onSort = _ref.onSort;
	  var onSort = _ref$onSort === undefined ? function () {} : _ref$onSort;
	  var _ref$fieldName = _ref.fieldName;
	  var fieldName = _ref$fieldName === undefined ? 'columnIndex' : _ref$fieldName;
	  return function (_value, extra) {
	    var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var className = _ref2.className;
	
	    var props = _objectWithoutProperties(_ref2, ['className']);
	
	    var sortingColumns = getSortingColumns();
	    var field = extra[fieldName];
	    var headerClass = 'sort sort-none';
	
	    // Check against undefined to allow zero
	    if (sortingColumns[field] !== undefined) {
	      headerClass = 'sort sort-' + sortingColumns[field].direction;
	    }
	
	    return _extends({}, props, _defineProperty({
	      className: (0, _reactabularUtils.mergeClassNames)(className, headerClass)
	    }, event, function () {
	      return onSort(field);
	    }));
	  };
	};
	
	exports.default = sort;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cell = __webpack_require__(114);
	
	Object.defineProperty(exports, 'cell', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_cell).default;
	  }
	});
	
	var _value = __webpack_require__(115);
	
	Object.defineProperty(exports, 'value', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_value).default;
	  }
	});
	
	var _highlighter = __webpack_require__(116);
	
	Object.defineProperty(exports, 'highlighter', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_highlighter).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _value = __webpack_require__(115);
	
	var _value2 = _interopRequireDefault(_value);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var highlightCell = function highlightCell(value) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? { rowData: { _highlights: {} } } : arguments[1];
	
	  var rowData = _ref.rowData;
	  var property = _ref.property;
	  return (0, _value2.default)(value, rowData._highlights && rowData._highlights[property]);
	};
	
	exports.default = highlightCell;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var highlightValue = function highlightValue(value, highlights) {
	  if (!highlights) {
	    return _react2.default.createElement(
	      "span",
	      null,
	      value
	    );
	  }
	
	  var val = String(value); // deals with arrays/numbers/...
	
	  var children = [];
	  var currentPosition = 0;
	  var x = 0;
	
	  for (x = 0; x < highlights.length; x++) {
	    var nonMatchingPrefix = val.slice(currentPosition, highlights[x].startIndex);
	    var matchingText = val.slice(highlights[x].startIndex, highlights[x].startIndex + highlights[x].length);
	
	    currentPosition = highlights[x].startIndex + highlights[x].length;
	
	    if (nonMatchingPrefix.length > 0) {
	      children.push(_react2.default.createElement(
	        "span",
	        { key: x + "-nonmatch" },
	        nonMatchingPrefix
	      ));
	    }
	    children.push(_react2.default.createElement(
	      "span",
	      { className: "highlight", key: x + "-match" },
	      matchingText
	    ));
	  }
	  children.push(_react2.default.createElement(
	    "span",
	    { key: x + "-remainder" },
	    val.slice(currentPosition)
	  ));
	
	  return _react2.default.createElement(
	    "span",
	    { className: "search-result" },
	    children
	  );
	};
	
	exports.default = highlightValue;

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function highlighter() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var columns = _ref.columns;
	  var matches = _ref.matches;
	  var query = _ref.query;
	
	  if (!columns) {
	    throw new Error('highlighter - Missing columns!');
	  }
	  if (!matches) {
	    throw new Error('highlighter - Missing matches!');
	  }
	  if (!query) {
	    throw new Error('highlighter - Missing query!');
	  }
	
	  return function (rows) {
	    return rows.map(function (row) {
	      var ret = {
	        _highlights: {}
	      };
	
	      columns.forEach(function (column) {
	        var property = column.property;
	        var value = row[property];
	        // Pick resolved value by convention
	        var resolvedValue = row['_' + property] || value;
	
	        ret[property] = value;
	
	        // Retain possibly resolved value
	        if (resolvedValue !== value) {
	          ret['_' + property] = resolvedValue;
	        }
	
	        if (typeof property === 'undefined') {
	          return;
	        }
	
	        // Stash highlighted value based on index
	        // so it can be extracted later for highlighting
	        ret._highlights[property] = matches({
	          value: resolvedValue,
	          query: query[property] || query.all
	        });
	      });
	
	      // Capture original row data too
	      return _extends({}, row, ret);
	    });
	  };
	}
	
	exports.default = highlighter;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _resolve = __webpack_require__(118);
	
	Object.defineProperty(exports, 'resolve', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_resolve).default;
	  }
	});
	
	var _index = __webpack_require__(119);
	
	Object.defineProperty(exports, 'index', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_index).default;
	  }
	});
	
	var _nested = __webpack_require__(120);
	
	Object.defineProperty(exports, 'nested', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_nested).default;
	  }
	});
	
	var _by_function = __webpack_require__(181);
	
	Object.defineProperty(exports, 'byFunction', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_by_function).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reactabularUtils = __webpack_require__(5);
	
	function resolve(_ref) {
	  var columns = _ref.columns;
	  var method = _ref.method;
	
	  if (!columns) {
	    throw new Error('resolve - Missing columns!');
	  }
	  if (!method) {
	    throw new Error('resolve - Missing method!');
	  }
	
	  var resolvedColumns = (0, _reactabularUtils.resolveBodyColumns)(columns);
	
	  return function (rows) {
	    return rows.map(function (rowData, rowIndex) {
	      var ret = {};
	
	      resolvedColumns.forEach(function (column) {
	        var result = method({
	          rowData: rowData,
	          rowIndex: rowIndex,
	          column: column
	        });
	
	        delete result.undefined;
	
	        ret = _extends({}, rowData, ret, result);
	      });
	
	      return ret;
	    });
	  };
	}
	
	exports.default = resolve;

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function index(_ref) {
	  var rowData = _ref.rowData;
	  var rowIndex = _ref.rowIndex;
	
	  return _extends({}, rowData, {
	    _index: rowIndex
	  });
	}
	
	exports.default = index;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _get = __webpack_require__(121);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _has = __webpack_require__(169);
	
	var _has2 = _interopRequireDefault(_has);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function nested(_ref) {
	  var rowData = _ref.rowData;
	  var column = _ref.column;
	  var property = column.property;
	
	
	  if (!property) {
	    return {};
	  }
	
	  if (!(0, _has2.default)(rowData, property)) {
	    console.warn( // eslint-disable-line no-console
	    'resolve.nested - Failed to find "' + property + '" property from', rowData);
	
	    return {};
	  }
	
	  return _extends({}, rowData, _defineProperty({}, property, (0, _get2.default)(rowData, property)));
	}
	
	exports.default = nested;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(122);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(123),
	    isKey = __webpack_require__(167),
	    toKey = __webpack_require__(168);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(124),
	    stringToPath = __webpack_require__(125);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 124 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(126),
	    toString = __webpack_require__(162);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(127);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(128),
	    mapCacheDelete = __webpack_require__(156),
	    mapCacheGet = __webpack_require__(159),
	    mapCacheHas = __webpack_require__(160),
	    mapCacheSet = __webpack_require__(161);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(129),
	    ListCache = __webpack_require__(147),
	    Map = __webpack_require__(155);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(130),
	    hashDelete = __webpack_require__(143),
	    hashGet = __webpack_require__(144),
	    hashHas = __webpack_require__(145),
	    hashSet = __webpack_require__(146);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(131);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	module.exports = hashClear;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(132);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(133),
	    getValue = __webpack_require__(142);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(134),
	    isHostObject = __webpack_require__(136),
	    isMasked = __webpack_require__(137),
	    isObject = __webpack_require__(135),
	    toSource = __webpack_require__(141);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(135);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(138);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(139);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(140);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 140 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = checkGlobal;


/***/ },
/* 141 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(131);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(131);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(131);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(148),
	    listCacheDelete = __webpack_require__(149),
	    listCacheGet = __webpack_require__(152),
	    listCacheHas = __webpack_require__(153),
	    listCacheSet = __webpack_require__(154);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(150);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(151);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 151 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(150);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(150);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(150);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(132),
	    root = __webpack_require__(139);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(157);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(158);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 158 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(157);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(157);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(157);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(163);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(164),
	    isSymbol = __webpack_require__(165);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(139);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(166);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 166 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(124),
	    isSymbol = __webpack_require__(165);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(165);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(170),
	    hasPath = __webpack_require__(172);
	
	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': 2 } };
	 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b');
	 * // => true
	 *
	 * _.has(object, ['a', 'b']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return object != null && hasPath(object, path, baseHas);
	}
	
	module.exports = has;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(171);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}
	
	module.exports = baseHas;


/***/ },
/* 171 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(123),
	    isArguments = __webpack_require__(173),
	    isArray = __webpack_require__(124),
	    isIndex = __webpack_require__(179),
	    isKey = __webpack_require__(167),
	    isLength = __webpack_require__(178),
	    isString = __webpack_require__(180),
	    toKey = __webpack_require__(168);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var result,
	      index = -1,
	      length = path.length;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(174);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(175),
	    isObjectLike = __webpack_require__(166);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(176),
	    isFunction = __webpack_require__(134),
	    isLength = __webpack_require__(178);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(177);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 178 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 179 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(124),
	    isObjectLike = __webpack_require__(166);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _get = __webpack_require__(121);
	
	var _get2 = _interopRequireDefault(_get);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function byFunction(path) {
	  return function (_ref) {
	    var rowData = _ref.rowData;
	    var _ref$column = _ref.column;
	    var column = _ref$column === undefined ? {} : _ref$column;
	    var property = column.property;
	
	
	    if (!property) {
	      return rowData;
	    }
	
	    var value = rowData[property];
	    var resolver = (0, _get2.default)(column, path);
	    var ret = _extends({}, rowData, _defineProperty({}, property, value));
	
	    if (resolver) {
	      ret['_' + property] = resolver(value, {
	        property: property,
	        rowData: rowData
	      });
	    }
	
	    return ret;
	  };
	}
	
	exports.default = byFunction;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _resizable_column = __webpack_require__(183);
	
	var _resizable_column2 = _interopRequireDefault(_resizable_column);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _resizable_column2.default;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
	var resizableColumn = function resizableColumn(_ref) {
	  var onDrag = _ref.onDrag;
	  var _ref$minWidth = _ref.minWidth;
	  var minWidth = _ref$minWidth === undefined ? 100 : _ref$minWidth;
	  var _ref$styles = _ref.styles;
	  var styles = _ref$styles === undefined ? {
	    container: {},
	    value: {},
	    handle: {}
	  } : _ref$styles;
	
	  if (!onDrag) {
	    throw new Error('resizableColumn - Missing onDrag!');
	  }
	
	  return function (label, extraParameters) {
	    var ResizableColumn = function (_React$Component) {
	      _inherits(ResizableColumn, _React$Component);
	
	      function ResizableColumn(props) {
	        _classCallCheck(this, ResizableColumn);
	
	        // Track coordinate rows at instance, no React state needed
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResizableColumn).call(this, props));
	
	        _this.startX = null;
	        _this.startWidth = null;
	
	        _this.onMouseDown = _this.onMouseDown.bind(_this);
	        _this.onMouseMove = _this.onMouseMove.bind(_this);
	        _this.onMouseUp = _this.onMouseUp.bind(_this);
	
	        // Stash ref so we can check width
	        _this.column = null;
	        return _this;
	      }
	
	      _createClass(ResizableColumn, [{
	        key: 'render',
	        value: function render() {
	          var _this2 = this;
	
	          return _react2.default.createElement(
	            'div',
	            {
	              className: 'resize-container',
	              ref: function ref(column) {
	                if (column) {
	                  _this2.column = column;
	                }
	              },
	              style: styles.container
	            },
	            _react2.default.createElement(
	              'span',
	              { className: 'resize-value', style: styles.value },
	              label
	            ),
	            _react2.default.createElement(
	              'span',
	              {
	                className: 'resize-handle',
	                onMouseDown: this.onMouseDown,
	                style: styles.handle
	              },
	              ' '
	            )
	          );
	        }
	      }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(e) {
	          e.stopPropagation();
	          e.preventDefault();
	
	          document.addEventListener('mousemove', this.onMouseMove);
	          document.addEventListener('mouseup', this.onMouseUp);
	
	          this.startX = e.clientX;
	          this.startWidth = this.column.offsetWidth;
	        }
	      }, {
	        key: 'onMouseMove',
	        value: function onMouseMove(e) {
	          e.stopPropagation();
	          e.preventDefault();
	
	          var offset = this.startX - e.clientX;
	
	          onDrag(Math.max(this.startWidth - offset, minWidth), extraParameters);
	        }
	      }, {
	        key: 'onMouseUp',
	        value: function onMouseUp(e) {
	          e.stopPropagation();
	          e.preventDefault();
	
	          document.removeEventListener('mousemove', this.onMouseMove);
	          document.removeEventListener('mouseup', this.onMouseUp);
	        }
	      }]);
	
	      return ResizableColumn;
	    }(_react2.default.Component);
	
	    return _react2.default.createElement(ResizableColumn);
	  };
	};
	
	exports.default = resizableColumn;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var SearchColumns = function SearchColumns(_ref) {
	  var columns = _ref.columns;
	  var query = _ref.query;
	  var onChange = _ref.onChange;
	
	  var onQueryChange = function onQueryChange(event) {
	    onChange(_extends({}, query, _defineProperty({}, event.target.name, event.target.value)));
	  };
	
	  return _react2.default.createElement(
	    "tr",
	    null,
	    columns.map(function (column, i) {
	      return _react2.default.createElement(
	        "th",
	        { key: i + "-column-filter", className: "column-filter" },
	        column && column.property ? _react2.default.createElement("input", {
	          onChange: onQueryChange,
	          className: "column-filter-input",
	          name: column.property,
	          placeholder: column.filterPlaceholder || '',
	          value: query[i]
	        }) : ''
	      );
	    })
	  );
	};
	process.env.NODE_ENV !== "production" ? SearchColumns.propTypes = {
	  columns: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired,
	  onChange: _react2.default.PropTypes.func.isRequired,
	  query: _react2.default.PropTypes.object
	} : void 0;
	
	exports.default = SearchColumns;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Search = __webpack_require__(186);
	
	var _Search2 = _interopRequireDefault(_Search);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Search2.default;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SearchOptions = __webpack_require__(187);
	
	var _SearchOptions2 = _interopRequireDefault(_SearchOptions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Search = function Search(_ref) {
	  var query = _ref.query;
	  var _ref$column = _ref.column;
	  var column = _ref$column === undefined ? 'all' : _ref$column;
	  var columns = _ref.columns;
	  var i18n = _ref.i18n;
	  var onChange = _ref.onChange;
	  var onColumnChange = _ref.onColumnChange;
	
	  var props = _objectWithoutProperties(_ref, ['query', 'column', 'columns', 'i18n', 'onChange', 'onColumnChange']);
	
	  var onOptionsChange = function onOptionsChange(_ref2) {
	    var value = _ref2.target.value;
	
	    onChange(_defineProperty({}, value, query[value]));
	    onColumnChange(value);
	  };
	  var onQueryChange = function onQueryChange(_ref3) {
	    var value = _ref3.target.value;
	    return onChange(_defineProperty({}, column, value));
	  };
	
	  return _react2.default.createElement(
	    'div',
	    props,
	    _react2.default.createElement(_SearchOptions2.default, {
	      value: column,
	      onChange: onOptionsChange,
	      columns: columns,
	      i18n: i18n
	    }),
	    columns.length ? _react2.default.createElement('input', { type: 'input', onChange: onQueryChange, value: query[column] || '' }) : null
	  );
	};
	process.env.NODE_ENV !== "production" ? Search.propTypes = {
	  column: _react2.default.PropTypes.string,
	  columns: _react2.default.PropTypes.array,
	  query: _react2.default.PropTypes.object,
	  i18n: _react2.default.PropTypes.shape({
	    all: _react2.default.PropTypes.string
	  }),
	  onChange: _react2.default.PropTypes.func,
	  onColumnChange: _react2.default.PropTypes.func
	} : void 0;
	Search.defaultProps = {
	  columns: [],
	  query: {},
	  i18n: {
	    all: 'All'
	  },
	  onChange: function onChange() {},
	  onColumnChange: function onColumnChange() {}
	};
	
	exports.default = Search;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var SearchOptions = function SearchOptions(_ref) {
	  var columns = _ref.columns;
	  var i18n = _ref.i18n;
	  var _ref$onChange = _ref.onChange;
	  var onChange = _ref$onChange === undefined ? function () {} : _ref$onChange;
	  var value = _ref.value;
	
	  var props = _objectWithoutProperties(_ref, ['columns', 'i18n', 'onChange', 'value']);
	
	  return columns.length ? _react2.default.createElement(
	    'select',
	    _extends({ onChange: onChange, value: value }, props),
	    getOptions(columns, i18n).map(function (_ref2) {
	      var name = _ref2.name;
	      var value = _ref2.value;
	      return (// eslint-disable-line no-shadow, max-len
	        _react2.default.createElement(
	          'option',
	          { key: value + '-option', value: value },
	          name
	        )
	      );
	    })
	  ) : null;
	};
	SearchOptions.propTypes = {
	  columns: _react2.default.PropTypes.array,
	  i18n: _react2.default.PropTypes.object,
	  onChange: _react2.default.PropTypes.func,
	  value: _react2.default.PropTypes.any
	};
	
	var getOptions = function getOptions(columns, i18n) {
	  return (columns.length > 1 ? [{
	    value: 'all',
	    name: i18n.all
	  }] : []).concat(columns.map(function (column) {
	    if (column.property && column.header && column.header.label) {
	      return {
	        value: column.property,
	        name: column.header.label
	      };
	    }
	
	    return null;
	  }).filter(function (column) {
	    return column;
	  }));
	};
	
	exports.default = SearchOptions;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map