// 598. Range Addition II
// You are given an m x n matrix M initialized with all 0's and an array of operations ops, where ops[i] = [ai, bi] means M[x][y] should be incremented by one for all 0 <= x < ai and 0 <= y < bi.
// Count and return the number of maximum integers in the matrix after performing all the operations.


// Solution: Logic

// Since ops[i] is always includes every cell from [0,0] to [ops[i][0], ops[i][1]], the smallest coordinates will always have the most value.
// Therefore, we just need to find the minimum row and minimum column.
// The answer is the min row * min col.

// Time Complexity: O(n) 
// Space Complexity: O(1)
var maxCount = function(m, n, ops) {
  for (var [a, b] of ops) {
    m = Math.min(m, a);
    n = Math.min(n, b);
  }
  return m * n;
};