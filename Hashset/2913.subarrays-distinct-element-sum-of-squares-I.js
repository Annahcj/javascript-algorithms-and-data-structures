// 2913. Subarrays Distinct Element Sum of Squares I
// You are given a 0-indexed integer array nums.
// The distinct count of a subarray of nums is defined as:
  // Let nums[i..j] be a subarray of nums consisting of all the indices from i to j such that 0 <= i <= j < nums.length. Then the number of distinct values in nums[i..j] is called the distinct count of nums[i..j].
// Return the sum of the squares of distinct counts of all subarrays of nums.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Hashset

// Go through each start and end index of subarrays, using a hashset to keep track of the distinct count.
// For each (i, j) subarray, we add the square of the size of the hashset to the final sum.

// Time Complexity: O(n^2) 62ms
// Space Complexity: O(n) 47.7MB
var sumCounts = function(nums) {
  let n = nums.length, squareSum = 0;
  for (let i = 0; i < n; i++) {
    let distinct = new Set();
    for (let j = i; j < n; j++) {
      distinct.add(nums[j]);
      squareSum += distinct.size ** 2;
    }
  }
  return squareSum;
};

// Two test cases
console.log(sumCounts([1,2,1])) // 15
console.log(sumCounts([1,1])) // 3