'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isElement = _interopDefault(require('iselement'));

function indexOfElement(elements, element) {
    if (!isElement(element)) return -1;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] === element) {
            return i;
        }
    }
    return -1;
}

function resolveElement(element) {
    if (typeof element === 'string') {
        try {
            return document.querySelector(element);
        } catch (e) {
            throw e;
        }
    }

    if (!isElement(element)) {
        throw new TypeError(element + ' is not a DOM element.');
    }
    return element;
}

function domListOf(arr) {

    if (!arr) return [];

    try {
        if (Object.prototype.toString(arr) === '[object Array]') {
            return arr.map(resolveElement);
        } else {
            if (typeof arr.length === 'undefined') {
                return resolveElement(arr);
            }
            var arrayFrom = Array.from;
            if (typeof arrayFrom === 'function') {
                return Array.from(arr, resolveElement);
            } else {
                return Array.prototype.slice.call(arr).map(resolveElement);
            }
        }
    } catch (e) {
        throw new Error(e);
    }
}

function initElementList(arr, context) {
    var list = domListOf(arr);
    if (context) {
        context.elements = list;
    }
    return list;
}

function addElements(elements) {
    for (var _len = arguments.length, toAdd = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        toAdd[_key - 1] = arguments[_key];
    }

    return toAdd.map(resolveElement).forEach(function (e) {
        var index = indexOfElement(elements, e);

        if (index === -1) elements.push(e);
    });
}

function removeElements(elements) {
    for (var _len2 = arguments.length, toRemove = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        toRemove[_key2 - 1] = arguments[_key2];
    }

    return toRemove.map(resolveElement).reduce(function (last, e) {

        var index = indexOfElement(elements, e);

        if (index !== -1) return last.concat(elements.splice(index, 1));
        return last;
    }, []);
}

function createAddMethod() {
    return function add() {
        try {
            for (var _len3 = arguments.length, toAdd = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                toAdd[_key3] = arguments[_key3];
            }

            addElements.apply(undefined, [this.elements].concat(toAdd));
        } catch (e) {
            throw e;
        }

        return this;
    };
}

function createRemoveMethod() {
    return function remove() {
        try {
            for (var _len4 = arguments.length, toRemove = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                toRemove[_key4] = arguments[_key4];
            }

            return removeElements.apply(undefined, [this.elements].concat(toRemove));
        } catch (e) {
            throw e;
        }
    };
}

exports.indexOfElement = indexOfElement;
exports.resolveElement = resolveElement;
exports.initElementList = initElementList;
exports.createAddMethod = createAddMethod;
exports.createRemoveMethod = createRemoveMethod;
//# sourceMappingURL=bundle.js.map
