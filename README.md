# redux-reuse

redux-reuse is a [Redux](https://github.com/reactjs/redux "Redux")-related project,
which includes `extendReducer()` helper function, which helps to make your reducers
code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"), based on approach
of composable higher-order reducers. Also this package contains a set of common higher-order reducers,
ready to use in your Redux application.

It is very common situation when different reducers should react in same way on same action,
one of the solution to achieve code reuse in such a case is organise common logic in higher-order
reducer, but it will lead us to deeper state tree. Actually we just want that our reducers will
apply common logic on existent state subtree, which they manage, and thats it.
Here `extendReducer()` helper comes into play.

Using `extendReducer()` it is pretty simple to write composable higher-order reducers
for your Redux application, in fact most of reducers can be presented as composition of common extenders.

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

Or import ES2015 modules
```javascript
import { extendReducer } from 'redux-reuse/es6';
```

### Other environments

Use the Universal Module Definition (UMD)

- [reduxReuse.js](dist/reduxReuse.js)
- [reduxReuse.min.js](dist/reduxReuse.min.js) (minified)

## API

### Higher-order helper Reducers

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

Creates a reducer with passed value as initial state.

### Higher-order ready-to-use Reducers

#### `withActionFilterReducer()`

```js
withActionFilterReducer(
  predicate: (action: Object) => Boolean
): (reducer) => reducer
```

Creates a higher-order reducer which tests actions with a predicate before
passing to the given reducer. Where predicate is a function which is called
with action as argument and should return truthy value in order to indicate
that action should be passed to reducer. This is useful for filtering actions
based on fields other than the action type.

##### Example

Lets say you have two types of tabs somewhere in your app, and you want to
specify in action, which tab should react on this action.

```js
import tab from 'reducers/tab';
import { DASHBOARD_TAB, ANOTHER_DASHBOARD_TAB } from 'constants/tabs';

const filteredTab = (tabName) => withActionFilterReducer(
  (action) => action.meta.tab === tabName
)(tab);

export default combineReducers({
  dashboardTab: filteredTab(DASHBOARD_TAB),
  anotherDashboardTab: filteredTab(ANOTHER_DASHBOARD_TAB)
});
```

#### `withMapStateReducer()`

```js
withMapStateReducer(
  mapStateBefore: ?(stateBefore: any) => newStateBefore,
  mapStateAfter: ?(stateAfter: any) => newStateAfter,
  actionTypes: ?Array<string>
): (reducer) => reducer
```

Creates a higher-order reducer which maps state before and after passing
to a reducer, but does it only for passed action types.

Useful when you want reuse your reducer on state, which has another format.

##### Example

Lets say we have reducer which handles list of objects, but we want to use
it on subtree, which is only one object.

```js
import listReducer from 'listReducer';

const objectReducer = withMapStateReducer(
  (obj) => [obj],
  (list) => list[0]
)(listReducer);
```

#### `withPayloadReducer()`

```js
withPayloadReducer(
  actionType: String,
  mapResult: ?(resultBefore: any) => resultAfter
): (reducer) => reducer
```

Creates a higher-order reducer which returns the payload of the action
for the given action type. Before returning it maps result `mapResult` function, which
is useful when you deal with immutable data structures in your store.

### Helper Reducers

#### `nullReducer`

```js
nullReducer: reducer
```

A reducer which returns `null` as the initial state.

## Examples of higher-order reducers

Please take a look at code of ready-to-use higher-order reducers.

## Example of how to compose higher-order reducers

```js
// You can import compose() function from any package, which provides it,
// for example from https://github.com/acdlite/recompose or Redux itself,
// or flow()/flowRight() from lodash
import { compose } from 'wherever';
import { nullReducer, withPayloadReducer, withResetReducer } from 'redux-reuse';

const reducer = compose(
  withPayloadReducer(LOAD_ACTION),
  withResetReducer(RESET_STATE_ACTION)
)(nullReducer);

```
