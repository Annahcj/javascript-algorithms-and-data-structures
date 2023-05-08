// 1572. Matrix Diagonal Sum
// Given a square matrix mat, return the sum of the matrix diagonals.
// Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.


// Solution:

// If n is odd, then we will have one common element in the middle.
// If n is even, then we will not have any overlapping elements.
// Go through the primary and secondary diagonal and get the sum.
// At the end, subtract the middle element from the sum if n is odd.

// n = height/width of the matrix
// Time Complexity: O(n) 75ms
// Space Complexity: O(1) 44.6MB
var diagonalSum = function(mat) {
  let n = mat.length, sum = 0;
  let i = 0, j = 0;
  while (i < n) {
    sum += mat[i++][j++];
  }
  i = 0, j = n - 1;
  while (i < n) {
    sum += mat[i++][j--];
  }
  return n % 2 === 1 ? sum - mat[Math.floor(n / 2)][Math.floor(n / 2)] : sum;
};

// Three test cases
console.log(diagonalSum([[1,2,3],[4,5,6],[7,8,9]])) // 25
console.log(diagonalSum([[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]])) // 8
console.log(diagonalSum([[5]])) // 5