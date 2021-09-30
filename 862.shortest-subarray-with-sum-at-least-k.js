// 862. Shortest Subarray with Sum at Least K
// Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.
// A subarray is a contiguous part of an array.


// Solution: Monotonic Queue

// First, loop through nums and generate a prefix sum array. 
// Set sum[0] to 0 initially. 

// Define a monoQ, and set ans to Infinity
// Loop through sum (pointer = i)
  // (The monoQ will contain indices of sums. Keep in mind monoQ will always be in increasing order of sums)
  // (monoQ will contain possible start indices for a subarray with a sum bigger than k)
  // loop while monoQ is not empty AND sum[i] is smaller than or equal to sum[last index in monoQ] (because it should be strictly increasing)
    // pop from monoQ
  // loop while monoQ is not empty AND sum[i] - sum[monoQ[0]] is bigger than or equal to k (this position is the shortest subarray for sum[monoQ[0]], so we won't need it anymore)
    // update ans if i - monoQ.shift() is smaller than ans
  // push i into monoQ

// Return ans

// Note: The time complexity can be more than O(n) due to javascript's shift function which takes O(n).
// Can build a doubly linked list instead for removal from front.

// Time Complexity: O(n) 284ms
// Space Complexity: O(n) 58.1MB
var shortestSubarray = function(nums, k) {
  let sum = [0];
  for (var i = 0; i < nums.length; i++) {
    sum[i + 1] = sum[i] + nums[i];
  }  
  let monoQ = [], ans = Infinity;
  for (var i = 0; i < sum.length; i++) {
    while (monoQ.length && sum[i] <= sum[monoQ[monoQ.length - 1]]) {
      monoQ.pop();
    }
    while (monoQ.length && sum[i] - sum[monoQ[0]] >= k) {
      ans = Math.min(ans, i - monoQ.shift());
    }
    monoQ.push(i);
  }
  return ans === Infinity ? -1 : ans;
};

// Three test cases to run function on
console.log(shortestSubarray([1], 1)) // 1
console.log(shortestSubarray([1, 2], 4)) // -1
console.log(shortestSubarray([2,-1,2], 3)) // 3