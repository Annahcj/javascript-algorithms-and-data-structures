// 228. Summary Ranges
// You are given a sorted unique integer array nums.
// Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.
// Each range [a,b] in the list should be output as:
  // "a->b" if a != b
  // "a" if a == b


// Solution: Two Pointers

// Keep track of two pointers - i and j.
// i is the beginning of a new range, and we increase j while the numbers are consecutively increasing.

// Time Complexity: O(n) 63ms
// Space Complexity: O(1) (not including output) 42MB
var summaryRanges = function(nums) {
  let n = nums.length, ranges = [], i = 0;
  while (i < n) {
    let j = i;
    while (j < n - 1 && nums[j] + 1 === nums[j + 1]) j++;
    let range = i === j ? nums[i].toString() : `${nums[i]}->${nums[j]}`;
    ranges.push(range);
    i = j + 1;
  }
  return ranges;
};

// Two test cases to run function on
console.log(summaryRanges([0,1,2,4,5,7])) // ["0->2","4->5","7"]
console.log(summaryRanges([0,2,3,4,6,8,9])) // ["0","2->4","6","8->9"]