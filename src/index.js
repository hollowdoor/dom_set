import {
    indexOfElement,
    hasElement,
    domListOf,
    concatElementLists,
    addElements,
    removeElements,
    resolveElement
} from './lib/operations';

import {createPrivates, arrayFrom, internalIsNaN} from './lib/utils';

const privates = createPrivates();
const _=inst=>privates.get(inst);

export function initDomFamily(context, arr){
    const list = domListOf(arr);

    privates.set(context, {
        elements: list
    })

    Object.defineProperty(context, 'size', {
        get: function(){
            return _(context).elements.length;
        }
    });

    context[Symbol ? Symbol.iterator : '@@iterator'] = function(){
        let index = -1;
        return {
            next(){
                if(++index === context.size){
                    return {done: true};
                }

                return {done: false, value: _(context).elements[index]};
            }
        };
    };

    return arrayFrom(list);
}

export function domFamilyMixin(proto){

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

export function getMethod(index){
    if(internalIsNaN(index)){
        return arrayFrom(_(this).elements);
    }

    return _(this).elements[parseInt(index)];
}

export function valuesMethod(){
    return arrayFrom(_(this).elements);
}

export function indexOfMethod(element){
    return indexOfElement(_(this).elements, element);
}

export function hasMethod(element){
    return hasElement(_(this).elements, element);
}

export function addMethod(...toAdd){
    addElements(_(this).elements, ...toAdd);
    return this;
}

export function removeMethod(...toRemove){
    return removeElements(_(this).elements, ...toRemove);
}

export function removeAllMethod(){
    let list = [];
    let elements = _(this).elements;

    if(!elements.length){
        return list;
    }

    list = arrayFrom(elements);

    _(this).elements = [];

    return list;
}

export function forEachMethod(cb, context){
    return _(this).elements.forEach(cb, context || this);
}


export * from './lib/operations';
