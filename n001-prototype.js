/**
 * Run from CLI: $ node n001-prototype.js
 * 
 * Lesson 1. What is a PROTOTYPE? JavaScript Tutorial
 * https://youtu.be/aQkgUUmUJy4
 * 
 */
const person = {
  name: 'Maxim',
  age: 25,
  greet: function() {
    console.log('Greet!')
  }
}
console.log(person)
console.log(person.__proto__.toString()); // [object Object]

const newPerson = new Object({
  name: 'Maxim',
  age: 25,
  greet: function() {
    console.log('Greet!')
  } 
})
console.log(person === newPerson); // false

//Extend a base Prototype for all objects
Object.prototype.sayHello = function() {
  console.log('Hello!')
}

person.sayHello(); // from a Prototype
console.log(newPerson.__proto__); // { sayHello: [Function] }
newPerson.__proto__.sayHello(); // Hello!

const lena = Object.create(person)
lena.name = 'Elena'
console.log(lena)

class NewPerson {
  type = 'human'
  constructor(name) {
    this.name = name
  }
  greet() {
    console.log(this.name + ' says hello!')
  }
}
const max = new NewPerson('Max')
max.greet() // Max says hello!
console.log(max) // NewPerson { type: 'human', name: 'Max' }

// ES6 Classes
class Parent {
  method() {
    console.log('parent method');
  }
}

// Inheritance
class Child extends Parent {
  method() {
    console.log('child method');
  }
  invokeParentMethod() {
    super.method();
  }
}

const c = new Child();
c.method(); // child method
c.invokeParentMethod(); // parent method

const str = 'I am a string'
const str2 = new String('I am a string too')
str.sayHello() // from Object

String.prototype.printReverse = function() {
  // https://www.techiedelight.com/reverse-string-javascript/
  const reverse = str.split('').reverse().join('');
  console.log(reverse);
}
str2.printReverse()

//Extend a String, instead of just adding a method to String itself:
class MyString extends String {
  getCharCodes() {
    return [...this].map(char => char.charCodeAt()) // this.split('').map()
  };
  shuffle() {
    return this.split('').sort(() => 0.5-Math.random()).join(''); 
  };
  getUnique() {
    return [...new Set(this)].join('') // or: return ''.concat(...new Set(this))
  };
  hasOnlyUnique() {
    var uniques = [...new Set(this)].join('')
    return uniques.length == this.length ? true : false;
  }
}

const myStr = new MyString('I am a string extention')
console.log(myStr) // [String (MyString): 'I am a string extention']
console.log(myStr.getCharCodes())
console.log(myStr.shuffle())
console.log(myStr.getUnique())

console.log(myStr.hasOnlyUnique()) // false
console.log(myStr.hasOnlyUnique.apply('abcdefg')) // true