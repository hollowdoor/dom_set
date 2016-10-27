import {initDomFamily, domFamilyMixin} from '../';


function myLib(elements){
    initDomFamily(this, elements);
}

domFamilyMixin(myLib.prototype);

let obj = new myLib();

let thing1 = document.querySelector('.thing1');
let thing2 = document.querySelector('.thing2');

obj.add(thing1);
obj.add(thing2);
console.log(obj.has(thing1))
console.log(obj.has(thing2))
obj.remove(thing1);
console.log(obj.has(thing1))
console.log(obj.has(thing2))
