// 1052. Grumpy Bookstore Owner
// There is a bookstore owner that has a store open for n minutes. Every minute, some number of customers enter the store. You are given an integer array customers of length n where customers[i] is the number of the customer that enters the store at the start of the ith minute and all those customers leave after the end of that minute.
// On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where grumpy[i] is 1 if the bookstore owner is grumpy during the ith minute, and is 0 otherwise.
// When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.
// The bookstore owner knows a secret technique to keep themselves not grumpy for minutes consecutive minutes, but can only use it once.
// Return the maximum number of customers that can be satisfied throughout the day.


// Solution: Sliding Window

// Maintain a sliding window of `minutes` consecutive minutes.
// Keep track of the running sum of grumpy customers within the window - this is how much "extra" customers we will gain using the secret technique.
// Also count the total sum of non-grumpy customers as these are "free" without using the secret technique.
// At the end, return the non-grumpy customers plus the maximum grumpy customers within a window.

// n = number of customers
// Time Complexity: O(n) 60ms
// Space Complexity: O(1) 51.4MB
var maxSatisfied = function(customers, grumpy, minutes) {
  let n = customers.length, nonGrumpySum = 0;
  let grumpySum = 0, maxGrumpySum = 0;
  for (let i = 0; i < n; i++) {
    if (grumpy[i] === 1) {
      grumpySum += customers[i];
    } else {
      nonGrumpySum += customers[i];
    }
    if (i >= minutes) {
      grumpySum -= grumpy[i - minutes] === 1 ? customers[i - minutes] : 0;
    }
    maxGrumpySum = Math.max(maxGrumpySum, grumpySum);
  }
  return maxGrumpySum + nonGrumpySum;
};

// Two test cases 
console.log(maxSatisfied([1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3)) // 16
console.log(maxSatisfied([1], [0], 1)) // 1