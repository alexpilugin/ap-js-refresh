/**
 * Run from CLI: $ node n004-async.js
 * 
 * Based on Lesson 4. JavaScript. Asynchrony, Event Loop. JS SetTimeout 0
 * https://youtu.be/vIZs5tH-HGQ
 */

// Synchronous output
console.log('Start 1')
console.log('Start 2')

// Asynchronous output
setTimeout(() => {
  console.log('inside timeout, after 2000 secs');
}, 2000) 

function printTimeout(mSec) {
  console.log(`timeout ${mSec} msec`)
}
setTimeout( () => printTimeout(3500), 3500) // timeout 3500 msec
console.log('End')

// WHAT WG: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html
const ms4000 = 4000;
setTimeout(printTimeout, ms4000, ms4000); // timeout 4000 msec

const ms5000 = 5000;
//Use bind() to return a function with parameters
setTimeout(printTimeout.bind(null, ms5000), ms5000); // timeout 5000 msec

function printMsg(message) {
  console.log(message)
}
function printWithDelay(ms) {
  setTimeout(printMsg, ms, `Hello after ${ms} ms`);
}
printWithDelay(350)

/** 
 * Event Loop Demo: http://latentflip.com/loupe/ 
 * from JSConf: https://youtu.be/8aGhZQkoFbQ
 */

/**
 * JS SetTimeout Zero
 */
console.log('JS SetTimeout Zero: ------------------------------')

console.log('Start') // sync Call Stack
setTimeout(() => { console.log('Inside timeout 0'); }, 0) // last in the Callback Queue
console.log('Step 1') // sync Call Stack
console.log('Step 2') // sync Call Stack
console.log('End') // sync Call Stack
// from the Callback Queue to the Call Stack

/* Output:
Start
Step 1
Step 2
End
Inside timeout 0
*/