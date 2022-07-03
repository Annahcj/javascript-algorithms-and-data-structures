// 2326. Spiral Matrix IV
// You are given two integers m and n, which represent the dimensions of a matrix.
// You are also given the head of a linked list of integers.
// Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.
// Return the generated matrix.


// Solution: Simulation

// Simulate going from (0, 0) in a spiral manner.
// When we hit the edges (indices out of bounds or hitting a cell we've been to), 
  // 1. Go backwards
  // 2. Change the direction
  // 3. Move forward again

// Time Complexity: O(mn) 741ms
// Space Complexity: O(1) (not including output) 103.3MB
var spiralMatrix = function(m, n, head) {
  let res = Array(m).fill(0).map(() => Array(n).fill(-1));
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // R, D, L, U
  let i = 0, j = 0, dir = 0;
  while (head) {
    res[i][j] = head.val;
    i += directions[dir][0], j += directions[dir][1];
    if (i < 0 || i >= m || j < 0 || j >= n || res[i][j] !== -1) { // indices out of bounds
      i -= directions[dir][0], j -= directions[dir][1];
      dir = (dir + 1) % 4;
      i += directions[dir][0], j += directions[dir][1];
    }
    head = head.next;
  }
  return res;
};