(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons", "react"], factory);
	else if(typeof exports === 'object')
		exports["Reactabular"] = factory(require("react/addons"), require("react"));
	else
		root["Reactabular"] = factory(root["react/addons"], root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
	    editors: __webpack_require__(5),
	    cell: __webpack_require__(4),
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);
	var cx = React.addons.classSet;
	var update = React.addons.update;
	var zip = __webpack_require__(11);


	module.exports = React.createClass({displayName: "exports",
	    render:function() {
	        var header = this.props.header || {};
	        var data = this.props.data || [];
	        var columns = this.props.columns || [];

	        var props = update(this.props, {
	            $merge: {
	                header: undefined,
	                data: undefined,
	                columns: undefined,
	            },
	        });

	        return (
	            React.createElement("table", React.__spread({},  props), 
	                React.createElement("thead", null, 
	                    React.createElement("tr", null, 
	                        columns.map(function(column, i)  {
	                            var z = zip(header);
	                            var columnHeader = z && zip.toObject(z.map(function(pair)  {
	                                if(pair[0].indexOf('on') === 0) {
	                                    return [pair[0], pair[1].bind(null, column)];
	                                }

	                                return pair;
	                            }));

	                            return React.createElement("th", React.__spread({
	                                key: i + '-header', 
	                                className: cx(column.classes)}, 
	                                columnHeader
	                            ), 
	                                column.header
	                            );
	                        })
	                    )
	                ), 
	                React.createElement("tbody", null, 
	                    data.map(function(row, i)  {return React.createElement("tr", {key: i + '-row'}, 
	                        columns.map(function(column, j)  {
	                            var value = row[column.property];
	                            var cell = column.cell;

	                            if(cell) {
	                                var props = cell(column.property, value, i, j);
	                                var content = props.value;

	                                props = update(props, {
	                                    $merge: {
	                                        value: undefined,
	                                    },
	                                });

	                                return React.createElement("td", React.__spread({key: j + '-cell'},  props), content)
	                            }
	                            else {
	                                return React.createElement("td", {key: j + '-cell'}, value)
	                            }
	                        }
	                    ));})
	                ), 
	                this.props.children
	            )
	        );
	    },
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(7);


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
	            searchData: data.filter(function(row) 
	                {return columns.filter(isColumnVisible.bind(null, row)).length > 0;}
	            )
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


	module.exports = function(columns, column, data, done)  {
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(7);


	module.exports = function(o) {
	    var context = this;
	    var formatter = o.formatter || id;
	    var editor = o.editor;

	    return function(property, value, rowIndex, columnIndex)  {
	        var idx = rowIndex.toString() + '-' + columnIndex.toString();
	        var editedCells = context.state.editedCells || [];
	        var i = editedCells.indexOf(idx);

	        if(i >= 0) {
	            var editorElement = React.createElement(editor, {
	                value: value,
	                onValue: function(value)  {
	                    var data = context.state.data;
	                    var editedCells = context.state.editedCells;

	                    editedCells.splice(idx, 1);

	                    data[rowIndex][property] = value;

	                    context.setState({
	                        data: data,
	                        editedCells: editedCells,
	                    });
	                }
	            });

	            return {
	                value: editorElement
	            };
	        }
	        var formattedValue = formatter(value, rowIndex);

	        if(editor) {
	            return {
	                onClick: function()  {
	                    var editedCells = context.state.editedCells;

	                    editedCells.push(idx);

	                    context.setState({
	                        editedCells: editedCells
	                    });
	                },
	                value: formattedValue
	            };
	        }

	        return {
	            value: formattedValue
	        };
	    };
	};

	function id(a) {return a;}


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

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(7);


	module.exports = function()  {
	    return React.createClass({
	        render:function() {
	            return React.createElement("span", null, 
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
	        );
	        }
	    });
	}.bind(this);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(7);


	module.exports = function(options)  {
	    return React.createClass({
	        render:function() {
	            var edit = function(e)  {return this.props.onValue(e.target.value);}.bind(this);

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

	var React = __webpack_require__(7);


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
	            this.props.onValue(this.getDOMNode().value);
	        },
	    });
	}.bind(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var annotate = __webpack_require__(13);
	var is = __webpack_require__(12);


	var prop = annotate('prop', 'Returns a function that gets given property').
	    on(is.string, function(name) {
	        return function(o) {
	            return o && o[name];
	        };
	    });

	var values = annotate('values', 'Returns values of the given object').
	    on(is.object, function(o) {
	        var ret = [];

	        for(var k in o) {
	            if(o.hasOwnProperty(k)) {
	                ret.push(o[k]);
	            }
	        }

	        return ret;
	    });

	var zip = annotate('zip', 'Converts given input into a zip').
	    on(is.object, function(o) {
	        return zip(Object.keys(o), values(o));
	    }).
	    on([is.array], function() {
	        var ret = [];
	        var args = Array.prototype.slice.call(arguments);
	        var i, len;

	        for(i = 0, len = Math.min.apply(null, args.map(prop('length'))); i < len; i++) {
	            ret.push(extract(i, args));
	        }

	        return ret;
	    }).
	    satisfies(isZip);

	function extract(idx, arrays) {
	    var ret = [];
	    var i, len;

	    for(i = 0, len = arrays.length; i < len; i++) {
	        ret.push(arrays[i][idx]);
	    }

	    return ret;
	}

	var toObject = annotate('zip.toObject', 'Converts given zip into an object').
	    on(isZip, function(a) {
	        var ret = {};

	        a.forEach(function(v) {
	            ret[v[0]] = v[1];
	        });

	        return ret;
	    }).
	    satisfies(is.object);

	zip.toObject = toObject;

	function isZip(a) {
	    var zips = a.filter(function(v) {
	        return is.array(v);
	    });

	    return is.array(a) && zips.length === a.length;
	}

	module.exports = zip;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	function defined(a) {
	    return typeof a !== 'undefined';
	}
	exports.defined = defined;

	function boolean(a) {
	    return typeof a === 'boolean';
	}
	exports.boolean = boolean;

	function number(a) {
	    return typeof a === 'number';
	}
	exports.number = number;

	function fn(a) {
	    return typeof a === 'function';
	}
	exports.fn = fn;

	function array(a) {
	    return Array.isArray(a);
	}
	exports.array = array;

	// http://phpjs.org/functions/is_object:450
	function object(a) {
	    if(Object.prototype.toString.call(a) === '[object Array]') {
	        return false;
	    }

	    return a !== null && typeof a == 'object';
	}
	exports.object = object;

	function string(a) {
	    return typeof a === 'string';
	}
	exports.string = string;

	function any() {
	    return true;
	}
	exports.any = any;

	function character(a) {
	    return string(a) && a.length == 1;
	}
	exports.character = character;

	function lowerCharacter(a) {
	    if(!character(a)) return false;

	    var code = a.charCodeAt();

	    return 97 <= code && code <= 122;
	}
	exports.lowerCharacter = lowerCharacter;

	function upperCharacter(a) {
	    if(!character(a)) return false;

	    var code = a.charCodeAt();

	    return 65 <= code && code <= 90;
	}
	exports.upperCharacter = upperCharacter;

	function nan(a) {
	    return number(a) && isNaN(a);
	}
	exports.nan = nan;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	(function(root, factory) {
	    var nodeColors = {
	        red: function(str) {
	            return ['\033[31m' + str + '\033[0m'];
	        },
	        green: function(str) {
	            return ['\033[32m' + str + '\033[0m'];
	        },
	        yellow: function(str) {
	            return ['\033[33m' + str + '\033[0m'];
	        }
	    };

	    var browserColors = {
	        red: function(str) {
	            return ['%c' + str, 'color: red; background: #333'];
	        },
	        green: function(str) {
	            return ['%c' + str, 'color: green'];
	        },
	        yellow: function(str) {
	            return ['%c' + str, 'color: yellow; background: #333'];
	        }
	    };

	    if(true) {
	        module.exports = factory(__webpack_require__(12), nodeColors);
	    } else if(typeof define === 'function' && define.amd) {
	        define(['annois'], function(is) {
	            return (root.annotate = factory(is, browserColors));
	        });
	    } else {
	        root.annotate = factory(root.is, browserColors);
	    }
	}(this, function(is, colors) {
	    return function() {
	        var doc = arguments[1];
	        var functions = [];
	        var preconditions = [];
	        var postconditions = [];
	        var name = arguments[0];
	        var ret = function() {
	            warn(colors.red('\n"' + name + '" is missing dispatcher!'));
	        };

	        return attachMeta(ret);

	        function on() {
	            var len = arguments.length - 1;
	            var fn = arguments[len];
	            var inv = [];

	            for(var i = 0; i < len; i++) {
	                inv.push(arguments[i]);
	            }

	            functions.push(wrapFn(fn));
	            preconditions.push(inv);

	            return attachMeta(check(preconditions, postconditions, functions, name));
	        }

	        function satisfies(postCondition) {
	            postconditions.push(postCondition);

	            return attachMeta(check(preconditions, postconditions, functions, name));
	        }

	        function attachMeta(a) {
	            a.on = on;
	            a.satisfies = satisfies;

	            a._doc = doc || '';
	            a._preconditions = preconditions;
	            a._postconditions = postconditions;
	            a._name = name || '';

	            return a;
	        }
	    };

	    function wrapFn(a) {
	        return is.fn(a)? a: function() {return a;};
	    }

	    function check(preconditions, postconditions, functions, name) {
	        name = name || '<undefined>';

	        return function() {
	            var args = Array.prototype.slice.call(arguments);
	            var firstPreconditions = preconditions[0];
	            var result;

	            if(is.array(firstPreconditions[0])) {
	                result = matchArray(args, firstPreconditions[0][0]);
	            }
	            else {
	                result = matchRegular(args, preconditions);
	            }

	            if(result.fail) {
	                return warnPost('precondition', result.fail, name, args);
	            }

	            return postOk(
	                functions[result.i].apply(null, args),
	                postconditions,
	                args,
	                name
	            );
	        };
	    }

	    function matchArray(args, precondition) {
	        var fails = args.filter(function(arg) {
	            return !precondition(arg) && precondition;
	        });

	        if(fails.length) {
	            return {
	                fail: fails[0]
	            };
	        }

	        return {
	            i: 0
	        };
	    }

	    function matchRegular(args, preconditions) {
	        var i, j, len1, len2, precondition, pre, allMatched;

	        for(i = 0, len1 = preconditions.length; i < len1; i++) {
	            allMatched = true;
	            precondition = preconditions[i];

	            for(j = 0, len2 = precondition.length; j < len2; j++) {
	                pre = precondition[j];
	                pre = is.fn(pre)? pre: is.array(pre)? arr(pre): eq(pre);

	                if(!pre(args[j], args)) {
	                    allMatched = false;
	                    break;
	                }
	            }

	            if(allMatched) {
	                return {
	                    i: i
	                };
	            }
	        }

	        return {
	            fail: pre
	        };
	    }

	    function arr(pre) {
	        return function(i) {
	            return pre[0](i);
	        };
	    }

	    function eq(a) {
	        return function(i) {
	            return a === i;
	        };
	    }

	    function postOk(res, postconditions, args, name) {
	        var i, len, postcondition;

	        if(!postconditions.length) {
	            return res;
	        }

	        for(i = 0, len = postconditions.length; i < len; i++) {
	            postcondition = postconditions[i];

	            if(!postcondition.apply(undefined, [res].concat(args))) {
	                warnPost('postcondition', postcondition, name, args);

	                return false;
	            }
	        }

	        return res;
	    }

	    function warnPost(prefix, fn, name, args) {
	        warn(colors.yellow(name).concat(prefix, '\n', fn, '\n', 'failed with parameters ('));
	        warn(colors.green(args.join(', ')));
	        warn(')!');

	        console.trace();
	    }

	    function warn(o) {
	        o = is.array(o)? o: [o];
	        console.warn.apply(console, o);
	    }
	}));



/***/ }
/******/ ])
});
