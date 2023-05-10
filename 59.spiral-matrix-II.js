// 59. Spiral Matrix II
// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.


// Solution: Simulation

// Go through the matrix layer by layer from out to in.
// For each layer, we traverse the four borders.
  // 1. Top border from left to right.  
  // 2. Right border from top down.
  // 3. Bottom border from right to left.
  // 4. Left border from bottom up.

// Time Complexity: O(n^2) 57ms
// Space Complexity: O(1) (not including output) 41.7MB
var generateMatrix = function(n) {
  let mat = Array(n).fill(0).map(() => Array(n));
  let layer = 0, num = 1;
  while (num <= n * n) {
    for (let col = layer; col < n - layer && num <= n * n; col++) mat[layer][col] = num++;
    for (let row = layer + 1; row < n - layer && num <= n * n; row++) mat[row][n - layer - 1] = num++;
    for (let col = n - layer - 2; col >= layer && num <= n * n; col--) mat[n - layer - 1][col] = num++;
    for (let row = n - layer - 2; row >= layer + 1 && num <= n * n; row--) mat[row][layer] = num++;
    layer++;
  }
  return mat;
};

// Two test cases to run function on
console.log(generateMatrix(3)) // [[1,2,3],[8,9,4],[7,6,5]]
console.log(generateMatrix(1)) // [[1]]