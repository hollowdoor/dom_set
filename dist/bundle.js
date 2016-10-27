'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isElement = _interopDefault(require('iselement'));
var weakmap = require('weakmap');

function createPrivates() {
    return new weakmap.WeakMap();
}

var arrayFrom = function () {
    if (Array.from) {
        return Array.from;
    }
    return function (a, mapper, thisArg) {
        if (typeof mapper === 'function') {
            return Array.prototype.slice.call(a).map(mapper, thisArg);
        } else {
            return Array.prototype.slice.call(a);
        }
    };
}();

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
var internalIsNaN = function () {
    return Number.isNaN ? Number.isNaN : function (value) {
        return value !== value;
    };
}();

function indexOfElement(elements, element) {
    element = resolveElement(element, true);
    if (!isElement(element)) return -1;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] === element) {
            return i;
        }
    }
    return -1;
}

function hasElement(elements, element) {
    return -1 !== indexOfElement(elements, element);
}

function domListOf(arr) {

    if (!arr) return [];

    try {
        if (Object.prototype.toString(arr) === '[object Array]') {
            return arr.map(resolveElement);
        } else {
            if (typeof arr.length === 'undefined') {
                return [resolveElement(arr)];
            }

            return arrayFrom(arr, resolveElement);
            /*let arrayFrom = Array.from;
            if(typeof arrayFrom === 'function'){
                return Array.from(arr, resolveElement);
            }else{
                return Array.prototype.slice.call(arr).map(resolveElement);
            }*/
        }
    } catch (e) {
        throw new Error(e);
    }
}

function concatElementLists() {
    for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
    }

    return lists.reduce(function (last, list) {
        return list.length ? last : last.concat(domListOf(list));
    }, []);
}

function addElements(elements) {
    for (var _len2 = arguments.length, toAdd = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        toAdd[_key2 - 1] = arguments[_key2];
    }

    return toAdd.map(resolveElement).forEach(function (e) {
        var index = indexOfElement(elements, e);

        if (index === -1) elements.push(e);
    });
}

function removeElements(elements) {
    for (var _len3 = arguments.length, toRemove = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        toRemove[_key3 - 1] = arguments[_key3];
    }

    return toRemove.map(resolveElement).reduce(function (last, e) {

        var index = indexOfElement(elements, e);

        if (index !== -1) return last.concat(elements.splice(index, 1));
        return last;
    }, []);
}

function resolveElement(element, noThrow) {
    if (typeof element === 'string') {
        try {
            return document.querySelector(element);
        } catch (e) {
            throw e;
        }
    }

    if (!isElement(element) && !noThrow) {
        throw new TypeError(element + ' is not a DOM element.');
    }
    return element;
}

var privates = createPrivates();
var _ = function _(inst) {
    return privates.get(inst);
};

function initDomFamily(context, arr) {
    var list = domListOf(arr);

    privates.set(context, {
        elements: list
    });

    Object.defineProperty(context, 'size', {
        get: function get() {
            return _(context).elements.length;
        }
    });

    context[Symbol ? Symbol.iterator : '@@iterator'] = function () {
        var index = -1;
        return {
            next: function next() {
                if (++index === context.size) {
                    return { done: true };
                }

                return { done: false, value: _(context).elements[index] };
            }
        };
    };

    return arrayFrom(list);
}

function domFamilyMixin(proto) {

    proto.add = addMethod;
    //Like delete
    proto.remove = removeMethod;
    //Special methods
    promto.removeAll = removeAllMethod;
    proto.indexOf = indexOfMethod;
    proto.get = getMethod;
    //Normal Set like operations
    proto.values = valuesMethod;
    proto.has = hasMethod;
    proto.forEach = forEachMethod;
    proto.delete = removeMethod;
    proto.clear = removeAllMethod;

    return proto;
}

function getMethod(index) {
    if (internalIsNaN(index)) {
        return arrayFrom(_(this).elements);
    }

    return _(this).elements[parseInt(index)];
}

function valuesMethod() {
    return arrayFrom(_(this).elements);
}

function indexOfMethod(element) {
    return indexOfElement(_(this).elements, element);
}

function hasMethod(element) {
    return hasElement(_(this).elements, element);
}

function addMethod() {
    for (var _len = arguments.length, toAdd = Array(_len), _key = 0; _key < _len; _key++) {
        toAdd[_key] = arguments[_key];
    }

    addElements.apply(undefined, [_(this).elements].concat(toAdd));
    return this;
}

function removeMethod() {
    for (var _len2 = arguments.length, toRemove = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        toRemove[_key2] = arguments[_key2];
    }

    return removeElements.apply(undefined, [_(this).elements].concat(toRemove));
}

function removeAllMethod() {
    var list = [];
    var elements = _(this).elements;

    if (!elements.length) {
        return list;
    }

    list = arrayFrom(elements);

    _(this).elements = [];

    return list;
}

function forEachMethod(cb, context) {
    return _(this).elements.forEach(cb, context || this);
}

exports.initDomFamily = initDomFamily;
exports.domFamilyMixin = domFamilyMixin;
exports.getMethod = getMethod;
exports.valuesMethod = valuesMethod;
exports.indexOfMethod = indexOfMethod;
exports.hasMethod = hasMethod;
exports.addMethod = addMethod;
exports.removeMethod = removeMethod;
exports.removeAllMethod = removeAllMethod;
exports.forEachMethod = forEachMethod;
exports.indexOfElement = indexOfElement;
exports.hasElement = hasElement;
exports.domListOf = domListOf;
exports.concatElementLists = concatElementLists;
exports.addElements = addElements;
exports.removeElements = removeElements;
exports.resolveElement = resolveElement;
//# sourceMappingURL=bundle.js.map
