/**
 * Run from CLI: $ node n009-set.js
 * 
 * Based on Lesson 13. Map, Set, WeakMap, WeakSet with examples 
 * https://youtu.be/mbcP3Oc0PjU
 * and
 * https://javascript.info/map-set
 * and
 * https://javascript.info/weakmap-weakset
 */

// Set (set of unique values) ==========================================

const set = new Set([1, 2, 3, 3, 3, 3, 4, 5, 5, 6])
console.log(set) // Set { 1, 2, 3, 4, 5, 6 }

set.add(10).add(20).add(30).add(20)
console.log(set) // Set { 1, 2, 3, 4, 5, 6, 10, 20, 30 }

console.log('set.has(42):', set.has(42)) // false
console.log('set.size', set.size) // 9
console.log('set.delete(1):', set.delete(1)) // true
console.log('set.size', set.size) // 8
//set.clear() // empty

console.log('set.values():', set.values()) // [Set Iterator] { 2, 3, 4, 5, 6, 10, 20, 30 }
console.log('set.keys():', set.keys()) // [Set Iterator] { 2, 3, 4, 5, 6, 10, 20, 30 }

console.log(set.entries())
/*
[Set Entries] {
  [ 2, 2 ],
  [ 3, 3 ],
  [ 4, 4 ],
  [ 5, 5 ],
  [ 6, 6 ],
  [ 10, 10 ],
  [ 20, 20 ],
  [ 30, 30 ]
}
*/

// Iteration
for ( let key of set) {
  //console.log(key) // key === value
}

// Using Set for Unique Primitive Values in an Array
const getUniqueValues = array => [...new Set(array)] // Array.from(new Set(array))

function hasOnlyUnique(array) {
  const uniques = [...new Set(array)]
  return uniques.length === array.length
}

const onlyUnique = getUniqueValues(['a', 'b', 'a', 'b'])
console.log('onlyUnique:', onlyUnique)

console.log('hasOnlyUnique:', hasOnlyUnique(['a', 'b', 'a', 'b'])) // false
console.log('hasOnlyUnique:', hasOnlyUnique(['a', 'b', 'c'])) // true

