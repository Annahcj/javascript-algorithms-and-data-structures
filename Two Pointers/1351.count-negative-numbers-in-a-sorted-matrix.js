// 1351. Count Negative Numbers in a Sorted Matrix
// Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.


// Solution 1: Binary Search

// For each row, binary search for the index of the leftmost negative number.
// The number of negatives in each row = n - leftmost index

// m = number of rows, n = number of columns
// Time Complexity: O(m log(n)) 64ms
// Space Complexity: O(1) 43.9MB
var countNegatives = function(grid) {
  let m = grid.length, negatives = 0;
  for (let i = 0; i < m; i++) {
    negatives += getNegatives(grid[i]);
  }
  return negatives;
};

function getNegatives(arr) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] < 0) high = mid;
    else low = mid + 1;
  }
  return arr[low] >= 0 ? 0 : arr.length - low;
}

// Solution 2: Two Pointers

// Starting at the topmost row, find the index of the leftmost negative number.
// For any following rows, we know that the index of the leftmost negative number will always be smaller than or equal.
// For each following row, move the column pointer until we reach a non-negative number.

// Time Complexity: O(m + n) 57ms
// Space Complexity: O(1) 44.4MB
var countNegatives = function(grid) {
  let m = grid.length, n = grid[0].length, negatives = 0;
  for (let i = 0, j = n; i < m; i++) {
    while (j >= 0 && grid[i][j - 1] < 0) j--;
    negatives += (n - j);
  }
  return negatives;
};

// Two test cases
console.log(countNegatives([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]])) // 8
console.log(countNegatives([[3,2],[1,0]])) // 0