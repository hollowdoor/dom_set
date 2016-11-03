import isElement from 'iselement';
import arrayFrom from 'array-from';
import isArray from 'is-array';

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
        if (typeof arr === 'string') {
            return arrayFrom(document.querySelectorAll(arr));
        } else if (isArray(arr)) {
            return arr.map(resolveElement);
        } else {
            if (typeof arr.length === 'undefined') {
                return [resolveElement(arr)];
            }

            return arrayFrom(arr, resolveElement);
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

function pushElements(elements, toAdd) {

    for (var i = 0; i < toAdd.length; i++) {
        if (!hasElement(elements, toAdd[i])) elements.push(toAdd[i]);
    }

    return toAdd;
}

function addElements(elements) {
    for (var _len2 = arguments.length, toAdd = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        toAdd[_key2 - 1] = arguments[_key2];
    }

    toAdd = toAdd.map(resolveElement);
    return pushElements(elements, toAdd);
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

export { indexOfElement, hasElement, domListOf, concatElementLists, addElements, removeElements, resolveElement };
//# sourceMappingURL=bundle.es.js.map
