(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("react"));
	else
		root["Reactabular"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__) {
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
	
	var _search = __webpack_require__(63);
	
	Object.defineProperty(exports, 'search', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_search).default;
	  }
	});
	
	var _sort = __webpack_require__(64);
	
	Object.defineProperty(exports, 'sort', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sort).default;
	  }
	});
	
	var _editors = __webpack_require__(65);
	
	Object.defineProperty(exports, 'editors', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_editors).default;
	  }
	});
	
	var _formatters = __webpack_require__(66);
	
	Object.defineProperty(exports, 'formatters', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_formatters).default;
	  }
	});
	
	var _transforms = __webpack_require__(67);
	
	Object.defineProperty(exports, 'transforms', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_transforms).default;
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
	
	var _get = __webpack_require__(2);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _has = __webpack_require__(50);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _react = __webpack_require__(62);
	
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
	        data: this.props.data,
	        rowKey: this.props.rowKey
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
	  columns: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    header: _react2.default.PropTypes.shape({
	      label: _react2.default.PropTypes.string,
	      transform: _react2.default.PropTypes.func,
	      format: _react2.default.PropTypes.func,
	      props: _react2.default.PropTypes.object
	    }),
	    cell: _react2.default.PropTypes.shape({
	      property: _react2.default.PropTypes.string,
	      transform: _react2.default.PropTypes.func,
	      format: _react2.default.PropTypes.func,
	      resolve: _react2.default.PropTypes.func,
	      props: _react2.default.PropTypes.object
	    })
	  })).isRequired,
	  data: _react2.default.PropTypes.array.isRequired,
	  rowKey: _react2.default.PropTypes.string.isRequired,
	  children: _react2.default.PropTypes.any
	};
	Table.childContextTypes = {
	  columns: _react2.default.PropTypes.array,
	  data: _react2.default.PropTypes.array,
	  rowKey: _react2.default.PropTypes.string.isRequired
	};
	
	var Header = function Header(_ref, _ref2) {
	  var children = _ref.children;
	  var className = _ref.className;
	
	  var props = _objectWithoutProperties(_ref, ['children', 'className']);
	
	  var columns = _ref2.columns;
	  return _react2.default.createElement(
	    'thead',
	    props,
	    _react2.default.createElement(
	      'tr',
	      null,
	      columns.map(function (column, i) {
	        var _ref3 = // eslint-disable-line no-shadow
	        column.header || {};
	
	        var label = _ref3.label;
	        var _ref3$transform = _ref3.transform;
	        var transform = _ref3$transform === undefined ? function (a) {
	          return {};
	        } : _ref3$transform;
	        var _ref3$format = _ref3.format;
	        var // eslint-disable-line no-unused-vars
	        format = _ref3$format === undefined ? function (a) {
	          return a;
	        } : _ref3$format;
	        var props = _ref3.props;
	
	        var extraParameters = { cellData: label };
	        var key = i + '-header';
	        var transformed = transform(label, extraParameters);
	
	        if (!transformed) {
	          console.warn('Table.Header - Failed to receive a transformed result', transformed); // eslint-disable-line max-len, no-console
	        }
	
	        var mergedClassName = mergeClassNames(className, transformed && transformed.className);
	
	        return _react2.default.createElement(
	          'th',
	          _extends({
	            key: key
	          }, _extends({}, props, transformed, { className: mergedClassName })),
	          transformed.children || format(label, extraParameters)
	        );
	      })
	    ),
	    children
	  );
	};
	Header.propTypes = {
	  children: _react2.default.PropTypes.any,
	  className: _react2.default.PropTypes.string
	};
	Header.contextTypes = {
	  columns: _react2.default.PropTypes.array.isRequired
	};
	Header.displayName = 'Table.Header';
	
	var Body = function Body(_ref4, _ref5) {
	  var row = _ref4.row;
	  var className = _ref4.className;
	
	  var props = _objectWithoutProperties(_ref4, ['row', 'className']);
	
	  var columns = _ref5.columns;
	  var data = _ref5.data;
	  var rowKey = _ref5.rowKey;
	  return _react2.default.createElement(
	    'tbody',
	    props,
	    data.map(function (r, i) {
	      return _react2.default.createElement(
	        'tr',
	        _extends({ key: (r[rowKey] || i) + '-row' }, row(r, i)),
	        columns.map(function (column, j) {
	          var _column$cell = // eslint-disable-line no-shadow
	          column.cell;
	          var property = _column$cell.property;
	          var _column$cell$transfor = _column$cell.transform;
	          var transform = _column$cell$transfor === undefined ? function (a) {
	            return {};
	          } : _column$cell$transfor;
	          var _column$cell$format = _column$cell.format;
	          var // eslint-disable-line no-unused-vars
	          format = _column$cell$format === undefined ? function (a) {
	            return a;
	          } : _column$cell$format;
	          var _column$cell$resolve = _column$cell.resolve;
	          var resolve = _column$cell$resolve === undefined ? function (a) {
	            return a;
	          } : _column$cell$resolve;
	          var props = _column$cell.props;
	
	          if (property && !(0, _has2.default)(r, property)) {
	            console.warn('Table.Body - Failed to find "' + property + '" property from', r); // eslint-disable-line max-len, no-console
	          }
	
	          var extraParameters = { cellData: data[i], property: property };
	          var value = (0, _get2.default)(r, property);
	          var resolvedValue = resolve(value, extraParameters);
	          var transformed = transform(value, extraParameters);
	
	          if (!transformed) {
	            console.warn('Table.Body - Failed to receive a transformed result', transformed); // eslint-disable-line max-len, no-console
	          }
	
	          var mergedClassName = mergeClassNames(className, transformed && transformed.className);
	
	          return _react2.default.createElement(
	            'td',
	            _extends({
	              key: j + '-cell'
	            }, _extends({}, props, transformed, { className: mergedClassName })),
	            transformed.children || format(resolvedValue, extraParameters)
	          );
	        })
	      );
	    })
	  );
	};
	Body.propTypes = {
	  row: _react2.default.PropTypes.func,
	  className: _react2.default.PropTypes.string
	};
	Body.defaultProps = {
	  row: function row() {}
	};
	Body.contextTypes = {
	  columns: _react2.default.PropTypes.array.isRequired,
	  data: _react2.default.PropTypes.array.isRequired,
	  rowKey: _react2.default.PropTypes.string.isRequired
	};
	Body.displayName = 'Table.Body';
	
	function mergeClassNames(a, b) {
	  if (a && b) {
	    return a + ' ' + b;
	  }
	
	  // Either a or b at this point
	  return (a || '') + (b || '');
	}
	
	Table.Header = Header;
	Table.Body = Body;
	
	exports.default = Table;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(3);
	
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(4),
	    isKey = __webpack_require__(48),
	    toKey = __webpack_require__(49);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5),
	    stringToPath = __webpack_require__(6);
	
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(7),
	    toString = __webpack_require__(43);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(8);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(9),
	    mapCacheDelete = __webpack_require__(37),
	    mapCacheGet = __webpack_require__(40),
	    mapCacheHas = __webpack_require__(41),
	    mapCacheSet = __webpack_require__(42);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(10),
	    ListCache = __webpack_require__(28),
	    Map = __webpack_require__(36);
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(11),
	    hashDelete = __webpack_require__(24),
	    hashGet = __webpack_require__(25),
	    hashHas = __webpack_require__(26),
	    hashSet = __webpack_require__(27);
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(14),
	    getValue = __webpack_require__(23);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(15),
	    isHostObject = __webpack_require__(17),
	    isMasked = __webpack_require__(18),
	    isObject = __webpack_require__(16),
	    toSource = __webpack_require__(22);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(19);
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(20);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(21);
	
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(12);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(29),
	    listCacheDelete = __webpack_require__(30),
	    listCacheGet = __webpack_require__(33),
	    listCacheHas = __webpack_require__(34),
	    listCacheSet = __webpack_require__(35);
	
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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(32);
	
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);
	
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13),
	    root = __webpack_require__(20);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(39);
	
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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);
	
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(38);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(44);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(45),
	    isSymbol = __webpack_require__(46);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(20);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(47);
	
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
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5),
	    isSymbol = __webpack_require__(46);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(46);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(51),
	    hasPath = __webpack_require__(53);
	
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(52);
	
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
/* 52 */
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(4),
	    isArguments = __webpack_require__(54),
	    isArray = __webpack_require__(5),
	    isIndex = __webpack_require__(60),
	    isKey = __webpack_require__(48),
	    isLength = __webpack_require__(59),
	    isString = __webpack_require__(61),
	    toKey = __webpack_require__(49);
	
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(55);
	
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(56),
	    isObjectLike = __webpack_require__(47);
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(57),
	    isFunction = __webpack_require__(15),
	    isLength = __webpack_require__(59);
	
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(58);
	
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5),
	    isObjectLike = __webpack_require__(47);
	
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
/* 62 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get = __webpack_require__(2);
	
	var _get2 = _interopRequireDefault(_get);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var multipleColumns = function multipleColumns(_ref) {
	  var data = _ref.data;
	  var columns = _ref.columns;
	  var query = _ref.query;
	  var strategy = _ref.strategy;
	  var transform = _ref.transform;
	
	  if (!query) {
	    return data;
	  }
	
	  return Object.keys(query).reduce(function (filteredData, searchColumn) {
	    return singleColumn({
	      data: filteredData,
	      columns: columns,
	      searchColumn: searchColumn,
	      query: query[searchColumn],
	      strategy: strategy,
	      transform: transform
	    });
	  }, data);
	};
	
	var singleColumn = function singleColumn(_ref2) {
	  var data = _ref2.data;
	  var columns = _ref2.columns;
	  var _ref2$searchColumn = _ref2.searchColumn;
	  var searchColumn = _ref2$searchColumn === undefined ? 'all' : _ref2$searchColumn;
	  var query = _ref2.query;
	  var strategy = _ref2.strategy;
	  var transform = _ref2.transform;
	
	  if (!query) {
	    return data;
	  }
	
	  var ret = columns;
	
	  if (searchColumn !== 'all') {
	    ret = columns.filter(function (col) {
	      return col.cell && col.cell.property === searchColumn;
	    });
	  }
	
	  return data.filter(function (row) {
	    return ret.filter(function (column) {
	      return _columnMatches({
	        query: query, column: column, strategy: strategy, transform: transform, row: row
	      });
	    }).length > 0;
	  });
	};
	
	var _columnMatches = function _columnMatches(_ref3) {
	  var // eslint-disable-line no-underscore-dangle
	  query = _ref3.query;
	  var _ref3$column = _ref3.column;
	  var column = _ref3$column === undefined ? { cell: {} } : _ref3$column;
	  var row = _ref3.row;
	  var _ref3$strategy = _ref3.strategy;
	  var strategy = _ref3$strategy === undefined ? strategies.infix : _ref3$strategy;
	  var _ref3$transform = _ref3.transform;
	  var transform = _ref3$transform === undefined ? function (v) {
	    return v.toLowerCase();
	  } : _ref3$transform;
	
	  var property = column.cell.property;
	  var value = (0, _get2.default)(row, property);
	  var formatter = column.cell.resolve || function (a) {
	    return a;
	  };
	  var formattedValue = formatter(value);
	
	  if (typeof formattedValue === 'undefined') {
	    formattedValue = '';
	  }
	
	  formattedValue = formattedValue.toString ? formattedValue.toString() : '';
	
	  return strategy(transform(query)).evaluate(transform(formattedValue));
	};
	
	var matches = function matches() {
	  var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var value = _ref4.value;
	  var query = _ref4.query;
	  var _ref4$strategy = _ref4.strategy;
	  var strategy = _ref4$strategy === undefined ? strategies.infix : _ref4$strategy;
	  var _ref4$transform = _ref4.transform;
	  var transform = _ref4$transform === undefined ? function (v) {
	    return v.toLowerCase();
	  } : _ref4$transform;
	
	  if (!query) {
	    return {};
	  }
	
	  return strategy(transform(query)).matches(transform(value));
	};
	
	var infix = function infix(queryTerm) {
	  return {
	    evaluate: function evaluate(searchText) {
	      return searchText.indexOf(queryTerm) !== -1;
	    },
	    matches: function matches(searchText) {
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
	    evaluate: function evaluate(searchText) {
	      return searchText.indexOf(queryTerm) === 0;
	    },
	    matches: function matches(searchText) {
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
	
	var strategies = {
	  infix: infix,
	  prefix: prefix
	};
	
	exports.default = {
	  multipleColumns: multipleColumns,
	  singleColumn: singleColumn,
	  _columnMatches: _columnMatches,
	  matches: matches,
	  strategies: strategies
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get = __webpack_require__(2);
	
	var _get2 = _interopRequireDefault(_get);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var byColumn = function byColumn(_ref) {
	  var sortingColumns = _ref.sortingColumns;
	  var selectedColumn = _ref.selectedColumn;
	
	  var sortingColumn = sortingColumns && sortingColumns.length ? sortingColumns[0] : {};
	  var sort = 'asc';
	
	  if (sortingColumn.property === selectedColumn) {
	    sort = cycleSort(sortingColumn.sort);
	
	    if (!sort) {
	      return [];
	    }
	  }
	
	  return [{
	    property: selectedColumn,
	    sort: sort
	  }];
	};
	
	var byColumns = function byColumns(_ref2) {
	  var sortingColumns = _ref2.sortingColumns;
	  var selectedColumn = _ref2.selectedColumn;
	
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
	
	    var newSort = cycleSort(newSortingColumns[index].sort);
	
	    if (newSort) {
	      newSortingColumns[index] = {
	        property: selectedColumn,
	        sort: newSort
	      };
	    } else {
	      newSortingColumns.splice(index, 1);
	    }
	
	    return newSortingColumns;
	  }
	
	  return [].concat(_toConsumableArray(sortingColumns), [{
	    property: selectedColumn,
	    sort: 'asc'
	  }]);
	};
	
	function cycleSort(sort) {
	  return sort === 'asc' && 'desc';
	}
	
	// sorter === lodash orderBy
	// https://lodash.com/docs#orderBy
	var sorter = function sorter(_ref3) {
	  var data = _ref3.data;
	  var sortingColumns = _ref3.sortingColumns;
	  var sort = _ref3.sort;
	
	  if (!sortingColumns) {
	    return data;
	  }
	
	  var propertyList = [];
	  var orderList = [];
	
	  sortingColumns.forEach(function (column) {
	    propertyList.push(function (row) {
	      var value = (0, _get2.default)(row, column.property);
	
	      if (value.toLowerCase) {
	        return value.toLowerCase();
	      }
	
	      return value;
	    });
	    orderList.push(column.sort);
	  });
	
	  return sort(data, propertyList, orderList);
	};
	
	exports.default = {
	  byColumn: byColumn,
	  byColumns: byColumns,
	  sorter: sorter
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-shadow */
	
	
	var _react = __webpack_require__(62);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var boolean = function boolean() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var props = _ref.props;
	
	  var Boolean = function Boolean(_ref2) {
	    var value = _ref2.value;
	    var onValue = _ref2.onValue;
	    return _react2.default.createElement(
	      'div',
	      props,
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
	
	var dropdown = function dropdown(_ref3) {
	  var options = _ref3.options;
	  var _ref3$fields = _ref3.fields;
	  var fields = _ref3$fields === undefined ? {
	    name: 'name',
	    value: 'value'
	  } : _ref3$fields;
	  var props = _ref3.props;
	
	  var Dropdown = function Dropdown(_ref4) {
	    var value = _ref4.value;
	    var onValue = _ref4.onValue;
	
	    var edit = function edit(_ref5) {
	      var value = _ref5.target.value;
	      return onValue(value);
	    }; // eslint-disable-line max-len, no-shadow, react/prop-types
	
	    return _react2.default.createElement(
	      'select',
	      _extends({ onBlur: edit, onChange: edit, value: value }, props),
	      options.map(function (option, i) {
	        return _react2.default.createElement(
	          'option',
	          { key: i, value: option[fields.value] },
	          option[fields.name]
	        );
	      })
	    );
	  };
	  Dropdown.propTypes = {
	    value: _react2.default.PropTypes.string.isRequired,
	    onValue: _react2.default.PropTypes.func.isRequired
	  };
	
	  return Dropdown;
	};
	
	var input = function input() {
	  var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var props = _ref6.props;
	
	  var Input = function Input(_ref7) {
	    var value = _ref7.value;
	    var onValue = _ref7.onValue;
	
	    var onKeyUp = function onKeyUp(_ref8) {
	      var key = _ref8.key;
	      var value = _ref8.target.value;
	      return key === 'Enter' && onValue(value);
	    };
	    var onBlur = function onBlur(_ref9) {
	      var target = _ref9.target;
	      return onValue(target.value);
	    }; // eslint-disable-line react/prop-types
	
	    return _react2.default.createElement('input', _extends({ defaultValue: value, onKeyUp: onKeyUp, onBlur: onBlur }, props));
	  };
	  Input.propTypes = {
	    value: _react2.default.PropTypes.string,
	    onValue: _react2.default.PropTypes.func
	  };
	
	  return Input;
	};
	
	exports.default = {
	  boolean: boolean,
	  dropdown: dropdown,
	  input: input
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(62);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var highlight = function highlight(getHighlights) {
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
	
	exports.default = {
	  highlight: highlight
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(62);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var edit = function edit(_ref) {
	  var _ref$getEditId = _ref.getEditId;
	  var getEditId = _ref$getEditId === undefined ? function () {} : _ref$getEditId;
	  var _ref$getEditProperty = _ref.getEditProperty;
	  var getEditProperty = _ref$getEditProperty === undefined ? function () {} : _ref$getEditProperty;
	  var _ref$onActivate = _ref.onActivate;
	  var onActivate = _ref$onActivate === undefined ? function () {} : _ref$onActivate;
	  var _ref$onValue = _ref.onValue;
	
	  var _onValue = _ref$onValue === undefined ? function () {} : _ref$onValue;
	
	  return function (editor) {
	    var Edit = function Edit(value, extraParameters) {
	      var idx = getEditId(extraParameters);
	      var editedCell = getEditProperty();
	
	      if (editedCell === idx) {
	        return {
	          children: _react2.default.createElement(editor, {
	            value: value,
	            onValue: function onValue(v) {
	              return _onValue(_extends({ value: v }, extraParameters));
	            }
	          })
	        };
	      }
	
	      return {
	        onClick: function onClick() {
	          return onActivate(idx);
	        }
	      };
	    };
	    Edit.propTypes = {
	      value: _react2.default.PropTypes.any,
	      extraParameters: _react2.default.PropTypes.shape({
	        cellData: _react2.default.PropTypes.object.isRequired,
	        property: _react2.default.PropTypes.string.isRequired
	      })
	    };
	
	    return Edit;
	  };
	};
	
	var sort = function sort(_ref2) {
	  var _ref2$getSortingColum = _ref2.getSortingColumns;
	  var getSortingColumns = _ref2$getSortingColum === undefined ? function () {
	    return [];
	  } : _ref2$getSortingColum;
	  var _ref2$onSort = _ref2.onSort;
	  var onSort = _ref2$onSort === undefined ? function () {} : _ref2$onSort;
	  return function (property) {
	    var Sort = function Sort() {
	      var columns = getSortingColumns();
	      var index = columns.map(function (c) {
	        return c.property;
	      }).indexOf(property);
	      var headerClass = '';
	
	      if (index >= 0) {
	        headerClass = 'sort-' + columns[index].sort;
	      }
	
	      return {
	        className: headerClass,
	        onClick: function onClick() {
	          return onSort(property);
	        }
	      };
	    };
	    Sort.propTypes = {
	      property: _react2.default.PropTypes.string.isRequired
	    };
	
	    return Sort;
	  };
	};
	
	exports.default = {
	  edit: edit,
	  sort: sort
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map