// 2906. Construct Product Matrix
// Given a 0-indexed 2D integer matrix grid of size n * m, we define a 0-indexed 2D matrix p of size n * m as the product matrix of grid if the following condition is met:
  // Each element p[i][j] is calculated as the product of all elements in grid except for the element grid[i][j]. This product is then taken modulo 12345.
// Return the product matrix of grid.


// Solution: Prefix Product 

// Calculate the prefix product from bottom right to each grid[i][j] and store the results in a m * n matrix.
// Go through each grid[i][j] and calculate the ongoing product from (0, 0) to (i, j).
// For each grid[i][j]: product left * right[i][j]

// Time Complexity: O(mn) 417ms
// Space Complexity: O(mn) 105.9MB
var constructProductMatrix = function(grid) {
  let m = grid.length, n = grid[0].length, MOD = 12345n;
  let productRight = Array(m).fill(0).map(() => Array(n)), product = 1n;
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      productRight[i][j] = product;
      product = (product * BigInt(grid[i][j])) % MOD;
    }
  }
  let result = Array(m).fill(0).map(() => Array(n)), productLeft = 1n;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = Number((productLeft * productRight[i][j]) % MOD);
      productLeft = (productLeft * BigInt(grid[i][j])) % MOD;
    }
  }
  return result;
};

// Two test cases
console.log(constructProductMatrix([[1,2],[3,4]])) // [[24,12],[8,6]]
console.log(constructProductMatrix([[12345],[2],[1]])) // [[2],[0],[0]]