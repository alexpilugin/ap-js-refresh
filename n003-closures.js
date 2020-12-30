/**
 * Run from CLI: $ node n003-closures.js
 * 
 * https://stackoverflow.com/questions/53899827/are-closures-higher-order-functions
 * 
 * Closures are higher order functions. They are functions that return a function.
 * A Higher order function is defined as a function that takes a function as an argument and/or returns a functions as return value.
 *
 * A closure generally is a function that has access to the declaration context's scope.
 * To be more concrete: A closure is actually a concept of binding a current scope to a subcontext. 
 * 
 * A Higher-Order function is a function that receives a function as an argument or returns the function as output.
 * 
 * Based on Lesson 3. JavaScript. Closures
 * https://youtu.be/pahO5XjnfLA
 */

function getAdd100(n) {
  return function () {
    console.log(100 * n);
  }
}

const add100 = getAdd100(13)
add100() // 1300
add100() // 1300

function getCounter(n) {
  let m = 0
  return function () {
    console.log(m += n)
  }
}
const counterBy5 = getCounter(5)
counterBy5() // 5
counterBy5() // 10
counterBy5() // 11

function createIncrementor(n) {
  return function (num) {
    return n + num
  }
}

const addOne = createIncrementor(1)
console.log(addOne(10)) // 11
console.log(addOne(20)) // 21
console.log(addOne(30)) // 31


function getHeader(text) {
  return () => console.log(`<h1>${text}</h1>`)
}

const printMainHeader = getHeader('Main Header');
printMainHeader()
printMainHeader()

// wrapper
function wrap(el) {
  return content => console.log(`<${el}>${content}</${el}>`)
}
const placeInSpan = wrap('span');
placeInSpan('Hello') // <span>Hello</span>
placeInSpan('Content') // <span>Content</span>

const placeInArticle = wrap('article');
placeInArticle('Long text...') // <article>Long text...</article>

function urlGenerator(domain) {
  return function (url) {
    return `https://${url}.${domain}`
  }
}
const comURL = urlGenerator('com')
console.log(comURL('google')) // https://google.com
console.log(comURL('abc')) // https://abc.com

const getCoUkUrl = urlGenerator('co.uk')
console.log(getCoUkUrl('apple')) // https://apple.co.uk
console.log(getCoUkUrl('bbc')) // https://bbc.co.uk

/* 
  Task: write your own bind() function and use it with next data:

  function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
  }
  const person1 = {name: 'Michael', age: 30, job: 'Web Developer'}
  const person2 = {name: 'Kate', age: 25, job: 'Tester'}

  bind(person1, logPerson)
  bind(person2, logPerson)
*/
console.log('bind: -------------------------')

function bind(context, fn) {
  return function (...args) {
    fn.apply(context, args)
  }
}

function logPerson() {
  console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}
const person1 = {
  name: 'Michael',
  age: 30,
  job: 'Web Developer'
}
const person2 = {
  name: 'Kate',
  age: 25,
  job: 'Tester'
}

bind(person1, logPerson)() // Person: Michael, 30, Web Developer

const logPerson2 = bind(person2, logPerson)
logPerson2() // Person: Kate, 25, Tester
logPerson2() // Person: Kate, 25, Tester
