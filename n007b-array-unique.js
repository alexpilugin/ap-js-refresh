/**
 * Run from CLI: $ node n007b-array-unique.js
 * Get all unique values in an Array (remove duplicates)
 */

const visitors = ['Alex', 'John', 'Marc', 'John']

// 1.
function onlyUniqueWithSet(arr) {
  return [...new Set(arr)]
}
console.log('1. onlyUniqueWithSet:', onlyUniqueWithSet(visitors))

// 2.
function onlyUniqueFilterFn(value, index, self) {
  return self.indexOf(value) === index;
}
var uniqueFilteredVisitors = visitors.filter(onlyUniqueFilterFn);
console.log('2. uniqueFilteredVisitors:', uniqueFilteredVisitors)

// Unique property values of an array of objects

const animals = [
  { name: 'fox', amount: 10 },
  { name: 'rabbit', amount: 3 },
  { name: 'mouse', amount: 6 },
  { name: 'owl', amount: 2 },
  { name: 'fox', amount: 1 } // extra fox
]

// 3.
const uniqueAnimalNames = [...new Set(animals.map(a => a.name))]
console.log('3. uniqueAnimalNames', uniqueAnimalNames)

const addresses = [
  { id: 1, street: 'High Street',city: 'London' },
  { id: 2, street: 'District Road', city: 'Birmingham'},
  { id: 3, street: 'Rue Depont', city: 'Brussels'},
  { id: 1, street: 'High Street', city: 'London'},
  { id: 1, street: 'High Street', city: 'London'}
]

// 4. with .filter, .map, .indexOf
function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, self) => {
    return self.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

const uniqueAnimals = removeDuplicates(animals, 'name')
console.log('4. uniqueAnimals:\n', uniqueAnimals)
console.log("4. removeDuplicates(addresses, 'id'):\n", removeDuplicates(addresses, 'id'))
console.log("4. removeDuplicates(addresses, 'city'):\n", removeDuplicates(addresses, 'city'))
console.log("4. removeDuplicates(addresses, 'not-existing-prop'):\n", removeDuplicates(addresses, 'not-existing-prop')) //undefined === undefined

// 5. with .filter, .findIndex
function getUniqueByProp(myArr, prop) {
  return myArr.filter((el, idx, self) => {
    let index = self.findIndex(obj => obj[prop] === el[prop]) // issue: undefined == undefined
    // console.log(index, idx)
    return index === idx
  })
}

const uniqueAnimals2 = getUniqueByProp(animals, 'name')
console.log('5. uniqueAnimals2:\n', uniqueAnimals2)

console.log("5. getUniqueByProp(addresses, 'city'):\n", getUniqueByProp(addresses, 'city'))
console.log("5. getUniqueByProp(addresses, 'id'):\n", getUniqueByProp(addresses, 'id'))
console.log("5. getUniqueByProp(addresses, 'not-existing-prop'):\n", getUniqueByProp(addresses, 'not-existing-prop')) // [] undefined === undefined


// https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
// 6. with Set, .map, .find
function getUniqueFromArrayByProp(arr, prop) {
  return [...new Set(arr.map(el => el[prop]))]
    //.map(uniqPropVal => arr.find(el => el[prop] === uniqPropVal)) // find first : undefined === undefined === true
    .map(uniqPropVal => arr.find(el => el[prop] === undefined ? false : el[prop] === uniqPropVal)) // improvement
    /*
    .map(uniqPropVal => {
      return arr.find(el => {
        console.log(uniqPropVal, el[prop], el[prop] === uniqPropVal)
        return el[prop] === undefined ? false : el[prop] === uniqPropVal
      })
    })
    */
}

const uniqueAnimals3 = getUniqueFromArrayByProp(animals, 'name')
console.log('6. uniqueAnimals3:\n', uniqueAnimals3)

const uniqueAddrById = getUniqueFromArrayByProp(addresses, 'id')
console.log('6. by id:\n', uniqueAddrById)

const uniqueAddrByCity = getUniqueFromArrayByProp(addresses, 'city')
console.log('6. by city:\n', uniqueAddrByCity)

const addrByNotExistProp = getUniqueFromArrayByProp(addresses, 'not-existing-prop')
console.log("6. by 'not-existing-prop':\n", addrByNotExistProp)

// 7. My final solution with .filter, .findIndex
function getUniqueByPropFixed(myArr, prop) {
  return myArr.filter((el, idx, self) => {
    let index = self.findIndex(obj => obj[prop] === undefined ? false : obj[prop] === el[prop])
    return index === idx
  })
}
console.log("7. getUniqueByPropFixed(addresses, 'not-existing-prop'):\n", getUniqueByPropFixed(addresses, 'not-existing-prop')) // []