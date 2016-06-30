# redux-reuse

## This project in phase of active development, so something described below can not be available in the moment

redux-reuse is a [Redux](https://github.com/reactjs/redux "Redux")-related project, which includes `extendReducer()` helper function, which helps make your reducers code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"), based on approach of high-level reducers, as well as set of common reducer *extenders*, ready to use in your Redux application.

It is very common situation when different reducers should react in same way on same action, one of the solution to achieve code reuse in such a case is organise common logic in high-level reducer, but it will lead us to deeper state tree.
Actually we just want that our reducers will apply common logic on existent state subtree, which they manage and thats all. Here `extendReducer()` helper comes into play.

Using `extendReducer()` it is pretty simple to write composable extenders for your Redux application, in fact most of reducers can be presented as composition of common extenders.

## Usage

### Node

Install

```
npm install redux-reuse --save
```

Import
```javascript
import { extendReducer } from 'redux-reuse'; 
// or
var reduxReuse = require('redux-reuse');
```

Or import ES2015 modules
```javascript
import { extendReducer } from 'redux-reuse/es6';
```

### Browser and other environments

Use the Universal Module Definition (UMD)

- [reduxReuse.js](dist/reduxReuse.js)
- [reduxReuse.min.js](dist/reduxReuse.min.js) (minified)

## API

### Second-order Reducers

#### `extendReducer()`

```js
extendReducer(
  reducer,
  handlers: {
    [handlerName: string] => reducer
  }
): reducer
```

Extends a reducer with additional action handlers.

#### `initialReducer()`

```js
initialReducer(initialState: any): reducer
```

Creates a reducer which returns an initial state.

### Third-order Reducers

#### `withActionFilterReducer()`

```js
withActionFilterReducer(
  predicate: (action: Object) => Boolean
): (reducer) => reducer
```

Creates a second-order reducer which tests actions with a predicate (to evaluate to true) before passing to the given reducer. This is useful for filtering actions based on fields other than the action type.

##### Example

reducers/tabs.js

```js
import tab from 'reducers/tab';
import { HOME_TAB, ACCOUNT_TAB } from 'constants/tabs';

const filteredTab = (tabName) => withActionFilterReducer(
  (action) => action.meta.tab === tabName
)(tab);

export default combineReducers({
  home: filteredTab(HOME_TAB),
  account: filteredTab(ACCOUNT_TAB)
});
```

#### `withMapStateReducer()`

```js
withMapStateReducer(
  mapStateBefore: (stateBefore: any) => newStateBefore,
  mapStateAfter: (stateAfter: any) => newStateAfter,
  actionTypes: Array<string>
): (reducer) => reducer
```

Creates a second-order reducer which maps state before and after passing to a reducer.

#### `withPayloadReducer()`

```js
withPayloadReducer(actionType: String): (reducer) => reducer
```

Creates a second-order reducer which returns the payload of the action for the given action type.

### Helper Reducers

#### `nullReducer`

```js
nullReducer: reducer
```

A reducer which returns `null` as the initial state.

## Examples of extender code
## Examples of how to use extenders in reducers
