// 1655. Distribute Repeating Integers
// You are given an array of n integers, nums, where there are at most 50 unique values in the array. You are also given an array of m customer order quantities, quantity, where quantity[i] is the amount of integers the ith customer ordered. Determine if it is possible to distribute nums such that:
  // The ith customer gets exactly quantity[i] integers,
  // The integers the ith customer gets are all equal, and
  // Every customer is satisfied.
// Return true if it is possible to distribute nums according to the above conditions.


// Solution: DP - Recursion w/ Memoization

// Count the occurance of each value in nums and take out the unique values into an array.

// Memoize each dp(i, mask), where
  // i = index in values
  // mask = bitmask of the customers we have taken so far
// For each dp(i, mask),
  // Try to assign the ith value to a subset of customers that haven't been taken yet.
  // To try each subset, loop over every possible bitmask from 0 to 2^m.
  // For each bitmask, count the sum of quantity. It is only valid is less than or equal to the frequency of the value.

// n = number of unique values, m = number of customers
// Time Complexity: O(n * 2^m * 2^m) 3987ms
// Space Complexity: O(n * 2^m) 57.6MB
var canDistribute = function(nums, quantity) {
  let count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  let values = Object.keys(count);
  let n = values.length, m = quantity.length, allUsed = (1 << m) - 1;
  let memo = Array(n).fill(0).map(() => Array(1 << m).fill(-1));
  return dp(0, 0);
  
  function dp(i, mask) {
    if (i === n) return mask === allUsed;
    if (mask === allUsed) return true;
    if (memo[i][mask] !== -1) return memo[i][mask];
    
    for (let newMask = 0; newMask < (1 << m); newMask++) { // try every possible subset of customers to assign to the ith value
      if (!isValid(mask, newMask)) continue;
      let valCount = count[values[i]];
      for (let j = 0; j < m; j++) {
        let oldBit = (mask >> j) & 1, newBit = (newMask >> j) & 1;
        if (!oldBit && newBit) { // new customer
          valCount -= quantity[j];
        }
      }
      if (valCount >= 0) { // if the frequency of value is greater than or equal to the sum of quantity
        if (dp(i + 1, newMask)) {
          return memo[i][mask] = true;
        }
      }
    }
    return memo[i][mask] = false;
  }
  
  function isValid(oldMask, newMask) { // check if newMask comes from oldMask (every 1-bit in oldMask is a 1-bit in newMask)
    for (let i = 0; i < m; i++) {
      let oldBit = (oldMask >> i) & 1, newBit = (newMask >> i) & 1;
      if (oldBit && !newBit) return false;
    }
    return true;
  }
};

// Three test cases
console.log(canDistribute([1,2,3,4], [2])) // false
console.log(canDistribute([1,2,3,3], [2])) // true
console.log(canDistribute([1,1,2,2], [2,2])) // true