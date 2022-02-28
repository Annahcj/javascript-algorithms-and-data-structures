// 228. Summary Ranges
// You are given a sorted unique integer array nums.
// Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.
// Each range [a,b] in the list should be output as:
  // "a->b" if a != b
  // "a" if a == b


// Solution: Count Consecutive

// Record all the consecutive ranges.
// Keep track of the start of a consecutive range, and keep a count of the length of the range.
// When a number is not part of a consecutive range, add the previous range to the result and reset the start and count.

// Time Complexity: O(n) 87ms
// Space Complexity: O(1) not including output 42.3MB
var summaryRanges = function(nums) {
  // consecutive numbers count
  let count = 1, res = [], n = nums.length;
  if (!n) return [];
  let start = nums[0];
  for (let i = 1; i <= n; i++) {
    if (i < n && nums[i] === nums[i - 1] + 1) count++;
    else {
      if (count === 1) res.push(start.toString());
      else res.push(`${start}->${start + count - 1}`);
      count = 1;
      start = nums[i];
    }
  }
  return res;
};

// Two test cases to run function on
console.log(summaryRanges([0,1,2,4,5,7])) // ["0->2","4->5","7"]
console.log(summaryRanges([0,2,3,4,6,8,9])) // ["0","2->4","6","8->9"]