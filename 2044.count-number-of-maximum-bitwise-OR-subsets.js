// 2044. Count Number of Maximum Bitwise-OR Subsets
// Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.
// An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.
// The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).


// Solution: Subsets 

// First calculate the maximum OR value -> OR value of all nums
// Use backtracking to count number of subsets which have an OR value that is the same as the maximum OR value

// Time Complexity: O(2^n) 92ms
// Space Complexity: O(2^n) 38.8MB
var countMaxOrSubsets = function(nums) {
  let max = 0, n = nums.length;
  for (var i = 0; i < n; i++) {
    max |= nums[i];
  }  
  let res = 0;
  recurse(0, 0);
  return res;

  function recurse(idx, val) {
    if (val === max) res++;
    for (var i = idx; i < n; i++) {
      recurse(i + 1, val | nums[i]);
    }
  }
};

// A test case to run function on
console.log(countMaxOrSubsets([3,2,1,5])) // 6