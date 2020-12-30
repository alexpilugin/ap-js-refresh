/**
 * Run from CLI: $ node objects.js
 * 
 * Difference between Object.getOwnPropertyNames and Object.keys
 * https://stackoverflow.com/questions/22658488/object-getownpropertynames-vs-object-keys
 * Object.keys(a) returns all enumerable own properties. 
 * It means that if you define your object properties without making some of them enumerable: false these two methods will give you the same result.
 */

console.log("a: --------------------------")
const a = {
  'first-prop': 1,
  'second-prop': 2
}
console.log(Object.keys(a)) // [ 'first-prop', 'second-prop' ]
console.log(Object.getOwnPropertyNames(a)) // [ 'first-prop', 'second-prop' ]

console.log("b: --------------------------")
const b = {} // const <-------------
Object.defineProperties(b, {
  one: {enumerable: true, value: 1}, // enumerable: true
  two: {enumerable: false, value: 2}, // enumerable: false
});
console.log( Object.keys(b) ) // [ 'one' ]
console.log( Object.getOwnPropertyNames(b) ) // [ 'one', 'two' ]

console.log("arr: --------------------------")
const arr = ["a", "b", "c", "d"];
console.log( Object.keys(arr) ) // [ '0', '1', '2', '3' ]
// Extra property 'length':
console.log( Object.getOwnPropertyNames(arr) ) // [ '0', '1', '2', '3', 'length' ] 

// METHOD BORROWING -----------------
// unsafe 'method borrowing'
// if obj has its own join() method it will be replaced:
var obj = {
  0: "А",
  1: "Б",
  2: "В",
  length: 3
};
// unsafe method borrowing:
obj.join = [].join; // obj.join method will be replaced!
console.log( obj.join(';')) // А;Б;В

// safe method borrowing:
var joinFromArr = [].join;
console.log( joinFromArr.call(obj, ';')) // А;Б;В

// call
console.log([].join.call(obj, '..')) // А..Б..В
// apply (array)
console.log( [].join.apply(obj, ['-']) ) // А-Б-В
