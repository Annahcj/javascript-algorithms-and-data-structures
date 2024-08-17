// 1937. Maximum Number of Points with Cost
// You are given an m x n integer matrix points (0-indexed). Starting with 0 points, you want to maximize the number of points you can get from the matrix.
// To gain points, you must pick one cell in each row. Picking the cell at coordinates (r, c) will add points[r][c] to your score.
// However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. For every two adjacent rows r and r + 1 (where 0 <= r < m - 1), picking cells at coordinates (r, c1) and (r + 1, c2) will subtract abs(c1 - c2) from your score.
// Return the maximum number of points you can achieve.


// Solution: DP

// Populate each dp[i][j], where dp[i][j] = the maximum number of points up to the cell (i, j).

// For each row i, 
  // Calculate the previous row's maximum points at each column j.
    // leftMax[j] = the maximum points to the left of or at index j, given the current column is j (meaning that we lose points the further left of j).
    // rightMax[j] = the maximum points to the right of or at index j, given the current column is j (meaning that we lose points the further right of j).
    // To calculate the max points, we take max(currMax - 1, current column points). 
  // For every dp[i][j], take the maximum of points[i][j] + Math.max(leftMax[j], rightMax[j]).

// Note that we only need the previous row's results, so we don't need to store the entire matrix of maximum points, but only the previous and current row's results.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 168ms
// Space Complexity: O(n) 73.9MB
function maxPoints(points) {
  let m = points.length, n = points[0].length;
  let prev = Array(n).fill(0);
  let prevLeftMax = Array(n).fill(0), prevRightMax = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    let curr = Array(n);
    for (let j = 0; j < n; j++) {
      curr[j] = points[i][j] + Math.max(prevLeftMax[j], prevRightMax[j]);
    }
    let leftMax = [...curr];
    for (let j = 1; j < n; j++) {
      leftMax[j] = Math.max(leftMax[j - 1] - 1, curr[j]);
    }
    let rightMax = [...curr];
    for (let j = n - 2; j >= 0; j--) {
      rightMax[j] = Math.max(rightMax[j + 1] - 1, curr[j]);
    }
    prev = curr;
    prevLeftMax = leftMax;
    prevRightMax = rightMax;
  }
  return Math.max(...prev);
};

// Two test cases
console.log(maxPoints([[1,2,3],[1,5,1],[3,1,1]])) // 9
console.log(maxPoints([[1,5],[2,3],[4,2]])) // 11