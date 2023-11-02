// 1039. Minimum Score Triangulation of Polygon
// You have a convex n-sided polygon where each vertex has an integer value. You are given an integer array values where values[i] is the value of the ith vertex (i.e., clockwise order).
// You will triangulate the polygon into n - 2 triangles. For each triangle, the value of that triangle is the product of the values of its vertices, and the total score of the triangulation is the sum of these values over all n - 2 triangles in the triangulation.
// Return the smallest possible total score that you can achieve with some triangulation of the polygon.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(start, end).
// For each dp(start, end), try to take all possible triangles with two points anchored at (start, end).
// For each triangle we take, we will be splitting into three smaller pieces:
  // triangle taken: (start, i, end)
  // left: range (start, i)
  // right: range (i, end)

// Q. Would we not miss some possibilities if we anchor the triangles at (start, end)? 
// A. No, by anchoring at (start, end), we cover all possibilities in the sub-polygons.  

// Time Complexity: O(n^3) 69ms
// Space Complexity: O(n^2) 42.7MB
var minScoreTriangulation = function(values) {
  let n = values.length, memo = Array(n).fill(0).map(() => Array(n).fill(-1));
  return dp(0, n - 1);
  
  function dp(start, end) {
    let len = end - start + 1;
    if (len === 3) return values[start] * values[start + 1] * values[end];
    if (len < 3) return 0;
    if (memo[start][end] !== -1) return memo[start][end];
    
    let ans = Infinity;
    for (let i = start + 1; i < end; i++) {
      let score = values[start] * values[i] * values[end];
      ans = Math.min(ans, score + dp(start, i) + dp(i, end));
    }
    return memo[start][end] = ans;
  }
};


// Solution 2: DP - Tabulation

// Same approach as recursion with memoization, except we use tabulation to save the recursive space.
// start must loop backwards since we depend on larger values of dp[i][...], where i > start.

// Time Complexity: O(n^3) 79ms
// Space Complexity: O(n^2) 44.6MB
var minScoreTriangulation = function(values) {
  let n = values.length, dp = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let start = n - 1; start >= 0; start--) {
    for (let end = start + 1; end < n; end++) {
      for (let i = start + 1; i < end; i++) {
        let score = values[start] * values[i] * values[end];
        dp[start][end] = Math.min(dp[start][end], score + dp[start][i] + dp[i][end]);
      }
      dp[start][end] = dp[start][end] === Infinity ? 0 : dp[start][end];
    }
  }
  return dp[0][n - 1];
};

// Three test cases
console.log(minScoreTriangulation([1,2,3])) // 6
console.log(minScoreTriangulation([3,7,4,5])) // 144
console.log(minScoreTriangulation([1,3,1,4,1,5])) // 13