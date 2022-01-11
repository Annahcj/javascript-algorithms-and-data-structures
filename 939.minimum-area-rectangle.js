// 939. Minimum Area Rectangle
// You are given an array of points in the X-Y plane points where points[i] = [xi, yi].
// Return the minimum area of a rectangle formed from these points, with sides parallel to the X and Y axes. If there is not any such rectangle, return 0.


// Solution: Find diagonal points

// The main idea is to compare diagonal points, and check whether the other two points also exist.

// 1. Create a set for every x coordinate, and populate it with all the y coordinates on the x line.
// 2. Compare every two points ((x1, y1) and (x2, y2)), 
  // make sure they are diagonal (not the same x and not the same y)
  // check if the x1 set contains y2 AND the x2 set contains y1 (to form a rectangle)
    // get the size of the rectangle

// Time Complexity: O(n^2) 416ms
// Space Complexity: O(n) 45.2MB
var minAreaRect = function(points) {
  let map = new Map();
  for (var [x, y] of points) {
    if (!map.has(x)) map.set(x, new Set());
    map.get(x).add(y);
  }
  
  let ans = Infinity;
  for (var [x1, y1] of points) {
    for (var [x2, y2] of points) {
      if (x1 === x2 || y1 === y2) continue;
      if (map.get(x1).has(y2) && map.get(x2).has(y1)) {
        ans = Math.min(ans, Math.abs(x1 - x2) * Math.abs(y1 - y2));
      }
    }
  }
  return ans === Infinity ? 0 : ans;
};

// Two test cases to run function on
console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[2,2]])) // 4
console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]])) // 2