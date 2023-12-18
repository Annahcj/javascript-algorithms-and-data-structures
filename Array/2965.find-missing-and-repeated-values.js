// 2965. Find Missing and Repeated Values
// You are given a 0-indexed 2D integer matrix grid of size n * n with values in the range [1, n^2]. Each integer appears exactly once except a which appears twice and b which is missing. The task is to find the repeating and missing numbers a and b.
// Return a 0-indexed integer array ans of size 2 where ans[0] equals to a and ans[1] equals to b.

 
// Solution: Brute Force w/ Array

// Go through each cell and use an array of size n^2 to keep track of which values we have.
// At the end, go through each value (1 to n^2) and the one that is not set in the array is the missing one.

// Time Complexity: O(n^2) 59ms
// Space Complexity: O(n^2) 45.4MB
var findMissingAndRepeatedValues = function(grid) {
  let n = grid.length, hasValue = Array(n * n).fill(false);
  let repeated;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (hasValue[grid[i][j]]) {
        repeated = grid[i][j];
      }
      hasValue[grid[i][j]] = true;
    }
  }
  let missing;
  for (let i = 1; i <= n * n; i++) {
    if (!hasValue[i]) {
      missing = i;
      break;
    }
  }
  return [repeated, missing];
};

// Two test cases
console.log(findMissingAndRepeatedValues([[1,3],[2,2]])) // [2,4]
console.log(findMissingAndRepeatedValues([[9,1,7],[8,9,2],[3,4,6]])) // [9,5]