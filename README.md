# redux-reuse

## This project in phase of active development, so something described below can not be available in the moment

redux-reuse is a [Redux](https://github.com/reactjs/redux "Redux")-related project, which includes `extendReducer()` helper function, which helps make your reducers code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"), based on approach of high-level reducers, as well as set of common reducer *extenders*, ready to use in your Redux application.
```
npm install redux-reuse --save
```

It is very common situation when different reducers should react in same way on same action, one of the solution to achieve code reuse in such a case is organise common logic in high-level reducer, but it will lead us to deeper state tree.
Actually we just want that our reducers will apply common logic on existent state subtree, which they manage and thats all. Here `extendReducer()` helper comes into play.

Using `extendReducer()` it is pretty simple to write composable extenders for your Redux application, in fact most of reducers can be presented as composition of common extenders.

## List of extenders

## Examples of extender code
## Examples of how to use extenders in reducers
