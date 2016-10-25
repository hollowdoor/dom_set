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

export function domListOf(arr){

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

export function createAdder(elements){
    return function add(...toAdd){
        try{
            addElements(elements, ...toAdd);
        }catch(e){ throw e; }

        return this;
    };
}

export function createRemover(elements){
    return function remove(...toRemove){
        try{
            return removeElements(elements, ...toRemove);
        }catch(e){ throw e; }
    };
}
