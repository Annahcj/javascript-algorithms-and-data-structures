// 3623. Count Number of Trapezoids I
// You are given a 2D integer array points, where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
// A horizontal trapezoid is a convex quadrilateral with at least one pair of horizontal sides (i.e. parallel to the x-axis). Two lines are parallel if and only if they have the same slope.
// Return the number of unique horizontal trapezoids that can be formed by choosing any four distinct points from points.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Combinatorics

// A horizontal trapezoid means the two horizontal sides must be parallel with the x-axis.
// Group all the points by their y coordinate and count the number of combinations of picking two points on the same y-coordinate and two points on a different y-coordinate.

// Go through each group of points and count the combinations of the current group with all the previous groups we have already processed.
// Keep track of the running sum of combinations from the groups we have already processed, and multiply them together with the current group's combinations.

// Say we have group A and group B on different y coordinates.
// Group A has (n - 1) * n / 2 distinct combinations,
// then group B has (n - 1) * n / 2 distinct combinations.
// Multiply them together to get the total combinations.

// n = number of points
// Time Complexity: O(n) 176ms
// Space Complexity: O(n) 103MB
function countTrapezoids(points) {
  const count = {};
  for (let [_x, y] of points) {
    count[y] = (count[y] || 0) + 1;
  }  
  const MOD = 1000000007n;
  let combinations = 0n, ans = 0n;
  for (let y in count) {
    const groupCombinations = BigInt(sumOf1ToN(count[y] - 1));
    ans = (ans + groupCombinations * combinations) % MOD;
    combinations = (groupCombinations + combinations) % MOD;
  }
  return Number(ans);
};

function sumOf1ToN(n) {
  return n * (n + 1) / 2;
}

// Two test cases
console.log(countTrapezoids([[1,0],[2,0],[3,0],[2,2],[3,2]])) // 3
console.log(countTrapezoids([[0,0],[1,0],[0,1],[2,1]])) // 1