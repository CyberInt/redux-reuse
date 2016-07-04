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
	    return _extendReducer.extendReducer;
	  }
	});

	var _initialReducer = __webpack_require__(2);

	Object.defineProperty(exports, 'initialReducer', {
	  enumerable: true,
	  get: function get() {
	    return _initialReducer.initialReducer;
	  }
	});

	var _nullReducer = __webpack_require__(3);

	Object.defineProperty(exports, 'nullReducer', {
	  enumerable: true,
	  get: function get() {
	    return _nullReducer.nullReducer;
	  }
	});

	var _withActionFilterReducer = __webpack_require__(4);

	Object.defineProperty(exports, 'withActionFilterReducer', {
	  enumerable: true,
	  get: function get() {
	    return _withActionFilterReducer.withActionFilterReducer;
	  }
	});

	var _withMapStateReducer = __webpack_require__(5);

	Object.defineProperty(exports, 'withMapStateReducer', {
	  enumerable: true,
	  get: function get() {
	    return _withMapStateReducer.withMapStateReducer;
	  }
	});

	var _withPayloadReducer = __webpack_require__(7);

	Object.defineProperty(exports, 'withPayloadReducer', {
	  enumerable: true,
	  get: function get() {
	    return _withPayloadReducer.withPayloadReducer;
	  }
	});

	var _withResetReducer = __webpack_require__(8);

	Object.defineProperty(exports, 'withResetReducer', {
	  enumerable: true,
	  get: function get() {
	    return _withResetReducer.withResetReducer;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Extends an existing reducer with additional action type handlers
	 * @param {function} reducer - a reducer function
	 * @param {object} handlers - object, where keys are action types
	 *   to be handled and values is a reducer function with signature:
	 *     (state, action) => newState
	 * @returns {function} Reducer function
	 */
	var extendReducer = exports.extendReducer = function extendReducer(reducer, handlers) {
	  return function (state, action) {
	    var stateForReducer = handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;

	    return reducer(stateForReducer, action);
	  };
	};

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
	var initialReducer = exports.initialReducer = function initialReducer(initialState) {
	  return function (state) {
	    return typeof state === 'undefined' ? initialState : state;
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nullReducer = undefined;

	var _initialReducer = __webpack_require__(2);

	/**
	 * A reducer with null as initial state
	 */
	var nullReducer = exports.nullReducer = (0, _initialReducer.initialReducer)(null);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withActionFilterReducer = undefined;

	var _nullReducer = __webpack_require__(3);

	/**
	 * Creates a reducer wrapper which tests actions with a predicate before
	 * passing to the reducer.
	 * @param {function} predicate - function which is called with action as
	 *   argument and should return truthy value in order to indicate that
	 *   action should be passed to reducer.
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var withActionFilterReducer = exports.withActionFilterReducer = function withActionFilterReducer(predicate) {
	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? _nullReducer.nullReducer : arguments[0];
	    return function (state, action) {
	      if (typeof state === 'undefined' || predicate(action)) {
	        return reducer(state, action);
	      }

	      return state;
	    };
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withMapStateReducer = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _identity = __webpack_require__(6);

	var _identity2 = _interopRequireDefault(_identity);

	var _nullReducer = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Creates a reducer wrapper which maps state before and after passing to a
	 * reducer, but does it only for passed action types.
	 * @param {function} [mapStateBefore=identity]
	 *   A function with signature: (stateBefore) => newStateBefore, where
	 *   stateBefore is the original state, newStateBefore is passed to the reducer.
	 * @param {function} [mapStateAfter=identity]
	 *   A function with signature: (stateAfter) => newStateAfter, where
	 *   stateAfter is returned by the reducer, newStateAfter is returned to the store.
	 * @param {[string]} [actionTypes]
	 *   Action types to perform map state. Handles all actions if not provided.
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var withMapStateReducer = exports.withMapStateReducer = function withMapStateReducer() {
	  var mapStateBefore = arguments.length <= 0 || arguments[0] === undefined ? _identity2.default : arguments[0];
	  var mapStateAfter = arguments.length <= 1 || arguments[1] === undefined ? _identity2.default : arguments[1];
	  var actionTypes = arguments[2];

	  var actionTypesDict = actionTypes && actionTypes.reduce(function (actionType, dict) {
	    return _extends({}, dict, _defineProperty({}, actionType, true));
	  }, {});

	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? _nullReducer.nullReducer : arguments[0];
	    return function (state, action) {
	      if (actionTypes && !actionTypesDict[action.type]) {
	        return reducer(state, action);
	      }

	      return mapStateAfter(reducer(mapStateBefore(state), action));
	    };
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withPayloadReducer = undefined;

	var _extendReducer2 = __webpack_require__(1);

	var _nullReducer = __webpack_require__(3);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Creates a reducer wrapper which return the payload of the action for the
	 * given action type.
	 * @param {string} actionType
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var withPayloadReducer = exports.withPayloadReducer = function withPayloadReducer(actionType) {
	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? _nullReducer.nullReducer : arguments[0];
	    return (0, _extendReducer2.extendReducer)(reducer, _defineProperty({}, actionType, function (_) {
	      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var payload = _ref.payload;
	      return payload;
	    }));
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withResetReducer = exports.actionTypes = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _extendReducer = __webpack_require__(1);

	var _nullReducer = __webpack_require__(3);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * These are private action types reserved by redux-reuse.
	 *
	 * From Redux:
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var actionTypes = exports.actionTypes = {
	  RESET: '@@reduxReuse/RESET'
	};

	/**
	 * Creates a reducer wrapper which resets the state for the given action type(s)
	 * @param {string[]} actionTypes
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var withResetReducer = exports.withResetReducer = function withResetReducer() {
	  for (var _len = arguments.length, actionTypes = Array(_len), _key = 0; _key < _len; _key++) {
	    actionTypes[_key] = arguments[_key];
	  }

	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? _nullReducer.nullReducer : arguments[0];
	    return (0, _extendReducer.extendReducer)(reducer, actionTypes.reduce(function (handlers, actionType) {
	      return _extends({}, handlers, _defineProperty({}, actionType, function () {
	        return reducer(undefined, { type: actionTypes.RESET });
	      }));
	    }, {}));
	  };
	};

/***/ }
/******/ ])
});
;