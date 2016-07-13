(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("react"));
	else
		root["Reactabular"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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
	
	var _search = __webpack_require__(86);
	
	Object.defineProperty(exports, 'search', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_search).default;
	  }
	});
	
	var _sort = __webpack_require__(87);
	
	Object.defineProperty(exports, 'sort', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sort).default;
	  }
	});
	
	var _editors = __webpack_require__(88);
	
	Object.defineProperty(exports, 'editors', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_editors).default;
	  }
	});
	
	var _transforms = __webpack_require__(89);
	
	Object.defineProperty(exports, 'transforms', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_transforms).default;
	  }
	});
	
	var _highlight = __webpack_require__(90);
	
	Object.defineProperty(exports, 'highlight', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_highlight).default;
	  }
	});
	
	var _resolve = __webpack_require__(91);
	
	Object.defineProperty(exports, 'resolve', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_resolve).default;
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
	
	var _provider = __webpack_require__(2);
	
	var _provider2 = _interopRequireDefault(_provider);
	
	var _header = __webpack_require__(6);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _body = __webpack_require__(7);
	
	var _body2 = _interopRequireDefault(_body);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  Provider: _provider2.default,
	  Header: _header2.default,
	  Body: _body2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _types = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var componentDefaults = _types.tableDefaults.components;
	
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
	      var data = _props.data;
	      var rowKey = _props.rowKey;
	
	      var headerColumns = [];
	      var bodyColumns = [];
	
	      // Merge column props with header/body specific ones so that can be avoided later
	      columns.forEach(function (column) {
	        headerColumns.push(column.header ? {
	          props: (0, _utils.mergePropPair)(column.props, column.header.props),
	          header: column.header,
	          children: column.children || [], // TODO: test for this case
	          column: column
	        } : {});
	
	        var cell = column.cell || {};
	
	        bodyColumns.push({
	          props: (0, _utils.mergePropPair)(column.props, cell.props),
	          cell: cell,
	          children: column.children || [], // TODO: test for this case
	          column: column
	        });
	      });
	
	      return {
	        headerColumns: headerColumns,
	        bodyColumns: bodyColumns,
	        components: {
	          table: components.table || componentDefaults.table,
	          header: _extends({}, componentDefaults.header, components.header),
	          body: _extends({}, componentDefaults.body, components.body)
	        },
	        data: data,
	        rowKey: rowKey
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var columns = _props2.columns;
	      var // eslint-disable-line no-unused-vars
	      data = _props2.data;
	      var // eslint-disable-line no-unused-vars
	      rowKey = _props2.rowKey;
	      var // eslint-disable-line no-unused-vars
	      components = _props2.components;
	      var children = _props2.children;
	
	      var props = _objectWithoutProperties(_props2, ['columns', 'data', 'rowKey', 'components', 'children']);
	
	      return _react2.default.createElement(components.table || _types.tableDefaults.components.table, props, children);
	    }
	  }]);
	
	  return Provider;
	}(_react2.default.Component);
	
	exports.default = Provider;
	
	Provider.propTypes = _extends({}, _types.tableTypes, {
	  children: _react2.default.PropTypes.any
	});
	Provider.defaultProps = _extends({}, _types.tableDefaults);
	Provider.childContextTypes = _types.tableContextTypes;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tableDefaults = exports.tableHeaderContextTypes = exports.tableBodyContextTypes = exports.tableContextTypes = exports.tableTypes = undefined;
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayOfObjectColumns = _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	  header: _react2.default.PropTypes.shape({
	    label: _react2.default.PropTypes.string,
	    transforms: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
	    format: _react2.default.PropTypes.func,
	    component: _react2.default.PropTypes.any, // XXX: too loose? createElement first param
	    props: _react2.default.PropTypes.object
	  }),
	  cell: _react2.default.PropTypes.shape({
	    property: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
	    transforms: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
	    format: _react2.default.PropTypes.func,
	    resolve: _react2.default.PropTypes.func,
	    component: _react2.default.PropTypes.any, // XXX: too loose? createElement first param
	    props: _react2.default.PropTypes.object
	  })
	}));
	var arrayOfArrayColumns = _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.array);
	var rowKeyType = function rowKeyType(props, propName, componentName) {
	  if (props.data && props.data.length && !arrayOfObjectColumns(props, 'data', componentName)) {
	    return _react2.default.PropTypes.string.isRequired(props, propName, componentName);
	  }
	
	  // `columns` should be an array of arrays. If it's not, then that propType will
	  // fail even if this doesn't.
	  return null;
	};
	var dataType = _react2.default.PropTypes.oneOfType([arrayOfObjectColumns, arrayOfArrayColumns]);
	var tableTypes = {
	  columns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object,
	  data: dataType.isRequired,
	  rowKey: rowKeyType
	};
	var tableContextTypes = {
	  headerColumns: _react2.default.PropTypes.array.isRequired,
	  bodyColumns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object,
	  data: dataType.isRequired,
	  rowKey: rowKeyType
	};
	var tableBodyContextTypes = {
	  bodyColumns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object,
	  data: dataType.isRequired,
	  rowKey: rowKeyType
	};
	var tableHeaderContextTypes = {
	  headerColumns: _react2.default.PropTypes.array.isRequired,
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
	exports.tableBodyContextTypes = tableBodyContextTypes;
	exports.tableHeaderContextTypes = tableHeaderContextTypes;
	exports.tableDefaults = tableDefaults;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
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
	        rowSpan: countRowSpan(columns)
	      })
	    });
	  });
	
	  if (resolvedChildren.length) {
	    return [ret].concat([resolvedChildren]);
	  }
	
	  return [ret];
	}
	
	function countRowSpan(columns) {
	  var maximumCount = 0;
	
	  columns.forEach(function (column) {
	    if (column.children && column.children.length) {
	      maximumCount = Math.max(maximumCount, countRowSpan(column.children));
	    }
	  });
	
	  return maximumCount + 1;
	}
	
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
	
	function evaluateTransforms() {
	  var transforms = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var value = arguments[1];
	  var extraParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  return transforms.map(function (transform) {
	    return transform(value, extraParameters);
	  }).filter(function (p) {
	    return p;
	  }).reduce(mergePropPair, {}) || {};
	}
	
	function mergePropPair() {
	  var a = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var b = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var ret = _extends({}, a, b, {
	    style: _extends({}, a.style, b.style),
	    className: mergeClassNames(a.className, b.className)
	  });
	
	  if (a.children || b.children) {
	    ret.children = _extends({}, b.children, a.children); // Reverse order
	  }
	
	  return ret;
	}
	
	function mergeClassNames(a, b) {
	  if (a && b) {
	    return a + ' ' + b;
	  }
	
	  // Either a or b at this point
	  return (a || '') + (b || '');
	}
	
	exports.resolveHeaderRows = resolveHeaderRows;
	exports.countRowSpan = countRowSpan;
	exports.resolveBodyColumns = resolveBodyColumns;
	exports.evaluateTransforms = evaluateTransforms;
	exports.mergePropPair = mergePropPair;
	exports.mergeClassNames = mergeClassNames;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _types = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// This has to be a React component instead of a function.
	// Otherwise refs won't work.
	
	var Header = function (_React$Component) {
	  _inherits(Header, _React$Component);
	
	  function Header() {
	    _classCallCheck(this, Header);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	  }
	
	  _createClass(Header, [{
	    key: 'render',
	    // eslint-disable-line max-len, react/prefer-stateless-function
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	
	      var props = _objectWithoutProperties(_props, ['children']);
	
	      var _context = this.context;
	      var headerColumns = _context.headerColumns;
	      var components = _context.components;
	
	
	      return _react2.default.createElement(components.header.wrapper, props, [(0, _utils.resolveHeaderRows)(headerColumns).map(function (row, i) {
	        return _react2.default.createElement(HeaderRow, {
	          key: i + '-header-row',
	          components: components.header,
	          row: row
	        });
	      })].concat(children));
	    }
	  }]);
	
	  return Header;
	}(_react2.default.Component);
	
	exports.default = Header;
	
	Header.propTypes = {
	  children: _react2.default.PropTypes.any
	};
	Header.contextTypes = _types.tableHeaderContextTypes;
	
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
	      column: column
	    };
	    var transformedProps = (0, _utils.evaluateTransforms)(transforms, label, extraParameters);
	
	    if (!transformedProps) {
	      console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
	    }
	
	    return _react2.default.createElement(components.cell, _extends({
	      key: j + '-header'
	    }, (0, _utils.mergePropPair)(props, transformedProps)), transformedProps.children || format(label, extraParameters));
	  }));
	};
	HeaderRow.propTypes = {
	  row: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	  components: _react2.default.PropTypes.object
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _isEqual = __webpack_require__(8);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _types = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// This has to be a React component instead of a function.
	// Otherwise refs won't work.
	
	var Body = function (_React$Component) {
	  _inherits(Body, _React$Component);
	
	  function Body() {
	    _classCallCheck(this, Body);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Body).apply(this, arguments));
	  }
	
	  _createClass(Body, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      return !((0, _isEqual2.default)(this.props, nextProps) && (0, _isEqual2.default)(this.context, nextContext));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var row = _props.row;
	
	      var props = _objectWithoutProperties(_props, ['row']);
	
	      var _context = this.context;
	      var bodyColumns = _context.bodyColumns;
	      var components = _context.components;
	      var data = _context.data;
	      var rowKey = _context.rowKey;
	
	
	      return _react2.default.createElement(components.body.wrapper, props, data.map(function (r, i) {
	        return _react2.default.createElement(BodyRow, {
	          key: (r[rowKey] || i) + '-row',
	          components: components.body,
	          row: r,
	          rowProps: row(r, i),
	          rowIndex: i,
	          rowData: data[i],
	          columns: bodyColumns
	        });
	      }));
	    }
	  }]);
	
	  return Body;
	}(_react2.default.Component);
	
	exports.default = Body;
	
	Body.propTypes = {
	  row: _react2.default.PropTypes.func,
	  className: _react2.default.PropTypes.string
	};
	Body.defaultProps = {
	  row: function row() {}
	};
	Body.contextTypes = _types.tableBodyContextTypes;
	
	var BodyRow = function (_React$Component2) {
	  _inherits(BodyRow, _React$Component2);
	
	  function BodyRow() {
	    _classCallCheck(this, BodyRow);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BodyRow).apply(this, arguments));
	  }
	
	  _createClass(BodyRow, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      var previousProps = this.props;
	
	      return !((0, _isEqual2.default)(previousProps.columns, nextProps.columns) && (0, _isEqual2.default)(previousProps.row, nextProps.row) && (0, _isEqual2.default)(previousProps.rowProps, nextProps.rowProps) && (0, _isEqual2.default)(previousProps.rowData, nextProps.rowData));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var columns = _props2.columns;
	      var components = _props2.components;
	      var row = _props2.row;
	      var rowProps = _props2.rowProps;
	      var rowIndex = _props2.rowIndex;
	      var rowData = _props2.rowData;
	
	
	      return _react2.default.createElement(components.row, rowProps, (0, _utils.resolveBodyColumns)(columns).map(function (_ref, j) {
	        var column = _ref.column;
	        var cell = _ref.cell;
	        var props = _ref.props;
	        var property = cell.property;
	        var _cell$transforms = cell.transforms;
	        var transforms = _cell$transforms === undefined ? [] : _cell$transforms;
	        var _cell$format = cell.format;
	        var format = _cell$format === undefined ? function (a) {
	          return a;
	        } : _cell$format;
	
	        var value = row[property];
	
	        var extraParameters = {
	          columnIndex: j,
	          column: column,
	          rowData: rowData,
	          rowIndex: rowIndex,
	          property: property
	        };
	        var transformed = (0, _utils.evaluateTransforms)(transforms, value, extraParameters);
	
	        if (!transformed) {
	          console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
	        }
	
	        return _react2.default.createElement(components.cell, _extends({
	          key: j + '-cell'
	        }, (0, _utils.mergePropPair)(props, transformed)), transformed.children || format(value, extraParameters));
	      }));
	    }
	  }]);
	
	  return BodyRow;
	}(_react2.default.Component);
	
	BodyRow.propTypes = {
	  columns: _react2.default.PropTypes.array.isRequired,
	  components: _react2.default.PropTypes.object,
	  row: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
	  rowProps: _react2.default.PropTypes.object,
	  rowIndex: _react2.default.PropTypes.number.isRequired,
	  rowData: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(9);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(10),
	    isObject = __webpack_require__(33),
	    isObjectLike = __webpack_require__(75);
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(11),
	    equalArrays = __webpack_require__(52),
	    equalByTag = __webpack_require__(57),
	    equalObjects = __webpack_require__(62),
	    getTag = __webpack_require__(80),
	    isArray = __webpack_require__(76),
	    isHostObject = __webpack_require__(34),
	    isTypedArray = __webpack_require__(85);
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(12),
	    stackClear = __webpack_require__(20),
	    stackDelete = __webpack_require__(21),
	    stackGet = __webpack_require__(22),
	    stackHas = __webpack_require__(23),
	    stackSet = __webpack_require__(24);
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(13),
	    listCacheDelete = __webpack_require__(14),
	    listCacheGet = __webpack_require__(17),
	    listCacheHas = __webpack_require__(18),
	    listCacheSet = __webpack_require__(19);
	
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(16);
	
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(12);
	
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(12),
	    MapCache = __webpack_require__(25);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(26),
	    mapCacheDelete = __webpack_require__(46),
	    mapCacheGet = __webpack_require__(49),
	    mapCacheHas = __webpack_require__(50),
	    mapCacheSet = __webpack_require__(51);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(27),
	    ListCache = __webpack_require__(12),
	    Map = __webpack_require__(45);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(28),
	    hashDelete = __webpack_require__(41),
	    hashGet = __webpack_require__(42),
	    hashHas = __webpack_require__(43),
	    hashSet = __webpack_require__(44);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(31),
	    getValue = __webpack_require__(40);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(32),
	    isHostObject = __webpack_require__(34),
	    isMasked = __webpack_require__(35),
	    isObject = __webpack_require__(33),
	    toSource = __webpack_require__(39);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(33);
	
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
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(36);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(37);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(38);
	
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(37);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(47);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(48);
	
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(47);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(47);
	
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(47);
	
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(53),
	    arraySome = __webpack_require__(56);
	
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(25),
	    setCacheAdd = __webpack_require__(54),
	    setCacheHas = __webpack_require__(55);
	
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
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58),
	    Uint8Array = __webpack_require__(59),
	    equalArrays = __webpack_require__(52),
	    mapToArray = __webpack_require__(60),
	    setToArray = __webpack_require__(61);
	
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(37);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(37);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(63),
	    keys = __webpack_require__(65);
	
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(64);
	
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
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(63),
	    baseKeys = __webpack_require__(66),
	    indexKeys = __webpack_require__(67),
	    isArrayLike = __webpack_require__(71),
	    isIndex = __webpack_require__(78),
	    isPrototype = __webpack_require__(79);
	
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
/* 66 */
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(68),
	    isArguments = __webpack_require__(69),
	    isArray = __webpack_require__(76),
	    isLength = __webpack_require__(74),
	    isString = __webpack_require__(77);
	
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
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(70);
	
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(71),
	    isObjectLike = __webpack_require__(75);
	
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(72),
	    isFunction = __webpack_require__(32),
	    isLength = __webpack_require__(74);
	
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(73);
	
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(76),
	    isObjectLike = __webpack_require__(75);
	
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
/* 78 */
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
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(81),
	    Map = __webpack_require__(45),
	    Promise = __webpack_require__(82),
	    Set = __webpack_require__(83),
	    WeakMap = __webpack_require__(84),
	    toSource = __webpack_require__(39);
	
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(37);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(37);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(37);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(37);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(74),
	    isObjectLike = __webpack_require__(75);
	
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
/* 86 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var multipleColumns = function multipleColumns(_ref) {
	  var columns = _ref.columns;
	  var query = _ref.query;
	  var strategy = _ref.strategy;
	  var transform = _ref.transform;
	  return function (data) {
	    return query ? Object.keys(query).reduce(function (filteredData, searchColumn) {
	      return singleColumn({
	        columns: columns,
	        searchColumn: searchColumn,
	        query: query[searchColumn],
	        strategy: strategy,
	        transform: transform
	      })(filteredData);
	    }, data) : data;
	  };
	};
	
	var singleColumn = function singleColumn(_ref2) {
	  var columns = _ref2.columns;
	  var _ref2$searchColumn = _ref2.searchColumn;
	  var searchColumn = _ref2$searchColumn === undefined ? 'all' : _ref2$searchColumn;
	  var query = _ref2.query;
	  var strategy = _ref2.strategy;
	  var transform = _ref2.transform;
	  return function (rows) {
	    if (!query) {
	      return rows;
	    }
	
	    var ret = columns;
	
	    if (searchColumn !== 'all') {
	      ret = columns.filter(function (col) {
	        return col.cell && col.cell.property === searchColumn;
	      });
	    }
	
	    return rows.filter(function (row) {
	      return ret.filter(function (column) {
	        return _columnMatches({
	          query: query, column: column, strategy: strategy, transform: transform, row: row
	        });
	      }).length > 0;
	    });
	  };
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
	
	  // XXX: same resolver as for highlight -> reuse
	  var property = column.cell.property;
	  var value = row[property];
	  var resolver = column.cell.resolve || function (a) {
	    return a;
	  };
	  var resolvedValue = resolver(value, { rowData: row, property: property });
	
	  if (typeof resolvedValue === 'undefined' || resolvedValue === null) {
	    resolvedValue = '';
	  }
	
	  resolvedValue = resolvedValue.toString ? resolvedValue.toString() : '';
	
	  return strategy(transform(query)).evaluate(transform(resolvedValue));
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
	
	  var val = value && value.toString ? value.toString() : '';
	
	  return strategy(transform(query)).matches(transform(val));
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
/* 87 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var defaultOrder = {
	  FIRST: 'asc',
	  '': 'asc',
	  asc: 'desc',
	  desc: ''
	};
	
	var byColumn = function byColumn(_ref) {
	  var sortingColumns = _ref.sortingColumns;
	  var _ref$sortingOrder = _ref.sortingOrder;
	  var sortingOrder = _ref$sortingOrder === undefined ? defaultOrder : _ref$sortingOrder;
	  var selectedColumn = _ref.selectedColumn;
	
	  var sort = sortingOrder.FIRST;
	
	  if (sortingColumns && sortingColumns.hasOwnProperty(selectedColumn)) {
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
	
	var byColumns = function byColumns(_ref3) {
	  var sortingColumns = _ref3.sortingColumns;
	  var _ref3$sortingOrder = _ref3.sortingOrder;
	  var sortingOrder = _ref3$sortingOrder === undefined ? defaultOrder : _ref3$sortingOrder;
	  var selectedColumn = _ref3.selectedColumn;
	
	  var newSortingColumns = {};
	
	  if (!sortingColumns) {
	    return _defineProperty({}, selectedColumn, {
	      direction: sortingOrder.FIRST,
	      position: 0
	    });
	  } else if (sortingColumns.hasOwnProperty(selectedColumn)) {
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
	
	// sorter === lodash orderBy
	// https://lodash.com/docs#orderBy
	var sorter = function sorter() {
	  var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var columns = _ref5.columns;
	  var sortingColumns = _ref5.sortingColumns;
	  var sort = _ref5.sort;
	  return function (data) {
	    if (!columns) {
	      throw new Error('sort.sorter - Missing columns!');
	    }
	
	    if (!sortingColumns) {
	      return data;
	    }
	
	    var columnIndexList = new Array(sortingColumns.length);
	    var orderList = new Array(sortingColumns.length);
	
	    // XXX: similar logic as for search and highlight -> share
	    Object.keys(sortingColumns).forEach(function (columnIndex) {
	      var realColumn = columns[columnIndex] || { cell: {} };
	      var resolver = realColumn.cell && realColumn.cell.resolve || function (a) {
	        return a;
	      };
	      var sortingColumn = sortingColumns[columnIndex];
	
	      columnIndexList[sortingColumn.position] = function (row) {
	        var value = row[realColumn.cell.property];
	        var resolvedValue = resolver(value, {
	          rowData: row,
	          property: realColumn.cell.property
	        });
	
	        if (resolvedValue && resolvedValue.toLowerCase) {
	          return resolvedValue.toLowerCase();
	        }
	
	        return value;
	      };
	
	      orderList[sortingColumn.position] = sortingColumn.direction;
	    });
	
	    return sort(data, columnIndexList, orderList);
	  };
	};
	
	exports.default = {
	  byColumn: byColumn,
	  byColumns: byColumns,
	  sorter: sorter
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-shadow */
	
	
	var _react = __webpack_require__(3);
	
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
	
	      if (key === 'Enter') {
	        onValue(parseValue(value));
	      }
	    };
	    var onBlur = function onBlur(_ref9) {
	      var value = _ref9.target.value;
	      // eslint-disable-line react/prop-types
	      onValue(parseValue(value));
	    };
	    var parseValue = function parseValue(v) {
	      return value === parseFloat(value) ? parseFloat(v) : v;
	    };
	
	    return _react2.default.createElement('input', _extends({
	      defaultValue: value,
	      onKeyUp: onKeyUp,
	      onBlur: onBlur
	    }, props));
	  };
	  Input.propTypes = {
	    value: _react2.default.PropTypes.any,
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var edit = function edit() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var _ref$isEditing = _ref.isEditing;
	  var isEditing = _ref$isEditing === undefined ? function () {} : _ref$isEditing;
	  var _ref$onActivate = _ref.onActivate;
	  var onActivate = _ref$onActivate === undefined ? function () {} : _ref$onActivate;
	  var _ref$onValue = _ref.onValue;
	
	  var _onValue = _ref$onValue === undefined ? function () {} : _ref$onValue;
	
	  return function (editor) {
	    return function (value, extraParameters) {
	      var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      return isEditing(extraParameters) ? {
	        children: _react2.default.createElement(editor, _extends({}, props, {
	          value: value,
	          onValue: function onValue(v) {
	            return _onValue(_extends({ value: v }, extraParameters));
	          }
	        }))
	      } : _extends({}, props, {
	        onClick: function onClick() {
	          return onActivate(extraParameters);
	        }
	      });
	    };
	  };
	};
	
	var sort = function sort() {
	  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var _ref2$getSortingColum = _ref2.getSortingColumns;
	  var getSortingColumns = _ref2$getSortingColum === undefined ? function () {
	    return [];
	  } : _ref2$getSortingColum;
	  var _ref2$onSort = _ref2.onSort;
	  var onSort = _ref2$onSort === undefined ? function () {} : _ref2$onSort;
	  return function (_value, _ref3) {
	    var columnIndex = _ref3.columnIndex;
	
	    var _ref4 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var className = _ref4.className;
	
	    var props = _objectWithoutProperties(_ref4, ['className']);
	
	    var columns = getSortingColumns();
	    var headerClass = 'sort sort-none';
	
	    // Check against undefined to allow zero
	    if (columns[columnIndex] !== undefined) {
	      headerClass = 'sort sort-' + columns[columnIndex].direction;
	    }
	
	    return _extends({}, props, {
	      className: (0, _utils.mergeClassNames)(className, headerClass),
	      onClick: function onClick() {
	        return onSort(columnIndex);
	      }
	    });
	  };
	};
	
	var toFormatter = function toFormatter(transform) {
	  var element = arguments.length <= 1 || arguments[1] === undefined ? 'div' : arguments[1];
	  return _react2.default.createElement(element, transform);
	};
	
	exports.default = {
	  edit: edit,
	  sort: sort,
	  toFormatter: toFormatter
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var highlightCell = function highlightCell(value) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? { rowData: { _highlights: {} } } : arguments[1];
	
	  var rowData = _ref.rowData;
	  var property = _ref.property;
	  return highlightValue(value, rowData._highlights[property] // eslint-disable-line max-len, no-underscore-dangle
	  );
	};
	
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
	
	function highlighter(_ref2) {
	  var columns = _ref2.columns;
	  var matches = _ref2.matches;
	  var query = _ref2.query;
	
	  return function (rows) {
	    return rows.map(function (row) {
	      var ret = {
	        _highlights: {}
	      };
	
	      columns.forEach(function (column) {
	        // XXX: same resolver as for search -> reuse
	        var property = column.cell.property;
	        var value = row[property];
	        var resolver = column.cell.resolve || function (a) {
	          return a;
	        };
	        var resolvedValue = resolver(value, { rowData: row, property: property });
	
	        if (typeof resolvedValue === 'undefined' || resolvedValue === null) {
	          resolvedValue = '';
	        }
	
	        resolvedValue = resolvedValue.toString ? resolvedValue.toString() : '';
	
	        ret[property] = row[property];
	
	        // Stash highlighted value based on index
	        // so it can be extracted later for highlighting
	        ret._highlights[property] = matches({ // eslint-disable-line no-underscore-dangle
	          value: resolvedValue,
	          query: query[property] || query.all
	        });
	      });
	
	      return ret;
	    });
	  };
	}
	
	exports.default = {
	  cell: highlightCell,
	  value: highlightValue,
	  highlighter: highlighter
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _get = __webpack_require__(92);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _has = __webpack_require__(102);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function resolve(_ref) {
	  var columns = _ref.columns;
	
	  return function (rows) {
	    return rows.map(function (row) {
	      return resolveRow(columns, row);
	    });
	  };
	}
	
	function resolveRow(columns, row) {
	  var ret = _extends({}, row); // shallow clone
	
	  (0, _utils.resolveBodyColumns)(columns).filter(function (a) {
	    return a;
	  }).forEach(function (column) {
	    var property = column.cell && column.cell.property;
	
	    if (!property) {
	      return;
	    }
	
	    if (!(0, _has2.default)(row, property)) {
	      console.warn('resolve - Failed to find "' + property + '" property from', row); // eslint-disable-line max-len, no-console
	    }
	
	    ret[property] = (0, _get2.default)(row, property);
	  });
	
	  return ret;
	}
	
	exports.default = resolve;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(93);
	
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(94),
	    isKey = __webpack_require__(100),
	    toKey = __webpack_require__(101);
	
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(76),
	    stringToPath = __webpack_require__(95);
	
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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(96),
	    toString = __webpack_require__(97);
	
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(25);
	
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(98);
	
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58),
	    isSymbol = __webpack_require__(99);
	
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(75);
	
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(76),
	    isSymbol = __webpack_require__(99);
	
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(99);
	
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(63),
	    hasPath = __webpack_require__(103);
	
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(94),
	    isArguments = __webpack_require__(69),
	    isArray = __webpack_require__(76),
	    isIndex = __webpack_require__(78),
	    isKey = __webpack_require__(100),
	    isLength = __webpack_require__(74),
	    isString = __webpack_require__(77),
	    toKey = __webpack_require__(101);
	
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactabular.js.map