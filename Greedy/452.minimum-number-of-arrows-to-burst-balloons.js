// 452. Minimum Number of Arrows to Burst Balloons
// There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.
// Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.
// Given the array points, return the minimum number of arrows that must be shot to burst all balloons.


// Solution: Greedy w/ Sorting

// Sort the points by end, in asc order.
// Use an arrow on the end coordinate when the previous arrow doesn't overlap with the current balloon.
// Because the points are sorted by end, we are able to use the current arrow for other balloons on the right side, until we encounter a balloon it doesn't overlap with.

// Time Complexity: O(n log(n)) 218ms
// Space Complexity: O(log(n)) (space for sorting) 73.2MB
var findMinArrowShots = function(points) {
  let prevArrow = -Infinity, arrows = 0;
  points.sort((a, b) => a[1] - b[1]);
  for (let [start, end] of points) {
    if (start > prevArrow || end < prevArrow) {
      prevArrow = end;
      arrows++;
    }
  }
  return arrows;
};

// Three test cases
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])) // 2
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])) // 4
console.log(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]])) // 2