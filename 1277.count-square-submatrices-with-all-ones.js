// 1277. Count Square Submatrices with All Ones
// Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.


// Solution: Dynamic Programming

// matrix[i][j] = size of the biggest square with matrix[i][j] as the bottom right corner piece.
// since matrix[i][j] represents the whole square, we can use these values to count the squares.

// e.g: if matrix[i][j] = 3, that means we have a square of size 1, 2, and 3 with a bottom right corner piece ending here. 
// like 
// [1,1,1]
// [1,1,1]
// [1,1,1]

// the fully populated dp array would look like
// [1,1,1]
// [1,2,2]
// [1,2,3]

// so the answer is the sum of each matrix[i][j].

// Note: When calculating the max square, remember to take Math.min(left, top, left diagonal) + 1.

// Time Complexity: O(mn) 80ms
// Space Complexity: O(1) 45.8MB
var countSquares = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let ans = 0;
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (matrix[i][j] === 0) continue;
      let left = j === 0 ? 0 : matrix[i][j - 1];
      let leftDiag = i === 0 || j === 0 ? 0 : matrix[i - 1][j - 1];
      let top = i === 0 ? 0 : matrix[i - 1][j];
      matrix[i][j] = Math.max(1, Math.min(left, leftDiag, top) + 1);
      
      ans += matrix[i][j];
    }
  }  
  return ans;
};

// A test case to run function on
console.log(countSquares([[0,1,1,1],[1,1,1,1],[0,1,1,1]])) // 15