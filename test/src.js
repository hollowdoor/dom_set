import {
    domListOf,
    addElements,
    removeElements,
    select,
    selectAll
} from '../';

console.log(select('body'));
console.log(selectAll('p'));

function MyOperator(elements){
    this.elements = domListOf(elements);
}

MyOperator.prototype.add = function(elements){
    addElements(this.elements, elements);
    return this;
};
MyOperator.prototype.remove = function(elements){
    return removeElements(this.elements, elements);
};
//All operations can take elements, or selectors.
const things = [document.querySelector('.thing1'), '.thing2'];
const myOps = new MyOperator(things);
myOps.add(document.querySelector('.thing3'));
console.log(myOps.elements)
myOps.remove('.thing1');
console.log(myOps.elements)
