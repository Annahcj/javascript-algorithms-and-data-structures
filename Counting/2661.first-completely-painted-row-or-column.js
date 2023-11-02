// 2661. First Completely Painted Row or Column
// You are given a 0-indexed integer array arr, and an m x n integer matrix mat. arr and mat both contain all the integers in the range [1, m * n].
// Go through each index i in arr starting from index 0 and paint the cell in mat containing the integer arr[i].
// Return the smallest index i at which either a row or a column will be completely painted in mat.


// Solution: Counting

// Map each arr[i] to its row and column in mat.
// Keep track of the count of numbers unused in each row and column.
// As we go through each arr[i], subtract from the counts and if any count is 0, return i.

// Time Complexity: O(mn) 173ms
// Space Complexity: O(mn) 79.8MB
var firstCompleteIndex = function(arr, mat) {
  let m = mat.length, n = mat[0].length;
  let coordinates = Array(m * n + 1);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      coordinates[mat[i][j]] = [i, j];
    }
  }
  let rowCount = Array(m).fill(n), colCount = Array(n).fill(m);
  for (let i = 0; i < m * n; i++) {
    let [row, col] = coordinates[arr[i]];
    if (--rowCount[row] === 0 || --colCount[col] === 0) return i; 
  }
};

// Two test cases
console.log(firstCompleteIndex([1,3,4,2], [[1,4],[2,3]])) // 2
console.log(firstCompleteIndex([2,8,7,4,1,3,5,6,9], [[3,2,5],[1,4,6],[8,7,9]])) // 3