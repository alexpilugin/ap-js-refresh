/**
 * Run from CLI: $ node n007-array-methods.js
 * 
 * Based on Lesson 12. Array Methods (forEach, map, filter, reduce, find, findIndex)
 * https://youtu.be/nEabP9CYCAQ
 * and
 * https://javascript.info/array-methods
 */
const people = [{
    id: 1,
    forename: 'John',
    surname: 'Smith',
    age: 40,
    budget: 40000
  },
  {
    id: 2,
    forename: 'Alex',
    surname: 'Paper',
    age: 17,
    budget: 3400
  },
  {
    id: 3,
    forename: 'Ivan',
    surname: 'Cox',
    age: 24,
    budget: 17000
  },
  {
    id: 4,
    forename: 'Simon',
    surname: 'Bell',
    age: 16,
    budget: 26000
  },
  {
    id: 5,
    forename: 'Richard',
    surname: 'Lincoln',
    age: 44,
    budget: 55800
  },
  {
    id: 6,
    forename: 'Eddie',
    surname: 'Fisher',
    age: 57,
    budget: 87320
  },
]

// Sorting
const sortByAgeAsc = (a, b) => a.age === b.age ? 0 : (a.age < b.age ? -1 : 1)
const sortByAgeDesc = (a, b) => a.age === b.age ? 0 : (a.age < b.age ? 1 : -1)

const sortByBudgetAsc = (a, b) => a.budget === b.budget ? 0 : (a.budget < b.budget ? -1 : 1)
const sortByBudgetDesc = (a, b) => a.budget === b.budget ? 0 : (a.budget < b.budget ? 1 : -1)

// Shuffle
const shuffle = () => 0.5 - Math.random()
people.sort(shuffle)
console.log('shuffled array\n', people)

// 1. sort ascending by age
people.sort(sortByAgeAsc)
console.log('sort ascending by age\n', people)

// 2. sort descending by age
people.sort(sortByAgeDesc)
console.log('sort descending by age\n', people)

// 3. sort ascending by budget
people.sort(sortByBudgetAsc)
console.log('sort ascending by budget\n', people)

// 4. sort descending by budget
people.sort(sortByBudgetDesc)
console.log('sort descending by budget\n', people)

// Slice / Splice
console.log('people.slice(-1)', people.slice(-1)) // [ { name: 'Richard', age: 44, budget: 55800 } ]
let shallowCopy = people.slice();



// Iterate through the array

// ES5
for (let i = 0; i < people.length; i++) {
  // console.log(people[i])
}
// ES6
for (let person of people) {
  // console.log(person)
}
// ForEach
people.forEach(function (person, index, pArr) {
  // console.log(index, person)
})
people.forEach((p, i) => console.log('forEach', i, p))

// Map
const shallowCopiedPeople = people.map(person => person);
//console.log(shallowCopiedPeople);

const newArr = people.map((p, i) => {
  return {
    idx: i,
    name: `${p.forename} ${p.surname}`
  }
});
console.log(newArr)

console.log(people.map(p => p.forename).join()) // String: John,Alex,Ivan,Simon,Richard,Eddie

// Filter
const adults = people.filter(person => person.age >= 18)
console.log('adults:\n', adults)
const youth = people.filter(person => person.age < 18)
console.log('youth:\n', youth)

// Reduce
let total = 0
for (let i = 0; i < people.length; i++) {
  total += people[i].budget
}
console.log('total: ', total)

const startValue = 0
const amount = people.reduce((acc, person) => acc + person.budget, startValue)
console.log('amount: ', amount)

// Find
const alex = people.find(person => person.forename === 'Alex')
console.log('alex:\n', alex)

// FindIndex
const alexIndex = people.findIndex(person => person.forename === 'Alex')
console.log('current alexIndex: ', alexIndex)

// Example of use method chaining
const filteredInfo = people
  .filter(person => person.budget > 5000)
  .map(person => {
    return {
      info: `${person.forename} ${person.surname} (${person.age})`,
      budget: person.budget
    }
  })
  .sort(sortByBudgetDesc)
console.log('filteredInfo:\n', filteredInfo)

const totalOfFiltered = filteredInfo.reduce((total, person) => total + person.budget, 0)
console.log('totalOfFiltered:', totalOfFiltered)

