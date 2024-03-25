// 3091. Apply Operations to Make Sum of Array Greater Than or Equal to k
// You are given a positive integer k. Initially, you have an array nums = [1].
// You can perform any of the following operations on the array any number of times (possibly zero):
  // Choose any element in the array and increase its value by 1.
  // Duplicate any element in the array and add it to the end of the array.
// Return the minimum number of operations required to make the sum of elements of the final array greater than or equal to k.


// Solution: Greedy & Enumeration

// It's always optimal to perform all increment operations before the duplicate operations.
// There is no point incrementing, duplicating the max element, then incrementing it again.
// Incrementing first, then duplicating will always result in the largest sum.

// Enumerate each combination of increment and duplicate operations and return the minimum number of operations.

// Time Complexity: O(k) 58ms
// Space Complexity: O(1) 49.8MB
var minOperations = function(k) {
  let ans = Infinity;
  for (let i = 0; i < k; i++) {
    // `i` increment operations, and duplicate operations for the remaining sum
    let operations = Math.ceil((k - (i + 1)) / (i + 1)); 
    ans = Math.min(ans, i + operations);
  }
  return ans;
};

// Two test cases
console.log(minOperations(11)) // 5
console.log(minOperations(1)) // 0