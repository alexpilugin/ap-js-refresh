/**
 * Run from CLI: $ node n006-async-await.js
 * 
 * Based on Lesson 8. JavaScript. About Async, Await, Fetch
 * https://youtu.be/SHiUyM_fFME
 * and
 * https://javascript.info/async-await
 */
const https = require('https')

const delay = (ms, result) => {
  return new Promise(resolve => setTimeout(() => resolve(result), ms))
}

function print(msg) {
  console.log(msg)
}
delay(2000).then(() => print('After 2 sec'))
delay(2000, 'Delay 2000 ms').then(r => print(r)) // Delay 2000 ms

const url = 'https://jsonplaceholder.typicode.com/todos'

/*
// From https://javascript.info/async-await
// anonymous async top-level function
(async () => {
  let response = await fetch(url);
  let json = await response.json();
})();
*/

/* 
// fetch() - ReferenceError: fetch is not defined
// fetch() is available only in browsers

function fetchTodos() {
  console.log('Fetch todo started...')
  return delay(2000)
    .then(() => fetch(url))
    .then(response => response.json())
}

fetchTodos()
  .then(data => {
    console.log('Data:', data)
  })
  .catch(err => console.error(err))

*/

// https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times
/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @param {Object} data
 * @return {Promise} a promise of request
 */
function httpsRequest(params, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(params, function (res) {

      // reject on a bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
      }

      // cumulate data
      var body = [];
      res.on('data', function (chunk) {
        body.push(chunk);
      });

      // resolve on end
      res.on('end', function () {
        try {
          body = Buffer.concat(body).toString();
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });

    // reject on request error
    req.on('error', function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    if (postData) {
      req.write(postData);
    };
    req.end(); // Important: close connection
  })
}

/* Use httpsRequest() fn with delay:

delay(2000).then(() => {
  const params = {
    host: 'jsonplaceholder.typicode.com',
    method: 'GET',
    path: '/todos'
  }
  httpsRequest(params)
    .then(data => {
      console.log('Data:', JSON.parse(data))
    })
    .catch(err => console.error(err))
})

*/

/* 
  async ensures that the function returns a promise, and wraps non-promises in it.
*/
async function f() {
  return 1;
}
f().then(d => console.log(d)); // 1

async function fn() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  return await promise; // wait until the promise resolves (*)
}
fn().then(result => console.log(result)); // done!

async function waitAll() {
  const done = await Promise.all([delay(1000, 'one'), delay(200, 'two')])
  console.log(done) // [ 'one', 'two' ]    /* since all promises resolved */
  return done.join()
}
waitAll().then(done => console.log(done)) // one,two

async function asyncRequest() {
  console.log('asyncRequest has started...')
  const params = {
    host: 'jsonplaceholder.typicode.com',
    method: 'GET',
    path: '/todos'
  }
  try {
    await delay(2000);
    return await httpsRequest(params)
  } catch (err) {
    console.error(err)
  } finally {
    console.log('finally')
  }
}

asyncRequest().then(data => {
  console.log('json: ', JSON.parse(data))
})
