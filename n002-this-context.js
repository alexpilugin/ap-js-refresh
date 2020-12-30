/**
 * Run from CLI: $ node n002-this-context.js
 * 
 * Lesson 2. JavaScript. 
 * What is this. How work call, bind, apply
 * https://youtu.be/UGapN-hrekw
 */
;( () => {
  'use strict';
  console.log("IIFE: self executing function...")
  console.log(this); // {} // a global or a window in browsers
})()

const person = {
  name: "Person",
  age: 25,
  log() {
    console.group(`${ this.name } info:`)
    console.log(`name: ${this.name}`)
    console.log(`age: ${this.age}`)
    console.groupEnd()
  },
  logExt(job, phone) {
    console.group(`${ this.name } logExt:`)
    console.log(`name: ${this.name}`)
    console.log(`age: ${this.age}`)
    console.log(`job: ${job}`)
    console.log(`phone: ${phone}`)
    console.groupEnd() 
  }
}
console.log(person)
person.log()
person.logExt('unemployed', 'no number')

const arr = [1,2,3,4,5]

function multify(arr,n) {
  return arr.map(i => i * n)
}
console.log(multify(arr, 10))

//prototype with 'this' pointer
Array.prototype.multify = function(n) {
  return this.map(i => i * n)
}
console.log([5,8,13].multify(15))

// METHOD BORROWING ---------------------------------------------------

const lena = {
  name: "Lena",
  age: 35,
}

console.log('bind: --------------------------')
person.log.bind(lena)() // bind() returns a new function
const logExtLena = person.logExt.bind(lena, 'Frontend', '08-098-7654')
logExtLena()

console.log('call: --------------------------')
person.logExt.call(lena, 'Applicant', 'not provided') // with a list of arguments

console.log('apply: --------------------------')
person.logExt.apply(lena, ['Unemployed', 'Lost']) // with an Array

person.logExt.apply({}, ['--', '---']) // with an Array

