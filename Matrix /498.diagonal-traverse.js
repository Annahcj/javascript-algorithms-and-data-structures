// 498. Diagonal Traverse
// Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.


// Solution 1: Group values by row + column

// Row + column are always equal along the same diagonal line.
// We can use this to populate values to their correct group -> [row + column].
// After this, we flatten them out, reversing each alternate group.

// Time Complexity: O(mn) 108ms
// Space Complexity: O(mn) 45.5MB
var findDiagonalOrder = function(mat) {
  let m = mat.length, n = mat[0].length;
  let lines = m - 1 + n - 1 + 1;
  let groups = Array(lines + 1);
  for (var i = 0; i < lines; i++) groups[i] = [];
  
  for (i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      groups[i + j].push(mat[i][j]);
    }
  }
  
  let res = [];
  for (i = 0; i < lines; i++) {
    if (i % 2 === 0) res.push(...groups[i].reverse());
    else res.push(...groups[i]);
  }
  return res;
};


// Solution 2: Simulation

// Actually traverse along the diagonal paths.

// When going out of bounds, we must decide how to change direction.
// out of bottom border (row >= m): row = m - 1, col += 2, change direction.
// out of right border (col >= n): col = n - 1, row += 2, change direction.
// out of top border (row < 0): row = 0, change direction.
// out of left border (col < 0): col = 0, change direction.

// Time Complexity: O(mn) 207ms
// Space Complexity: O(1) 44.4MB
var findDiagonalOrder = function(mat) {
  const directions = [[-1, 1], [1, -1]];
  let m = mat.length, n = mat[0].length;
  let row = 0, col = 0;
  let res = [], dir = 0;
  let i = 0;
  while (i < m * n) {
    res.push(mat[row][col]);
    row += directions[dir][0], col += directions[dir][1];
    
    if (row >= m) {
      row = m - 1, col += 2;
      dir = 1 - dir;
    } else if (col >= n) {
      row += 2, col = n - 1;
      dir = 1 - dir;
    } else if (row < 0) {
      row = 0;
      dir = 1 - dir;
    } else if (col < 0) {
      col = 0;
      dir = 1 - dir;
    }

    i++;
  }
  return res;
};

// Two test cases to run function on
console.log(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]])) // [1,2,4,7,5,3,6,8,9]
console.log(findDiagonalOrder([[1,2],[3,4]])) // [1,2,3,4]