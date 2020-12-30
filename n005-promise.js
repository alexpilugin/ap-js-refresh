/**
 * Run from CLI: $ node n005-promise.js
 * 
 * Based on Lesson 5. JavaScript. Promise
 * https://youtu.be/1idOY3C1gYU
 */
console.log('1. Request data from a server...')
const responceDelay = 1000

/* SITUATION 1. Callbacks ----------------------------------------------

// callback 1.
setTimeout(() => {
  console.log('2. Preparing data on the server...')
  const backendData = {
    server: 'aws',
    port: 8080,
    status: 'working'
  }
  // Nested callback 2.
  setTimeout(() => {
    backendData.modified = true
    console.log('3. Data received', backendData)
  }, responceDelay);
}, responceDelay);

*/

// SITUATION 2. Promises ----------------------------------------------

/*
const p = new Promise(function(resolve, reject) {
  setTimeout(() => {
    console.log('2p. Preparing data on the server in Promise...')
    const backendData = {
      server: 'aws',
      port: 8080,
      status: 'working'
    } 
    resolve(backendData) // work finished
  }, responceDelay); 
})

p.then( data => {
  console.log('3p. Promise resolved')

  const p2 = new Promise( (resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      data.status = 'done'
      resolve(data)
      //console.log('Data received in Promise', backendData)
    }, responceDelay);
  })

  p2.then(clientData => {
    console.log('4p. Data received from Promise', clientData)
  })
})
*/

// SITUATION 3. Chain of Promises. ----------------------------------------------
const startDate = new Date();
const response = new Promise(function(resolve, reject) {
  setTimeout(() => {
    let endDate = new Date();
    var diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(`2. Preparing data on the server in ${diffSec} sec...`)
    const backendData = {
      server: 'aws',
      port: 8080,
      status: 'working'
    } 
    resolve(backendData) // work finished
  }, responceDelay); 
})

// chaining 
response
.then( data => {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      data.modified = true // modification on this stage
      data.status = 'done'
      let endDate = new Date();
      var diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
      console.log(`3. Data sent to the client in ${diffSec} sec`, data)
      resolve(data)
      // Error: reject(data)
    }, responceDelay);
  })
})
.then(clientData => {
  let endDate = new Date();
  var diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
  console.log(`4. Client Data received in ${diffSec} sec` , clientData)
  clientData.fromPromise = true // modification on this stage
  return clientData
})
.then( modData => {
  let endDate = new Date();
  var diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
  console.log(`5. Completed in ${diffSec} sec`, modData)
})
.catch(err => console.log('Error: ', err))
.finally( () => {
  let endDate = new Date();
  var diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
  console.log(`6. Finally in ${diffSec} sec`)
})

const sleep = ms => new Promise( resolve => setTimeout( () => resolve(), ms ));
sleep(2000).then( () => console.log('After 2 sec'))
sleep(3000).then( () => console.log('After 3 sec'))

// After all ----------------------------------------------
const newStart = new Date();
Promise.all([
  sleep(2000),
  sleep(5000)
])
.then( () => {
  let endDate = new Date();
  var diffSec = (endDate.getTime() - newStart.getTime()) / 1000;
  console.log(`After all in ${diffSec} sec`) // After all in 5.006 sec
})

const raceStart = new Date();
Promise.race([sleep(2000), sleep(5000)])
.then( () => {
  // After first resolved Promise 
  let endDate = new Date();
  var diffSec = (endDate.getTime() - raceStart.getTime()) / 1000;
  console.log(`Race completed in ${diffSec} sec`) // Race completed in 2.005 sec
})