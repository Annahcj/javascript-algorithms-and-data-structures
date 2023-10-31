// 2164. Sort Even and Odd Indices Independently
// You are given a 0-indexed integer array nums. Rearrange the values of nums according to the following rules:
  // 1. Sort the values at odd indices of nums in non-increasing order.
    // For example, if nums = [4,1,2,3] before this step, it becomes [4,3,2,1] after. The values at odd indices 1 and 3 are sorted in non-increasing order.
  // 2. Sort the values at even indices of nums in non-decreasing order.
    // For example, if nums = [4,1,2,3] before this step, it becomes [2,1,4,3] after. The values at even indices 0 and 2 are sorted in non-decreasing order.
// Return the array formed after rearranging the values of nums.


// Solution: Divide, Sort, Combine

// 1. Divide nums into two arrays: 
  // odd: nums with an odd index
  // even: nums with an even index
// 2. Sort even in ascending order and sort odd in descending order.
// 3. Combine them into one array and return.

// Time Complexity: O(n log(n)) 81ms
// Space Complexity: O(n) 44.4MB
var sortEvenOdd = function(nums) {
  let odd = [], even = [];
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) even.push(nums[i]);
    else odd.push(nums[i]);
  }
  even.sort((a, b) => a - b);
  odd.sort((a, b) => b - a);
  let res = [];
  for (let i = 0; i < even.length; i++) {
    res.push(even[i]);
    if (i < odd.length) res.push(odd[i]); // if nums.length is odd, there will be 1 less odd index.
  }
  return res;
};

// Two test cases
console.log(sortEvenOdd([4,1,2,3])) // [2,3,4,1]
console.log(sortEvenOdd([4,1,2,3,1])) // [1,3,2,1,4]