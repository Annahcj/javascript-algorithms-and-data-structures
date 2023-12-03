// 1266. Minimum Time Visiting All Points
// On a 2D plane, there are n points with integer coordinates points[i] = [x[i], y[i]]. Return the minimum time in seconds to visit all the points in the order given by points.
// You can move according to these rules:
  // In 1 second, you can either:
    // move vertically by one unit,
    // move horizontally by one unit, or
    // move diagonally sqrt(2) units (in other words, move one unit vertically then one unit horizontally in 1 second).
  // You have to visit the points in the same order as they appear in the array.
  // You are allowed to pass through points that appear later in the order, but these do not count as visits.


// Solution: Greedy

// Between each two points, we can use a greedy calculation to get the minimum time to reach one point from another.
// Since we can move in 8 directions including diagonally, the minimum time is the maximum out of: (absolute difference between x coordinates, absolute difference between y coordinates).
// Reasoning: We can always use the diagonal to jump both horizontally and vertically at the same time. So we only need to calculate the longest distance horizontally or vertically.

// n = number of points
// Time Complexity: O(n) 63ms
// Space Complexity: O(1) 44.1MB
var minTimeToVisitAllPoints = function(points) {
  let n = points.length, visitTime = 0;
  for (let i = 1; i < n; i++) {
    visitTime += Math.max(Math.abs(points[i][0] - points[i - 1][0]), Math.abs(points[i][1] - points[i - 1][1]));
  }
  return visitTime;
};

// Two test cases
console.log(minTimeToVisitAllPoints([[1,1],[3,4],[-1,0]])) // 7
console.log(minTimeToVisitAllPoints([[3,2],[-2,2]])) // 5