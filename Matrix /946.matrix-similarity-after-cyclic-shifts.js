// 2946. Matrix Similarity After Cyclic Shifts
// You are given a 0-indexed m x n integer matrix mat and an integer k. You have to cyclically right shift odd indexed rows k times and cyclically left shift even indexed rows k times.
// Return true if the initial and final matrix are exactly the same and false otherwise.


// Solution: 

// Formula for shifting a row:
  // Left shift: row[j] === row[(j + k) % n]
  // Right shift: row[j] === row[(j - k + n) % n]

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 56ms
// Space Complexity: O(1) 44.3MB
var areSimilar = function(mat, k) {
  let m = mat.length, n = mat[0].length;
  k = k % n;
  for (let i = 0; i < m; i++) {
    let rowIsEqual = true;
    for (let j = 0; j < n; j++) {
      let isEqual = i % 2 === 0 ? mat[i][j] === mat[i][(j + k) % n] : mat[i][j] === mat[i][(j - k + n) % n];
      if (!isEqual) {
        rowIsEqual = false;
        break;
      }
    }
    if (!rowIsEqual) return false;
  }
  return true;
};

// Three test cases
console.log(areSimilar([[1,2,1,2],[5,5,5,5],[6,3,6,3]], 2)) // true
console.log(areSimilar([[2,2],[2,2]], 3)) // true
console.log(areSimilar([[1,2]], 1)) // false