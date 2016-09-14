(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reduxReuse"] = factory();
	else
		root["reduxReuse"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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

	var _extendReducer = __webpack_require__(1);

	Object.defineProperty(exports, 'extendReducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_extendReducer).default;
	  }
	});

	var _initialReducer = __webpack_require__(2);

	Object.defineProperty(exports, 'initialReducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_initialReducer).default;
	  }
	});

	var _nullReducer = __webpack_require__(3);

	Object.defineProperty(exports, 'nullReducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_nullReducer).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Extends an existing reducer with additional action type handlers
	 * @param {object} handlers - object, where keys are action types
	 *   to be handled and values is a reducer function with signature:
	 *     (state, action) => newState
	 * @param {boolean} propagate=true - Whenever or not invoke base reducer after
	 *   handler execution. If action does not match any handler, then base reducer
	 *   will be executed always.
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var _extendReducer = function _extendReducer(handlers) {
	  var propagate = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	  return function (reducer) {
	    return function (state, action) {
	      if (handlers.hasOwnProperty(action.type)) {
	        var newState = handlers[action.type](state, action);

	        return propagate ? reducer(newState, action) : newState;
	      }

	      return reducer(state, action);
	    };
	  };
	};

	var extendReducer = function extendReducer() {
	  if (arguments.length === 1) {
	    return _extendReducer(arguments.length <= 0 ? undefined : arguments[0]);
	  }

	  if (arguments.length === 2) {
	    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
	      return _extendReducer(arguments.length <= 1 ? undefined : arguments[1])(arguments.length <= 0 ? undefined : arguments[0]);
	    }

	    return _extendReducer(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
	  }

	  return _extendReducer(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2])(arguments.length <= 0 ? undefined : arguments[0]);
	};

	exports.default = extendReducer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Creates a reducer with passed value as initial state
	 * @param {*} initialState
	 * @returns {function} Reducer function
	 */
	var initialReducer = function initialReducer(initialState) {
	  return function (state) {
	    return typeof state === 'undefined' ? initialState : state;
	  };
	};

	exports.default = initialReducer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _initialReducer = __webpack_require__(2);

	var _initialReducer2 = _interopRequireDefault(_initialReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A reducer with null as initial state
	 */
	var nullReducer = (0, _initialReducer2.default)(null);

	exports.default = nullReducer;

/***/ }
/******/ ])
});
;