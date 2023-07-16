// 2780. Minimum Index of a Valid Split
// An element x of an integer array arr of length m is dominant if freq(x) * 2 > m, where freq(x) is the number of occurrences of x in arr. Note that this definition implies that arr can have at most one dominant element.
// You are given a 0-indexed integer array nums of length n with one dominant element.
// You can split nums at an index i into two arrays nums[0, ..., i] and nums[i + 1, ..., n - 1], but the split is only valid if:
  // 0 <= i < n - 1
  // nums[0, ..., i], and nums[i + 1, ..., n - 1] have the same dominant element.
// Here, nums[i, ..., j] denotes the subarray of nums starting at index i and ending at index j, both ends being inclusive. Particularly, if j < i then nums[i, ..., j] denotes an empty subarray.
// Return the minimum index of a valid split. If no valid split exists, return -1.


// Solution: Boyer-Moore Voting Algorithm 

// If a number is the majority element on the left and right arrays, that means it is the majority element in the overall array.
// Therefore, we only need to find the majority element on the overall array, then count the occurance of this element on the left and right arrays for each split.
// Return the first index of a split where both the left and right arrays have the majority element equal to the overall majority element.

// Time Complexity: O(n) 92ms
// Space Complexity: O(1) 52.1MB
var minimumIndex = function(nums) {
  let n = nums.length, count = 0, majority;
  for (let i = 0; i < n; i++) {
    if (count === 0) majority = nums[i];
    if (nums[i] === majority) count++;
    else count--;
  }
  let majorityCount = nums.reduce((res, num) => res + (num === majority ? 1 : 0), 0);
  let leftCount = 0;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === majority) leftCount++;
    let rightCount = majorityCount - leftCount;
    if (leftCount * 2 > i + 1 && rightCount * 2 > n - i - 1) return i;
  }
  return -1;
};

// Two test cases
console.log(minimumIndex([1,2,1,1])) // 0
console.log(minimumIndex([3,3,3,3,7,2,2])) // -1