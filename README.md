# redux-reuse

redux-reuse is a [Redux](https://github.com/reactjs/redux "Redux")-related project,
which provides `extendReducer()` helper function, which helps to make your reducers
code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"), based on approach
of composable higher-order reducers.

`extendReducer()` allows you to add logic to reducer after it has been created,
in other words you *extend* reducers.
Using `extendReducer()` it is pretty simple to write composable higher-order reducers
for your Redux application, at the end of the day most reducers can be presented as
composition of higher-order reducers.

## Usage

### Install via NPM

```
npm install redux-reuse --save
```

### Import

```javascript
import { extendReducer } from 'redux-reuse';
// or
var reduxReuse = require('redux-reuse');
```

#### If you need ES6 module
```javascript
import { extendReducer } from 'redux-reuse/es6';
```
Use this if you are using [rollup.js](http://rollupjs.org/) or
[webpack 2](http://webpack.github.io/docs/changelog.html#2-1-x-beta), or any
ES2015 modules-compatible bundler which can eliminate unused library code with
[tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html).

It is recommended to import the library from `redux-reuse/es6` instead of
`redux-reuse/src` because the source code depends on experimental presets from
babel (stage 1-3) and may be incompatible with your bundler or settings.

### Other environments

Use the Universal Module Definition (UMD)

- [reduxReuse.js](dist/reduxReuse.js)
- [reduxReuse.min.js](dist/reduxReuse.min.js) (minified)

## API

### `extendReducer()`

```js
extendReducer(
  handlers: {
    [actionType: string] => (state: any, action: Object) => any
  },
  propagate: ?boolean = true
): (reducer) => reducer

// Uncurried
extendReducer(
  reducer,
  handlers: {
    [actionType: string] => (state: any, action: Object) => any
  },
  propagate: ?boolean = true
): reducer
```

Extends a reducer with additional action handlers. It means that new reducer will be returned,
which wraps the original one and once an action with one of specified action types occurs,
the appropriate handler will be executed first and then based on `propagate` argument the result
will or will not be passed on to the original reducer.

In other words `extendReducer()` *extends* the existent reducer with some logic, which will be performed
on specified actions. With `extendReducer()` it is pretty easy to write composable
higher-order reducers which are specific to your application and reuse them in you reducers.
See below examples for how to do it.

### `initialReducer()`

```js
initialReducer(initialState: any): reducer
```

Creates a reducer with passed value as initial state.

### `nullReducer`

```js
nullReducer: reducer
```

A reducer which returns `null` as the initial state.

## Overview of existent approaches to reuse code in reducers

There are several approaches for how to organize your reducers code as reusable pieces:

- Organize your common logic in functions and use that functions in you reducers.

Basic approach to reuse pieces of code :)

- Create you own reducer for each usecase and use `combineReducers()` helper in order to combine
separate reducers.

This approach has two disadvantages: first of all it will produce deeper state tree, so once
your application will grow it can lead you to huge selectors, and secondly this way will not
cover case when you need to manage one piece of state.

- Split logic to separate maps of handlers, where keys are action types and values are
appropriate reducers, then use `Object.assign(oneReducerMap, anotherReducerMap)` or spread operator
to combine maps and use their combination in some helpers like `handleActions()` from
[redux-actions](https://github.com/acdlite/redux-actions) or `createReducer()` from
[redux-create-reducer](https://github.com/kolodny/redux-create-reducer) to initialize your reducer,
which will be superset of combined reducer maps.

This approach also has disadvantage: if you have two reducer maps, which should perform some logic on
same actions, then as result of merging maps, one of them will overwrite another one, so only logic
from one reducer map will be performed when contradicted action occurs.

- Organize common logic in separate reducers, cummulate needed reducers in array and
reduce them into single reducer via `reduceReducers()` helper from
[reduce-reducers](https://github.com/acdlite/reduce-reducers).

This approach let you achieve the same result, as `extendReducer()`, but last one is more
Redux-oriented (like using `handleActions()` or `createReducer()` to create reducers) and
it helps to operate in terms of composable higher-order reducers. So choose what you like more :)

## Example of how to use `extendReducer()` to write your own higher-order reducers.

You can look at ready-to-use higher-order reducers, which has been implemented using
`extendReducer()` helper:
- [redux-payload](https://github.com/CyberInt/redux-payload)
- [redux-reset-reducer](https://github.com/CyberInt/redux-reset-reducer)

And start organizing your reducers code in reusable pieces like in the following example:

Let's imagine that we have two separate counters and they should provide different behaviours
on each tick that occurs. One should only increment its own by 1 and the other one should
also change sign of a number it holds. And you have two separate widgets with such a counters,
which work independently and start with different numbers.

```js
import { compose, combineReducers } from 'redux';
import { extendReducer, initialReducer } from 'redux-reuse';
import { WIDGET1_TICK, WIDGET2_TICK } from 'event-types';

const increment = (actionType) => (reducer) =>
  extendReducer(reducer, {
    [actionType]: (state) => state + 1
  });

const changeSign = (actionType) => (reducer) =>
  extendReducer(reducer, {
    [actionType]: (state) => state * (-1)
  });

const widgetReducer = (tickActionType, startingNumber) =>
  combineReducers({
    smoothCounter: increment(tickActionType)(initialReducer(startingNumber)),
    jumpingCounter: compose(
      increment(tickActionType),
      changeSign(tickActionType)
    )(initialReducer(startingNumber))
  });

const app = combineReducers({
  widget1: widgetReducer(WIDGET1_TICK, 0),
  widget2: widgetReducer(WIDGET2_TICK, 100)
})

```

As you can see everything is reused! :)

Another interesting example is when you need to plug-in and plug-out some functionality. Lets
imagine we have counter with checkboxes, indicating what exact functionality should be turned on.

```js

import { extendReducer, initialReducer } from 'redux-reuse';
import { PUSH_MODE, POP_MODE, TICK } from 'event-types';
import { INCREMENT, SQUARE, CHANGE_SIGN } from 'modes';

const increment = (actionType) => (reducer) =>
  extendReducer(reducer, {
    [actionType]: (state) => state + 1
  });

const square = (actionType) => (reducer) =>
  extendReducer(reducer, {
    [actionType]: (state) => state * state
  });

const changeSign = (actionType) => (reducer) =>
  extendReducer(reducer, {
    [actionType]: (state) => state * (-1)
  });

const modesMap = {
  [INCREMENT]: increment,
  [SQUARE]: square,
  [CHANGE_SIGN]: changeSign,
};

const counter = (state = { modes: [], value: null }, { payload: mode }) => {
  switch (action.type) {
    case PUSH_MODE:
      state.modes.push(mode);
      break;
    case POP_MODE:
      state.modes.pop();
      break;
    case TICK:
      const reducers = state.modes.map((mode) => modesMap[mode]);
      state.value = compose(...reducers)(initialReducer(0))(state.value, action);
      break;
  }

  return state;
};

```

And again, we can reuse our higher-order reducers in every place we wish.

## Thanks
Big thanks to [ilyagelman](https://github.com/ilyagelman) for reviewing and acting as opponent,
which helped a lot in preparing the overview of existent approaches.
