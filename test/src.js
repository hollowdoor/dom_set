import {initElementList, createAddMethod, createRemoveMethod} from '../';


let obj = {};
let elements = initElementList([], obj);
let thing1 = document.querySelector('.thing1');
let thing2 = document.querySelector('.thing2');
obj.add = createAddMethod();
obj.remove = createRemoveMethod();

obj.add(thing1);
obj.add(thing2);
console.log(elements)
obj.remove(thing1);
console.log(elements)
