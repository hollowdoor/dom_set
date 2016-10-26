import isElement from 'iselement';

export function indexOfElement(elements, element){
    if(!isElement(element)) return -1;
    for(let i=0; i<elements.length; i++){
        if(elements[i] === element){
            return i;
        }
    }
    return -1;
}

export function resolveElement(element){
    if(typeof element === 'string'){
        try{
            return document.querySelector(element);
        }catch(e){
            throw e;
        }

    }

    if(!isElement(element)){
        throw new TypeError(`${element} is not a DOM element.`);
    }
    return element;
}

function domListOf(arr){

    if(!arr) return [];

    try{
        if(Object.prototype.toString(arr) === '[object Array]'){
            return arr.map(resolveElement);
        }else{
            if(typeof arr.length === 'undefined'){
                return resolveElement(arr);
            }
            let arrayFrom = Array.from;
            if(typeof arrayFrom === 'function'){
                return Array.from(arr, resolveElement);
            }else{
                return Array.prototype.slice.call(arr).map(resolveElement);
            }

        }
    }catch(e){
        throw new Error(e);
    }

}

export function initElementList(arr, context){
    let list = domListOf(arr);
    if(context){
        context.elements = list;
    }
    return list;
}

function addElements(elements, ...toAdd){
    return toAdd.map(resolveElement).forEach(e=>{
        let index = indexOfElement(elements, e);

        if(index === -1)
            elements.push(e);
    });
}

function removeElements(elements, ...toRemove){
    return toRemove.map(resolveElement).reduce((last, e)=>{

        let index = indexOfElement(elements, e);

        if(index !== -1)
            return last.concat(elements.splice(index, 1));
        return last;
    }, []);
}

export function createAddMethod(){
    return function add(...toAdd){
        try{
            addElements(this.elements, ...toAdd);
        }catch(e){ throw e; }

        return this;
    };
}

export function createRemoveMethod(){
    return function remove(...toRemove){
        try{
            return removeElements(this.elements, ...toRemove);
        }catch(e){ throw e; }
    };
}
