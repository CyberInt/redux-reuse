# redux-reuse

redux-reuse is a [Redux](https://github.com/reactjs/redux "Redux")-related project,
which provides `extendReducer()` helper function, which helps to make your reducers
code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"), based on approach
of composable higher-order reducers.

It is very common situation when different reducers should react in same way on some actions,
one of the solution to achieve code reuse in such a case is to use `combineReducers()` helper,
but it will lead us to deeper state tree. Actually we just want that our reducers will
apply common logic on existent state subtree, which they manage, and thats it.
Here `extendReducer()` helper comes into play.

`extendReducer()` allows you to add logic to reducer after it has been created,
in other words you *extend* reducers.
Using `extendReducer()` it is pretty simple to write composable higher-order reducers
for your Redux application, in the end of the day most of reducers can be presented as
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
  }
): (reducer) => reducer

// Uncurried
extendReducer(
  reducer,
  handlers: {
    [actionType: string] => (state: any, action: Object) => any
  }
): reducer
```

Extends a reducer with additional action handlers. It means that new reducer will be returned,
which wraps original one and once action with one of specified action types occurs,
appropriate handler will be executed first and result will be passed to original reducer.

In other words `extendReducer()` *extends* existent reducer with some logic, which will be performed
on specified actions. With `extendReducer()` it is pretty easy to write composable
higher-order reducers which are specific to your application and reuse them in you reducers.
See below examples how to do it.

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

## Comparison with existent approaches to reuse code in reducers

There are at least two approaches how to organize your reducers code as reusable pieces:

1. Create you own reducer for each usecase and use `combineReducers()` helper in order to combine
separate reducers.

This approach has two disadvantages: first of all it will produce deeper state tree, so once
your application will grow it can lead you to huge selectors, and secondly this way will not
cover case when you need to manage one piece of state.

2. Split logic to separate maps of handlers, where keys are action types and values are
appropriate reducers, then use `Object.assign(oneReducerMap, anotherReducerMap)` or spread operator
to combine maps and use their combination in some helpers like `handleActions()` from
[redux-actions](https://github.com/acdlite/redux-actions) or `createReducer()` from
[redux-create-reducer](https://github.com/kolodny/redux-create-reducer) to initialize your reducer,
which will be superset of combined reducer maps.

This approach also has disadvantage: if you have two reducer maps, which should perform some logic on
same actions, then as result of merging maps, one of them will overwrite another one, so only logic
from one reducer map will be performed when contradicted action occurs.

## Example of how to use `extendReducer()` to write your own higher-order reducers.

TBD
