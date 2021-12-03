// 59. Spiral Matrix II
// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.


// Solution: Layer by Layer Approach

// We loop layer by layer, keeping two variables start and end indicating the boundaries of the next layer.
// Set start to 0, and end to n - 1.
// Loop while start is smaller than or equal to end and set each value of the matrix.
  // The start position is matrix[start][start]
  // Loop through the upper row (left-right)
  // Loop through the rightmost column (up-bottom)
  // Loop through the bottom row (right-left)
  // Loop through the leftmost column (bottom-up)
  // Increment start by one, and decrement end by one.

// Time Complexity: O(n^2) 68ms
// Space Complexity: O(1) (not including output) 38.9MB
var generateMatrix = function(n) {
  let mat = Array(n);
  for (var i = 0; i < n; i++) mat[i] = Array(n);
  let start = 0, end = n - 1;  
  let num = 1;
  while (start <= end) {
    console.log(start, end)
    i = start;
    for (var j = start; j <= end; j++) {
      mat[i][j] = num;
      num++;
    }
    j = end;
    for (i = start + 1; i <= end; i++) {
      mat[i][j] = num;
      num++;
    }
    i = end;
    for (j = end - 1; j >= start; j--) {
      mat[i][j] = num;
      num++;
    }
    j = start;
    for (i = end - 1; i > start; i--) {
      mat[i][j] = num;
      num++;
    }
    start++, end--;
  }
  return mat;
};

// Two test cases to run function on
console.log(generateMatrix(3)) // [[1,2,3],[8,9,4],[7,6,5]]
console.log(generateMatrix(1)) // [[1]]