/**
 * Run from CLI: $ node n0007c-array-cloning.js
 * Based on https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
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

// JSON.parse and JSON.stringify (Deep copy)
let clonePeople = JSON.parse(JSON.stringify(people));

/* 
  Shallow copy
  This doesn’t safely copy multi-dimensional arrays. 
  Array/object values are copied by reference instead of by value.
  From: https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
*/

// Array.slice (Shallow copy)
let copyPeople = people.slice();

// Spread Operator (Shallow copy)
copyPeople = [...people];

// Array.concat (Shallow copy)
copyPeople = people.concat() //.concat([])

// Array.map (Shallow copy)
copyPeople = people.map((p) => p);

// Array.filter (Shallow copy)
copyPeople = people.filter(() => true);

// Array.from (Shallow copy)
copyPeople = Array.from(people)

// Array.reduce (Shallow copy)
copyPeople = people.reduce((newArray, element) => {
  newArray.push(element);
  return newArray;
}, []);


