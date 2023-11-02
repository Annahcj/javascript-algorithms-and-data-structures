// 2679. Sum in a Matrix
// You are given a 0-indexed 2D integer array nums. Initially, your score is 0. Perform the following operations until the matrix becomes empty:
  // 1. From each row in the matrix, select the largest number and remove it. In the case of a tie, it does not matter which number is chosen.
  // 2. Identify the highest number amongst all those removed in step 1. Add that number to your score.
// Return the final score.


// Solution: Sorting 

// 1. Sort each row in desc order.
// 2. Get the sum of the maximum score in each column.

// m = number of rows, n = number of columns
// Time Complexity: O(m log(n)) 163ms
// Space Complexity: O(log(n)) (space for sorting) 51.8MB
var matrixSum = function(nums) {
  let m = nums.length, n = nums[0].length;
  for (let i = 0; i < m; i++) {
    nums[i].sort((a, b) => b - a);
  }
  let finalScore = 0;
  for (let j = 0; j < n; j++) {
    let maxScore = 0;
    for (let i = 0; i < m; i++) {
      maxScore = Math.max(maxScore, nums[i][j]);
    }
    finalScore += maxScore;
  }
  return finalScore;
};

// Two test cases
console.log(matrixSum([[7,2,1],[6,4,2],[6,5,3],[3,2,1]])) // 15
console.log(matrixSum([[1]])) // 1