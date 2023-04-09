// 2615. Sum of Distances
// You are given a 0-indexed integer array nums. There exists an array arr of length nums.length, where arr[i] is the sum of |i - j| over all j such that nums[j] == nums[i] and j != i. If there is no such j, set arr[i] to be 0.
// Return the array arr.


// Solution: Prefix Sum Per Value

// 1. Collect the indices of each group by value.
// 2. For each group of indices, count the running prefix sum from the left and right and add the sum of the differences of indices to the answer.
  // From left: ans[indices[j]] += indices[j] * (j + 1) - leftSum
  // From right: ans[indices[j]] += rightSum - indices[j] * (indices.length - j)

// The idea is we use prefix sum to calculate the sum of all differences in indices, this way we don't have to loop through and compare each individual pair of indices.

// Time Complexity: O(n) 367ms
// Space Complexity: O(n) 87.5MB
var distance = function(nums) {
  let n = nums.length, map = {};
  for (let i = 0; i < n; i++) {
    if (!map[nums[i]]) map[nums[i]] = [];
    map[nums[i]].push(i);
  }
  let ans = Array(n).fill(0);
  for (let num in map) {
    let indices = map[num], m = indices.length, leftSum = 0;
    for (let j = 0; j < m; j++) {
      leftSum += indices[j];
      ans[indices[j]] += indices[j] * (j + 1) - leftSum;
    }
    let rightSum = 0;
    for (let j = m - 1; j >= 0; j--) {
      rightSum += indices[j];
      ans[indices[j]] += rightSum - indices[j] * (m - j);
    }
  }
  return ans;
};

// Two test cases
console.log(distance([1,3,1,1,2])) // [5,0,3,4,0]
console.log(distance([0,5,3])) // [0,0,0]