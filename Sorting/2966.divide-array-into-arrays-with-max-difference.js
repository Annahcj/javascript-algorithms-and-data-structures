// 2966. Divide Array Into Arrays With Max Difference
// You are given an integer array nums of size n and a positive integer k.
// Divide the array into one or more arrays of size 3 satisfying the following conditions:
  // Each element of nums should be in exactly one array.
  // The difference between any two elements in one array is less than or equal to k.
// Return a 2D array containing all the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return any of them.


// Solution: Greedy w/ Sorting

// It's optimal to sort the array to ensure the grouped elements have the minimum difference possible.

// Time Complexity: O(n log(n)) 319ms
// Space Complexity: O(1) (not including output) 88.1MB
var divideArray = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, ans = [];
  for (let i = 2; i < n; i += 3) {
    if (nums[i] - nums[i - 2] > k) return [];
    ans.push([nums[i - 2], nums[i - 1], nums[i]]);
  }
  return ans;
};

// Two test cases
console.log(divideArray([1,3,4,8,7,9,3,5,1], 2)) // [[1,1,3],[3,4,5],[7,8,9]]
console.log(divideArray([1,3,3,2,7,3], 3)) // []