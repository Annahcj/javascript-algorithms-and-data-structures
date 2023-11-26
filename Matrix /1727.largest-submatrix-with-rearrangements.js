// 1727. Largest Submatrix With Rearrangements
// You are given a binary matrix matrix of size m x n, and you are allowed to rearrange the columns of the matrix in any order.
// Return the area of the largest submatrix within matrix where every element of the submatrix is 1 after reordering the columns optimally.


// Solution: Counting & Sorting

// For each column, precompute the number of consecutive ones ending at each row.
// For each row, collect the consecutive ones ending at the row, and sort them in desc order.
  // Go through the sorted counts, and keep track of the maximum area: current count * number of columns

// m = number of rows, n = number of columns
// Time Complexity: O(m * n log(n)) 170ms
// Space Complexity: O(mn) 92.1MB
var largestSubmatrix = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let ones = Array(m).fill(0).map(() => Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    let currOnes = 0;
    for (let i = 0; i < m; i++) {
      if (matrix[i][j] === 1) currOnes++;
      else currOnes = 0;
      ones[i][j] = currOnes;
    }
  }
  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    let onesForRow = [];
    for (let j = 0; j < n; j++) {
      onesForRow.push(ones[i][j]);
    }
    onesForRow.sort((a, b) => b - a);
    for (let j = 0; j < n; j++) {
      maxArea = Math.max(maxArea, (j + 1) * onesForRow[j]);
    }
  }
  return maxArea;
};

// Two test cases
console.log(largestSubmatrix([[0,0,1],[1,1,1],[1,0,1]])) // 4
console.log(largestSubmatrix([[1,1,0],[1,0,1]])) // 2