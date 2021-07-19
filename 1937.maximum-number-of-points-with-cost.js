// 1937. Maximum Number of Points with Cost
// You are given an m x n integer matrix points (0-indexed). Starting with 0 points, you want to maximize the number of points you can get from the matrix.
// To gain points, you must pick one cell in each row. Picking the cell at coordinates (r, c) will add points[r][c] to your score.
// However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. For every two adjacent rows r and r + 1 (where 0 <= r < m - 1), picking cells at coordinates (r, c1) and (r + 1, c2) will subtract abs(c1 - c2) from your score.
// Return the maximum number of points you can achieve.


// Solution 1: Brute Force with Dynamic Programming

// We are basically cumulatively calculating the maximum achieved sum

// Set the first row of dp to be the first row of points.
// Loop through the rows of points from [1..., i - 1]
  // Push a new row in dp
  // Loop through each number in row, 
    // Loop through each number in last computed row of dp,
      // find the max number achieved from each position - deviation from index
    // Push the maximum into the current row of dp
// Return the maximum value in the last row of dp.

// Time Complexity: O(m^2 * n) 6420ms	
// Space Complexity: O(mn) 85.1MB
var maxPoints = function(points) {
    let dp = [points[0]];
    let width = points[0].length, length = points.length;
    for (var i = 1; i < length; i++) {
      dp.push([]);
      for (var j = 0; j < width; j++) {
        let max = 0;
        for (var k = 0; k < dp[i - 1].length; k++) {
          max = Math.max(max, points[i][j] + dp[i - 1][k] - Math.abs(j - k));
        }
        dp[i].push(max);
      }
    }
    return Math.max(...dp[dp.length - 1]);
  };
  
  
  // Solution 2: Further Optimization with Dynamic Programming
  
  // Consider this example: [1,3,4,2,5]
  // How would we find the maximum point achieved from any given index without looping through the entire array every time?
  // We could traverse the array once from the left and once from the right, calculating the maximum point.
  // For the left: using numbers [1,3,4,2,5], go left to right, and pre-compute the first value since there's nothing to the left of it.
    // left: [1]
    // 1: The maximum point achieved is now computed in left[index - 1] and will always be exactly one index away, so we know that the biggest point we can achieve will be either the left[index - 1] - 1, or itself (point at index 1)
    // 2: Math.max of left[index - 1] - 1 -> (2) or itself (4), so 4.
    // 3: Math.max of left[index - 1] - 1 -> (3) or itself (2), so 3.
    // 4: Math.max of left[index - 1] - 1 -> (2) or itself (5), so 5.
  // Our left array is now fully computed -> [1,3,4,3,5]
  // For the right: using [1,3,4,2,5], this time go from right to left, and precompute the last value.
  // Instead of getting Math.max of index - 1, we would get it from index + 1, since we are going right to left.
    // right: [5]
    // 3: Math.max of right[index + 1] - 1 -> (4) or itself (2), so 4.
    // 2: Math.max of right[index + 1] - 1 -> (3) or itself (4), so 4.
    // 1: Math.max of right[index + 1] - 1 -> (3) or itself (3), so 3.
    // 0: Math.max of right[index + 1] - 1 -> (2) or itself (1), so 2.
  // Right array is now done -> [2,3,4,4,5]
  // Now, we can easily get the maximum point at any given index. We simply do Math.max(left[index], right[index]).
  
  // Keep a prev array and assign it points[0], prev will be constantly updated to be maximum points of each index of the previous row.
  // Loop through each row in points, create the max left array and max right array for prev.
  // Loop through each number in prev and update it to be the current-row[index] + Math.max(left[index], right[index]).
  // When all iterations are done, find the biggest number in prev and return it.
  
  // Time Complexity: O(m + n) 192ms
  // Space Complexity: O(n) 61MB
  var maxPoints = function(points) {
    let prev = points[0], width = points[0].length;
    for (var i = 1; i < points.length; i++) {
      let left = [prev[0]];
      for (var j = 1; j < width; j++) {
        left.push(Math.max(left[j - 1] - 1, prev[j]));
      }
      let right = Array(width);
      right[width - 1] = prev[prev.length - 1];
      for (var k = width - 2; k >= 0; k--) {
        right[k] = Math.max(right[k + 1] - 1, prev[k]);
      }
      for (var h = 0; h < width; h++) {
        prev[h] = points[i][h] + Math.max(left[h], right[h]);
      }
    }
    let max = 0;
    for (var g = 0; g < prev.length; g++) max = Math.max(max, prev[g]);
    return max;
  };
  
  // Two test cases to run function on
  console.log(maxPoints([[1,2,3],[1,5,1],[3,1,1]])) // 9
  console.log(maxPoints([[1,5],[2,3],[4,2]])) // 11