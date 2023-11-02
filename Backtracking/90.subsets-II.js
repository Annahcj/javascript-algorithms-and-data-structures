// 90. Subsets II
// Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.


// Solution: Backtracking

// Algorithm:
// Sort the nums in ascending order. This way, we can easily skip over duplicates.
// Call the backtrack function with 0 and an empty array.
// Create a backtrack function (accepts a start index, arr)  (instead of slicing the array every time, we will start looping from an index instead)
  // Push arr (initially set to an empty array) into subsets (result) with the spread operator 
  // Loop through nums from start to the end of nums (pointer = i)
    // If i is bigger than start and nums[i - 1] is equal to nums[i], continue. (skip over duplicates)
    // Push nums[i] into arr
    // Recursively call backtrack for i + 1 and arr
    // Pop the last item off from arr
// Return subsets.

// Time Complexity: O(n * 2^n) 80ms
// Space Complexity: O(n) (call stack) 40.9MB
var subsetsWithDup = function(nums) {
  nums = nums.sort((a, b) => a - b);
  let subsets = [];
  backtrack(0, []);

  function backtrack(start, arr) {
    subsets.push([...arr]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i - 1] === nums[i]) continue;
      arr.push(nums[i]);
      backtrack(i + 1, arr);
      arr.pop();
    }
  }
  return subsets;
};

// Two test cases
console.log(subsetsWithDup([1,2,2])) // [[],[1],[1,2],[1,2,2],[2],[2,2]]
console.log(subsetsWithDup([0])) // [[],[0]]