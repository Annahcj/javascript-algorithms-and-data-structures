// 85. Maximal Rectangle
// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.


// Solution 1: 2D DP

// Keep track of a running count of rows where the subarray from index i to j are all 1's: prev[i][j] = running count of rows where matrix[row][i] to matrix[row][j] is all 1's.
// As we traverse each row, if a subarray contains all 1's, increment the count. Otherwise, reset the count to 0.

// Time Complexity: O(mn^2) 175ms
// Space Complexity: O(n^2) 59MB
var maximalRectangle = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let prev = Array(n).fill(0).map(() => Array(n).fill(0)); // prev[i][j] = running count of rows where the subarray from index i to j are all 1's. updated as we traverse each row (either reset or count is incremented)
  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    let curr = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let j = 0; j < n; j++) {
      for (let k = j; k < n; k++) {
        if (matrix[i][k] !== '1') break;
        curr[j][k] = prev[j][k] + 1;
        maxArea = Math.max(maxArea, (k - j + 1) * curr[j][k]);
      }
    }
    prev = curr;
  }
  return maxArea;
};


// Solution 2: Monotonic Increasing Stack

// For each row, get the number of consecutive 1's in each column up to the current row.
// For e.g: [
//   ["1","0","1","0","0"],
//   ["1","0","1","1","1"],
//   ["1","1","1","1","1"],
//   ["1","0","0","1","0"]
// ]
// Row 1: [1,0,1,0,0]
// Row 2: [2,0,2,1,1]
// Row 3: [3,1,3,2,2]
// Row 4: [4,0,0,3,0]

// For each row, 
  // Update the column counts.
  // Use a monotonic increasing stack to find the maximum area for the current counts.
    // Go through the column counts and pop off all counts that are larger than the current count: 
      // The rectangle width is the distance between the popped index and its previous index, plus the distance between the current index and the popped index. 
      // The rectangle height is the count for the popped index.
    // At the end, do another pass through the stack to cover remaining indices left in the stack.
    // e.g: count = [3,2,1,2,3] -> stack (indices of count) = [2,3,4] ([1,2,3])
    // Compare adjacent indices in the stack to get the final width.
    // The count 1 covers from indices 0 to 4.
    // The count 2 covers from indices 3 to 4.
    // The count 3 covers from indices 4 to 4.

// Time Complexity: O(mn) 65ms
// Space Complexity: O(n) 53.2MB
var maximalRectangle = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let count = Array(n).fill(0), maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') count[j]++;
      else count[j] = 0;
    }
    let stack = [];
    for (let j = 0; j < n; j++) {
      while (stack.length && count[stack[stack.length - 1]] >= count[j]) {
        let index = stack.pop();
        let width = (index - (stack[stack.length - 1] ?? -1)) + (j - index - 1);
        maxArea = Math.max(maxArea, count[index] * width);
      }
      stack.push(j);
    }
    let prevIndex = -1;
    for (let index of stack) {
      let width = (index - prevIndex) + (n - index - 1);
      maxArea = Math.max(maxArea, count[index] * width);
      prevIndex = index;
    }
  }
  return maxArea;
};

// Two test cases
console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])) // 6
console.log(maximalRectangle([])) // 0