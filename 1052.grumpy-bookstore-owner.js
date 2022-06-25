// 1052. Grumpy Bookstore Owner
// There is a bookstore owner that has a store open for n minutes. Every minute, some number of customers enter the store. You are given an integer array customers of length n where customers[i] is the number of the customer that enters the store at the start of the ith minute and all those customers leave after the end of that minute.
// On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where grumpy[i] is 1 if the bookstore owner is grumpy during the ith minute, and is 0 otherwise.
// When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.
// The bookstore owner knows a secret technique to keep themselves not grumpy for minutes consecutive minutes, but can only use it once.
// Return the maximum number of customers that can be satisfied throughout the day.


// Solution: Sliding Window

// Maintain a sliding window of size "minutes", where the owner is not grumpy within this window.
// In a window, the customers we can satisfy are:
  // All customers inside the window regardless of the owner's grumpiness.
  // All customers outside the window where the owner is naturally not grumpy.

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 44.5MB
var maxSatisfied = function(customers, grumpy, minutes) {
  let count = 0, n = customers.length;
  for (let i = 0; i < n; i++) {
    if (grumpy[i] === 0) count += customers[i];
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (grumpy[i]) count += customers[i];
    if (i >= minutes) { // shift out the customers on the left
      if (grumpy[i - minutes]) count -= customers[i - minutes];
    }
    if (i >= minutes - 1) ans = Math.max(ans, count); 
  }
  return ans;
};

// Two test cases to run function on
console.log(maxSatisfied([1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3)) // 16
console.log(maxSatisfied([1], [0], 1)) // 1