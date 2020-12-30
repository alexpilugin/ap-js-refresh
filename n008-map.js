/**
 * Run from CLI: $ node n008-map.js
 * 
 * Based on Lesson 13. Map, Set, WeakMap, WeakSet with examples 
 * https://youtu.be/mbcP3Oc0PjU
 * and
 * https://javascript.info/map-set
 * and
 * https://javascript.info/weakmap-weakset
 */
const obj = {
  name: 'Ivan',
  age: 27,
  job: 'Frontend'
}
const entries = [
  ['name', 'Ivan'],
  ['age', 27],
  ['job', 'Frontend']
]

// [ [ 'name', 'Ivan' ], [ 'age', 27 ], [ 'job', 'Frontend' ] ]
console.log(Object.entries(obj))

// { name: 'Ivan', age: 27, job: 'Frontend' }
console.log(Object.fromEntries(entries))

const map = new Map(entries)
// Map { 'name' => 'Ivan', 'age' => 27, 'job' => 'Frontend' }
console.log(map)

console.log(obj.job) // Frontend
console.log(map.get('job')) // Frontend

map.set('newField', 42) // key is string

console.log(map)
/* Otput:
Map {
  'name' => 'Ivan',
  'age' => 27,
  'job' => 'Frontend',
  'newField' => 42
}
*/

// keys can be objects
map
  .set(obj, 'Value of object')
  .set(NaN, 'NaN ??')

console.log(map.get(NaN)) // NaN ??

console.log(map.has('job')) // true // 'job' is key
console.log(map.delete(NaN)) // true
console.log(map.has(NaN)) // false

console.log(map.size) // 5 // How many keys (records)
// map.clear()
// console.log(map.size) // 0

// Iteration

for (let entry of map.entries()) {
  console.log(entry)
}

for (let [key, value] of map) {
  console.log(key, value)
}

for (let val of map.values()) {
  console.log(val)
}

for (let key of map.keys()) {
  console.log(key)
}

map.forEach( (val, key, m) => {
  console.log(key, '=>', val)
})

// Convert to Array
const array = [...map]
const arr = Array.from(map)

// Convert to Object
const mapObject = Object.fromEntries(map.entries())
console.log('mapObject:\n', mapObject)
/* mapObject:
  {
    name: 'Ivan',
    age: 27,
    job: 'Frontend',
    newField: 42,
    '[object Object]': 'Value of object' <------------- '[object Object]'
  }
*/

const users = [
  {name: 'Elena'},
  {name: 'Alex'},
  {name: 'Ivan'}
]

const visits = new Map() // log of user visits
visits
  .set(users[0], new Date())
  .set(users[1], new Date(new Date().getTime() + 1000 * 60))
  .set(users[2], new Date(new Date().getTime() + 5000 * 60))

function lastVisit(user) {
  return visits.get(user) // return value, object as a key
}
console.log(`Last visit of ${users[2].name}:`, lastVisit(users[2]).toLocaleString())

const objects = [
  {key: 1, value: 10},
  {key: 2, value: 20},
  {key: 1, value: 30},
  {key: 2, value: 40}
]
console.log('objects:\n', objects)

function mapFromObjArray(array) {
  return new Map(array.map(i => [i.key, i.value]));
}

const objMap = mapFromObjArray(objects)
console.log('objMap: ', objMap) // Map { 1 => 30, 2 => 40 } // keys must be unique
