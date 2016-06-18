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
	
	var _table = __webpack_require__(1);
	
	Object.defineProperty(exports, 'Table', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_table).default;
	  }
	});
	
	var _search = __webpack_require__(5);
	
	Object.defineProperty(exports, 'Search', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_search).default;
	  }
	});
	
	var _sort = __webpack_require__(17);
	
	Object.defineProperty(exports, 'sort', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sort).default;
	  }
	});
	
	var _editors = __webpack_require__(20);
	
	Object.defineProperty(exports, 'editors', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_editors).default;
	  }
	});
	
	var _formatters = __webpack_require__(10);
	
	Object.defineProperty(exports, 'formatters', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_formatters).default;
	  }
	});
	
	var _predicates = __webpack_require__(14);
	
	Object.defineProperty(exports, 'predicates', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_predicates).default;
	  }
	});
	
	var _behaviors = __webpack_require__(24);
	
	Object.defineProperty(exports, 'behaviors', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_behaviors).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _isFunction = __webpack_require__(2);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Table = function (_React$Component) {
	  _inherits(Table, _React$Component);
	
	  function Table() {
	    _classCallCheck(this, Table);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	  }
	
	  _createClass(Table, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        columns: this.props.columns,
	        data: this.props.data
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = // eslint-disable-line no-unused-vars
	      this.props;
	      var columns = _props.columns;
	      var data = _props.data;
	      var children = _props.children;
	
	      var props = _objectWithoutProperties(_props, ['columns', 'data', 'children']);
	
	      return _react2.default.createElement(
	        'table',
	        props,
	        children
	      );
	    }
	  }]);
	
	  return Table;
	}(_react2.default.Component);
	
	Table.propTypes = {
	  columns: _react2.default.PropTypes.array,
	  data: _react2.default.PropTypes.array,
	  children: _react2.default.PropTypes.any
	};
	Table.childContextTypes = {
	  columns: _react2.default.PropTypes.array,
	  data: _react2.default.PropTypes.array
	};
	
	var Header = function Header(_ref, _ref2) {
	  var children = _ref.children;
	
	  var props = _objectWithoutProperties(_ref, ['children']);
	
	  var columns = _ref2.columns;
	  return _react2.default.createElement(
	    'thead',
	    props,
	    _react2.default.createElement(
	      'tr',
	      null,
	      columns.map(function (column, i) {
	        var cell = column.header;
	        var value = column.header || '';
	        var key = i + '-header';
	
	        return _react2.default.createElement(
	          'th',
	          { key: key },
	          (0, _isFunction2.default)(cell) ? cell({
	            cell: cell,
	            value: value,
	            property: column.property,
	            cellKey: key
	          }) : value
	        );
	      })
	    ),
	    children
	  );
	};
	Header.propTypes = {
	  children: _react2.default.PropTypes.any
	};
	Header.contextTypes = {
	  columns: _react2.default.PropTypes.array.isRequired
	};
	
	var Body = function Body(_ref3, _ref4) {
	  var row = _ref3.row;
	  var rowKey = _ref3.rowKey;
	
	  var props = _objectWithoutProperties(_ref3, ['row', 'rowKey']);
	
	  var columns = _ref4.columns;
	  var data = _ref4.data;
	  return _react2.default.createElement(
	    'tbody',
	    props,
	    data.map(function (r, i) {
	      return _react2.default.createElement(
	        'tr',
	        _extends({ key: (r[rowKey] || i) + '-row' }, row(r, i)),
	        columns.map(function (column, j) {
	          var cell = column.cell;
	          var value = r[column.property];
	          var cellData = data[i];
	
	          return _react2.default.createElement(
	            'td',
	            { key: j + '-cell' },
	            (0, _isFunction2.default)(cell) ? cell({
	              cell: cell,
	              value: value,
	              cellData: cellData,
	              property: column.property,
	              cellKey: cellData[rowKey]
	            }) : value
	          );
	        })
	      );
	    })
	  );
	};
	Body.propTypes = {
	  row: _react2.default.PropTypes.func,
	  rowKey: _react2.default.PropTypes.string.isRequired
	};
	Body.defaultProps = {
	  row: function row() {}
	};
	Body.contextTypes = {
	  columns: _react2.default.PropTypes.array.isRequired,
	  data: _react2.default.PropTypes.array.isRequired
	};
	
	Table.Header = Header;
	Table.Body = Body;
	
	exports.default = Table;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3);
	
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
/* 3 */
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _isNumber = __webpack_require__(6);
	
	var _isNumber2 = _interopRequireDefault(_isNumber);
	
	var _isString = __webpack_require__(8);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _formatters = __webpack_require__(10);
	
	var _formatters2 = _interopRequireDefault(_formatters);
	
	var _predicates = __webpack_require__(14);
	
	var _predicates2 = _interopRequireDefault(_predicates);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Search = function (_React$Component) {
	  _inherits(Search, _React$Component);
	
	  function Search(props) {
	    _classCallCheck(this, Search);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Search).call(this, props));
	
	    _this.state = {
	      column: 'all',
	      query: ''
	    };
	
	    _this.onColumnChange = _this.onColumnChange.bind(_this);
	    _this.onQueryChange = _this.onQueryChange.bind(_this);
	    return _this;
	  }
	
	  _createClass(Search, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.onChange(_defineProperty({}, this.state.column, this.state.query));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = // eslint-disable-line no-unused-vars
	      this.props;
	      var onChange = _props.onChange;
	      var columns = _props.columns;
	      var data = _props.data;
	      var i18n = _props.i18n;
	
	      var props = _objectWithoutProperties(_props, ['onChange', 'columns', 'data', 'i18n']);
	
	      return _react2.default.createElement(
	        'span',
	        props,
	        _react2.default.createElement(SearchOptions, {
	          onChange: this.onColumnChange, value: this.state.column,
	          columns: columns, i18n: i18n
	        }),
	        _react2.default.createElement('input', { onChange: this.onQueryChange, value: this.state.query })
	      );
	    }
	  }, {
	    key: 'onColumnChange',
	    value: function onColumnChange(event) {
	      var column = event.target.value;
	      var query = this.state.query;
	
	      this.setState({ column: column });
	      this.props.onChange(_defineProperty({}, column, query));
	    }
	  }, {
	    key: 'onQueryChange',
	    value: function onQueryChange(event) {
	      var column = this.state.column;
	      var query = event.target.value;
	
	      this.setState({ query: query });
	      this.props.onChange(_defineProperty({}, column, query));
	    }
	  }]);
	
	  return Search;
	}(_react2.default.Component);
	
	Search.propTypes = {
	  columns: _react2.default.PropTypes.array,
	  data: _react2.default.PropTypes.array,
	  onChange: _react2.default.PropTypes.func,
	  i18n: _react2.default.PropTypes.shape({
	    all: _react2.default.PropTypes.string
	  })
	};
	Search.defaultProps = {
	  columns: [],
	  data: [],
	  onChange: function onChange() {},
	  i18n: {
	    all: 'All'
	  }
	};
	
	var SearchOptions = function SearchOptions(_ref) {
	  var columns = _ref.columns;
	  var i18n = _ref.i18n;
	
	  var props = _objectWithoutProperties(_ref, ['columns', 'i18n']);
	
	  return _react2.default.createElement(
	    'select',
	    props,
	    getOptions(columns, i18n).map(function (_ref2) {
	      var name = _ref2.name;
	      var value = _ref2.value;
	      return _react2.default.createElement(
	        'option',
	        { key: value + '-option', value: value },
	        name
	      );
	    })
	  );
	};
	SearchOptions.propTypes = {
	  columns: _react2.default.PropTypes.array,
	  i18n: _react2.default.PropTypes.object
	};
	
	var getOptions = function getOptions(columns, i18n) {
	  return [{
	    value: 'all',
	    name: i18n.all
	  }].concat(columns.map(function (column) {
	    if (column.property && column.header) {
	      return {
	        value: column.property,
	        name: column.header
	      };
	    }
	
	    return null;
	  }).filter(function (column) {
	    return column && !_react2.default.isValidElement(column.name);
	  }));
	};
	
	var searchColumn = function searchColumn(data, columns, column, query) {
	  var options = arguments.length <= 4 || arguments[4] === undefined ? {
	    strategy: _predicates2.default.infix,
	    transform: _formatters2.default.lowercase
	  } : arguments[4];
	
	  if (!query) {
	    return data;
	  }
	  var ret = columns;
	
	  if (column !== 'all') {
	    ret = columns.filter(function (col) {
	      return col.property === column;
	    });
	  }
	
	  return data.filter(function (row) {
	    return ret.filter(isColumnVisible.bind(undefined, options, query, row)).length > 0;
	  });
	};
	
	var isColumnVisible = function isColumnVisible(options, query, row, col) {
	  var property = col.property;
	  var value = row[property];
	  var formatter = col.search || _formatters2.default.identity;
	  var formattedValue = formatter(value);
	
	  if (!formattedValue && isNaN(formattedValue)) {
	    return false;
	  }
	
	  if ((0, _isNumber2.default)(formattedValue)) {
	    formattedValue = formattedValue.toString();
	  } else if (!(0, _isString2.default)(formattedValue)) {
	    formattedValue = '';
	  }
	
	  return options.strategy(options.transform(query)).evaluate(options.transform(formattedValue));
	};
	
	var search = function search(data, columns, query, options) {
	  if (!query) {
	    return data;
	  }
	
	  return Object.keys(query).reduce(function (filteredData, column) {
	    return searchColumn(filteredData, columns, column, query[column], options);
	  }, data);
	};
	
	var matches = function matches(column, value, query) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {
	    strategy: _predicates2.default.infix,
	    transform: _formatters2.default.lowercase
	  } : arguments[3];
	
	  if (!query) {
	    return {};
	  }
	
	  return options.strategy(options.transform(query)).matches(options.transform(value));
	};
	
	Search.searchColumn = searchColumn;
	Search.search = search;
	Search.matches = matches;
	
	exports.default = Search;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
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
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(9),
	    isObjectLike = __webpack_require__(7);
	
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* eslint-disable global-require */
	module.exports = {
	  highlight: __webpack_require__(11).default,
	  identity: __webpack_require__(12).default,
	  lowercase: __webpack_require__(13).default
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (getHighlights) {
	  return function (value) {
	    var val = String(value); // deals with arrays/numbers/...
	
	    var highlights = getHighlights(val);
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
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (value) {
	  return value;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (value) {
	  return value.toLowerCase();
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _infix = __webpack_require__(15);
	
	var _infix2 = _interopRequireDefault(_infix);
	
	var _prefix = __webpack_require__(16);
	
	var _prefix2 = _interopRequireDefault(_prefix);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { infix: _infix2.default, prefix: _prefix2.default };

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (infix) {
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
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (prefix) {
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
	      }
	
	      return [];
	    }
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _byColumn = __webpack_require__(18);
	
	var _byColumn2 = _interopRequireDefault(_byColumn);
	
	var _byColumns = __webpack_require__(19);
	
	var _byColumns2 = _interopRequireDefault(_byColumns);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { byColumn: _byColumn2.default, byColumns: _byColumns2.default };

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var byColumn = function byColumn(sortingColumns, selectedColumn) {
	  var sortingColumn = sortingColumns ? sortingColumns[0] : {};
	  var sort = 'asc';
	
	  if (sortingColumn.property === selectedColumn) {
	    sort = sortingColumn.sort === 'asc' ? 'desc' : 'asc';
	  }
	
	  return [{
	    property: selectedColumn,
	    sort: sort
	  }];
	};
	
	// sorter === lodash orderBy
	// https://lodash.com/docs#orderBy
	byColumn.sort = function (data, columns, sorter) {
	  if (!columns) {
	    return data;
	  }
	  var column = columns[0]; // Sort based on the first one
	
	  return sorter(data, [column.property], [column.sort]);
	};
	
	exports.default = byColumn;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var byColumns = function byColumns(sortingColumns, selectedColumn) {
	  var index = sortingColumns && sortingColumns.map(function (c) {
	    return c.property;
	  }).indexOf(selectedColumn);
	  var newSortingColumns = [];
	
	  if (!sortingColumns) {
	    return [{
	      property: selectedColumn,
	      sort: 'asc'
	    }];
	  } else if (index >= 0) {
	    newSortingColumns = sortingColumns;
	
	    newSortingColumns[index] = {
	      property: selectedColumn,
	      sort: cycleSort(newSortingColumns[index].sort)
	    };
	
	    return newSortingColumns;
	  }
	
	  return [].concat(_toConsumableArray(sortingColumns), [{
	    property: selectedColumn,
	    sort: 'asc'
	  }]);
	};
	
	function cycleSort(sort) {
	  if (!sort) {
	    return 'asc';
	  } else if (sort === 'asc') {
	    return 'desc';
	  }
	
	  return '';
	}
	
	// sorter === lodash orderBy
	// https://lodash.com/docs#orderBy
	byColumns.sort = function (data, columns, sorter) {
	  if (!columns) {
	    return data;
	  }
	
	  var propertyList = [];
	  var orderList = [];
	
	  columns.forEach(function (column) {
	    propertyList.push(column.property);
	    orderList.push(column.sort);
	  });
	
	  return sorter(data, propertyList, orderList);
	};
	
	exports.default = byColumns;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _boolean = __webpack_require__(21);
	
	var _boolean2 = _interopRequireDefault(_boolean);
	
	var _dropdown = __webpack_require__(22);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	var _input = __webpack_require__(23);
	
	var _input2 = _interopRequireDefault(_input);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { boolean: _boolean2.default, dropdown: _dropdown2.default, input: _input2.default };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  var Boolean = function Boolean(_ref) {
	    var value = _ref.value;
	    var onValue = _ref.onValue;
	    return _react2.default.createElement(
	      'span',
	      null,
	      _react2.default.createElement(
	        'button',
	        {
	          disabled: value,
	          onClick: function onClick() {
	            return onValue(true);
	          }
	        },
	        '✓'
	      ),
	      _react2.default.createElement(
	        'button',
	        {
	          disabled: !value,
	          onClick: function onClick() {
	            return onValue(false);
	          }
	        },
	        '✗'
	      )
	    );
	  };
	  Boolean.propTypes = {
	    value: _react2.default.PropTypes.any,
	    onClick: _react2.default.PropTypes.func,
	    onValue: _react2.default.PropTypes.func
	  };
	
	  return Boolean;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (options) {
	  var fields = arguments.length <= 1 || arguments[1] === undefined ? {
	    name: 'name',
	    value: 'value'
	  } : arguments[1];
	
	  var Dropdown = function Dropdown(_ref) {
	    var value = _ref.value;
	    var onValue = _ref.onValue;
	
	    var edit = function edit(e) {
	      return onValue(e.target.value);
	    };
	
	    return _react2.default.createElement(
	      'select',
	      { onBlur: edit, onChange: edit, value: value },
	      options.map(function (option, i) {
	        return _react2.default.createElement(
	          'option',
	          {
	            key: i,
	            value: option[fields.value]
	          },
	          option[fields.name]
	        );
	      })
	    );
	  };
	  Dropdown.propTypes = {
	    value: _react2.default.PropTypes.string,
	    onValue: _react2.default.PropTypes.func
	  };
	
	  return Dropdown;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	exports.default = function () {
	  var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var Input = function (_React$Component) {
	    _inherits(Input, _React$Component);
	
	    function Input(props) {
	      _classCallCheck(this, Input);
	
	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));
	
	      _this.state = {
	        value: props.value
	      };
	
	      _this.onFocus = _this.onFocus.bind(_this);
	      _this.onChange = _this.onChange.bind(_this);
	      _this.onKeyUp = _this.onKeyUp.bind(_this);
	      _this.done = _this.done.bind(_this);
	      return _this;
	    }
	
	    _createClass(Input, [{
	      key: "render",
	      value: function render() {
	        return _react2.default.createElement("input", _extends({
	          ref: "input",
	          value: this.state.value,
	          onFocus: this.onFocus,
	          onChange: this.onChange,
	          onKeyUp: this.onKeyUp,
	          onBlur: this.done
	        }, attrs));
	      }
	    }, {
	      key: "onFocus",
	      value: function onFocus(_ref) {
	        var target = _ref.target;
	
	        var length = target.value.length;
	
	        target.selectionStart = length; // eslint-disable-line no-param-reassign
	        target.selectionEnd = length; // eslint-disable-line no-param-reassign
	      }
	    }, {
	      key: "onChange",
	      value: function onChange(_ref2) {
	        var value = _ref2.target.value;
	
	        this.setState({ value: value });
	      }
	    }, {
	      key: "onKeyUp",
	      value: function onKeyUp(_ref3) {
	        var keyCode = _ref3.keyCode;
	
	        if (keyCode === 13) {
	          this.done();
	        }
	      }
	    }, {
	      key: "done",
	      value: function done() {
	        this.props.onValue(this.refs.input.value);
	      }
	    }]);
	
	    return Input;
	  }(_react2.default.Component);
	
	  Input.propTypes = {
	    value: _react2.default.PropTypes.string,
	    onValue: _react2.default.PropTypes.func
	  };
	
	  return Input;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _identity = __webpack_require__(25);
	
	var _identity2 = _interopRequireDefault(_identity);
	
	var _edit = __webpack_require__(26);
	
	var _edit2 = _interopRequireDefault(_edit);
	
	var _sort = __webpack_require__(27);
	
	var _sort2 = _interopRequireDefault(_sort);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { identity: _identity2.default, edit: _edit2.default, sort: _sort2.default };

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (value) {
	  return { value: value };
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _default(_ref, _ref2) {
	  var _ref$getEditProperty = _ref.getEditProperty;
	  var getEditProperty = _ref$getEditProperty === undefined ? function () {} : _ref$getEditProperty;
	  var _ref$onActivate = _ref.onActivate;
	  var onActivate = _ref$onActivate === undefined ? function () {} : _ref$onActivate;
	  var _ref$onValue = _ref.onValue;
	
	  var _onValue = _ref$onValue === undefined ? function () {} : _ref$onValue;
	
	  var editor = _ref2.editor;
	  var _ref2$formatter = _ref2.formatter;
	  var formatter = _ref2$formatter === undefined ? function (value) {
	    return value;
	  } : _ref2$formatter;
	
	  var Edit = function Edit(_ref3) {
	    var value = _ref3.value;
	    var cellData = _ref3.cellData;
	    var property = _ref3.property;
	    var cellKey = _ref3.cellKey;
	
	    var idx = cellKey + '-' + property;
	    var editedCell = getEditProperty();
	
	    if (editedCell === idx) {
	      return _react2.default.createElement(editor, {
	        value: value,
	        onValue: function onValue(v) {
	          return _onValue(v, cellData, property);
	        }
	      });
	    }
	
	    return _react2.default.createElement(
	      'span',
	      { onClick: function onClick() {
	          return onActivate(idx);
	        } },
	      formatter(value)
	    );
	  };
	  Edit.propTypes = {
	    value: _react2.default.PropTypes.any,
	    cellData: _react2.default.PropTypes.object.isRequired,
	    property: _react2.default.PropTypes.string.isRequired,
	    cellKey: _react2.default.PropTypes.string.isRequired
	  };
	
	  return Edit;
	}
	exports.default = _default;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref, header) {
	  var _ref$getSortingColumn = _ref.getSortingColumns;
	  var getSortingColumns = _ref$getSortingColumn === undefined ? function () {} : _ref$getSortingColumn;
	  var _ref$onSort = _ref.onSort;
	  var onSort = _ref$onSort === undefined ? function () {} : _ref$onSort;
	
	  var Sort = function Sort(_ref2) {
	    var property = _ref2.property;
	
	    var columns = getSortingColumns();
	    var index = columns.map(function (c) {
	      return c.property;
	    }).indexOf(property);
	    var headerClass = '';
	
	    if (index >= 0) {
	      headerClass = 'sort-' + columns[index].sort;
	    }
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: headerClass,
	        onClick: function onClick() {
	          return onSort(property);
	        }
	      },
	      header
	    );
	  };
	  Sort.propTypes = {
	    property: _react2.default.PropTypes.string.isRequired
	  };
	
	  return Sort;
	};
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map