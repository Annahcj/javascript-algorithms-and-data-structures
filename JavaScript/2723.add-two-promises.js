// 2723. Add Two Promises
// Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve with a number. The returned promise should resolve with the sum of the two numbers.


// Solution: Promise.all

// Promise.all fulfills all promises in parallel.

var addTwoPromises = async function(promise1, promise2) {
  const [res1, res2] = await Promise.all([promise1, promise2]);
  return Promise.resolve(res1 + res2);
};