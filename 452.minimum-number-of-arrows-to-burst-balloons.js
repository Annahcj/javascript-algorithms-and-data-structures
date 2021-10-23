// 452. Minimum Number of Arrows to Burst Balloons
// There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.
// Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.
// Given the array points, return the minimum number of arrows that must be shot to burst all balloons.


// Solution: Greedy Approach w/ Sorting

// Thoughts:
// Sort in asc order by end point
// Set 'end' to the first end point.
// Loop through each [currStart, currEnd] in points
  // (greedily take as many balloons as you can based on the 'end')
  // if currStart is bigger than end (not overlapping)
    // increment ans by one (take another arrow)
    // update end to currEnd
// Return ans.

// Time Complexity: O(n log(n)) 326ms
// Space Complexity: O(log(n)) 67.4MB
var findMinArrowShots = function(points) {
  let ans = 1;
  points.sort((a, b) => a[1] - b[1]);
  let end = points[0][1];
  for (var [currStart, currEnd] of points) {
    if (currStart > end) {
      ans++;
      end = currEnd;
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])) // 2
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])) // 4
console.log(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]])) // 2