Install
-------

`npm install --save dom-indexers`

The Explanation
---------------

This library is best used with [rollup](https://github.com/rollup/rollup).

`dom-indexers` is a collection of functions to extend other libraries that export instances of objects that have their own DOM operations.

There actually aren't any dom operations being done by this library. Only array collection operations that are meant for an array of DOM elements.

Usage
-----

```javascript
import {domListOf, createAdder, createRemover} from 'dom-indexers';

function myOperator(elements){
    elements = domListOf(elements); //An array of elements, or an element
    this.add = createAdder(elements);
    this.remove = createRemover(elements);
}
//All operations can take elements, or selectors.
const things = [document.querySelector('.thing1'), '.thing2'];
const myOps = myOperator(things);
myOps.add(document.querySelector('.thing3'));
myOps.remove('.thing1');

```

Available imports
-----------------

### domListOf(items|item)

```javascript
import {domListOf} from 'dom-indexers';
```

`items` should be an array of elements, or `item` should be an element.

### indexOfElement(elements, element)

```javascript
import {indexOfElement} from 'dom-indexers';
```

Find the index of `element` in `elements`.

### createAdder(elements) -> add(...items)

```javascript
import {createAdder} from 'dom-indexers';
```

Get a function that will add `items` to `elements`.

If any of the `items` are already in `elements` then the `add` function won't add them.

If the `add` function is assigned to an object when `add` is called it will return that object's `this` variable.

### createRemover(elements) -> remove(...items)

```javascript
import {createRemover} from 'dom-indexers';
```

Get a function that will remove `items` from `elements`.

The `remove` function returns an array of any removed elements if they were in `elements`.

Philosophy?
-----------

Essentially the functions exported from this library are decorators for an array of elements.

These operations are so common in libraries I figured why not make them once.

Another reason is compatibility. Many libraries that use collections of elements can have compatible interfaces. At least internally.

If you use rollup with rollup's tree shaking libraries can import just one, or any of these functions without bloat.

A Story
-------

Suppose this library is wildly successful. :)

Now suppose 20 composable DOM libraries use 2 of the same functions from this library.

You use rollup to compile your project using these 20 libraries. Now you have 20 libraries in your build with 2 extra functions shared with all 20 libraries.

That's what is possible with tree shaking.

As an aside that beast webpack will also have tree shaking. So there's that too.

Projects using dom-indexers
---------------------------

Nothing here yet.

Help this library
-----------------

Before you fork, and make any pull requests to add to this repo post an issue first.

1.	Leave an issue for any functions you would like to see added to this library.
2.	Make a pull request with a new function.
3.	If you have used this library in another library you can leave a notice in your own docs notifying compatibility with this one.
4.	Fork this and add your library to the list of projects using this one.
