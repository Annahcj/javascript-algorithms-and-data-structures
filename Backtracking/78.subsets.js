// 78. Subsets
// Given an integer array nums of unique elements, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.


// Solution: Backtracking

// Use recursive backtracking to generate every subset.
// To avoid generating duplicates, sort nums in asc order, and use a pointer i to indicate which index we are up to.
// For each index i, we either include nums[i] in our subset, or skip it.

// Time Complexity: O(2^n * n) 60ms
// Space Complexity: O(n) (excluding output) 50.8MB
var subsets = function(nums) {
  nums.sort((a, b) => a - b);
  let subsets = [], n = nums.length;
  backtrack(0, []);
  return subsets;
  
  function backtrack(i, subset) {
    if (i === n) {
      subsets.push([...subset]);
      return;
    };
    subset.push(nums[i]);
    backtrack(i + 1, subset); // take
    subset.pop();
    backtrack(i + 1, subset); // skip
  }
};

// Two test cases
console.log(subsets([1,2,3])) // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
console.log(subsets([0])) // [[],[0]]