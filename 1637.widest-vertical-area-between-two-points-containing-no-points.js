// 1637. Widest Vertical Area Between Two Points Containing No Points
// Given n points on a 2D plane where points[i] = [xi, yi], Return the widest vertical area between two points such that no points are inside the area.
// A vertical area is an area of fixed-width extending infinitely along the y-axis (i.e., infinite height). The widest vertical area is the one with the maximum width.
// Note that points on the edge of a vertical area are not considered included in the area.


// Solution: Sorting

// We only care about the vertical area x (points[i][0]).
// Sort the points by x.
// Get the difference of each adjacent pair of points and record the maximum.

// Time Complexity: O(n log(n)) 206ms
// Space Complexity: O(log(n)) (space for sorting) 64.5MB
var maxWidthOfVerticalArea = function(points) {
  points.sort((a, b) => a[0] - b[0]);
  let n = points.length, maxDiff = 0;
  for (let i = 1; i < n; i++) {
    maxDiff = Math.max(maxDiff, points[i][0] - points[i - 1][0]);
  }
  return maxDiff;
};