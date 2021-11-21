// 1901. Find a Peak Element II
// A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, right, top, and bottom.
// Given a 0-indexed m x n matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] and return the length 2 array [i,j].


// Solution: Binary Search

// Binary Search the columns
// 1. Pick mid column
// 2. Find the maximum element in the column
// 3. Three situations:
  // a. element is bigger than left and right elements -> return the coordinates
  // b. left element is bigger than element -> search the left side
  // c. right element is bigger than element -> search the right side

// Time Complexity: O(n log(m)) 92ms
// Space Complexity: O(1) 51.2MB
var findPeakGrid = function(mat) {
  let n = mat.length, m = mat[0].length;
  let low = 0, high = m;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let maxInCol = 0;
    for (var i = 0; i < n; i++) {
      if (mat[i][mid] > mat[maxInCol][mid]) {
        maxInCol = i;
      }
    }
    let leftCol = mid === 0 ? -Infinity : mat[maxInCol][mid - 1];
    let rightCol = mid === m - 1 ? -Infinity : mat[maxInCol][mid + 1];
    if (mat[maxInCol][mid] > leftCol && mat[maxInCol][mid] > rightCol) {
      return [maxInCol, mid];
    } else if (mat[maxInCol][mid] < leftCol) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
};

// Two test cases to run function on
console.log(findPeakGrid([[1,4],[3,2]])) // [0,1]
console.log(findPeakGrid([[10,20,15],[21,30,14],[7,16,32]])) // [1,1]