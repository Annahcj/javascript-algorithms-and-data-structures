// 2670. Find the Distinct Difference Array
// You are given a 0-indexed array nums of length n.
// The distinct difference array of nums is an array diff of length n such that diff[i] is equal to the number of distinct elements in the suffix nums[i + 1, ..., n - 1] subtracted from the number of distinct elements in the prefix nums[0, ..., i].
// Return the distinct difference array of nums.
// Note that nums[i, ..., j] denotes the subarray of nums starting at index i and ending at index j inclusive. Particularly, if i > j then nums[i, ..., j] denotes an empty subarray.


// Solution: Prefix Count

// Go through nums from right to left and keep track of the count of distinct numbers in a set.
// Populate each suffCount[i], where suffCount[i] = the count of distinct numbers from index i to index n - 1.
// Then, go through nums from left to right and get the prefix counts, while populating the difference array.

// Time Complexity: O(n) 137ms
// Space Complexity: O(n) 50.2MB
var distinctDifferenceArray = function(nums) {
  let n = nums.length, suffCount = Array(n), set = new Set();
  for (let i = n - 1; i >= 0; i--) {
    set.add(nums[i]);
    suffCount[i] = set.size;
  }
  let diff = Array(n);
  set = new Set();
  for (let i = 0; i < n; i++) {
    set.add(nums[i]);
    diff[i] = set.size - (i === n - 1 ? 0 : suffCount[i + 1]);
  }
  return diff;
};

// Two test cases
console.log(distinctDifferenceArray([1,2,3,4,5])) // [-3,-1,1,3,5]
console.log(distinctDifferenceArray([3,2,3,4,2])) // [-2,-1,0,2,3]