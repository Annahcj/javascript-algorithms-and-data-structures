// 2250. Count Number of Rectangles Containing Each Point
// You are given a 2D integer array rectangles where rectangles[i] = [li, hi] indicates that ith rectangle has a length of li and a height of hi. You are also given a 2D integer array points where points[j] = [xj, yj] is a point with coordinates (xj, yj).
// The ith rectangle has its bottom-left corner point at the coordinates (0, 0) and its top-right corner point at (li, hi).
// Return an integer array count of length points.length where count[j] is the number of rectangles that contain the jth point.
// The ith rectangle contains the jth point if 0 <= xj <= li and 0 <= yj <= hi. Note that points that lie on the edges of a rectangle are also considered to be contained by that rectangle.


// Solution: Binary Search

// The constraints state that the height <= 10^9 and the width <= 100.
// Given these constraints, we can do binary search on the x coordinates and loop through the y coordinates in a brute force manner.

// To sum it up:
// 1. Group the rectangle coordinates by the y coordinate -> [[x coordinate, x coordinate, ...], [x coordinate, ...], ...]
// 2. Sort each of the buckets (because we need to binary search over them)
// 3. For each point, only loop through the buckets where the y coordinate >= the point's y coordinate.
  // For each bucket, binary search to find the number of coordinates where the x coordinate is >= the point's x coordinate.

// n = rectangles.length
// Time Complexity: O(n log(n) * 100) 627ms
// Space Complexity: O(n) 73.5MB
var countRectangles = function(rectangles, points) {
  let buckets = Array(101).fill(0).map(() => []);
  for (let [x, y] of rectangles) {
    buckets[y].push(x);
  }
  for (let i = 0; i < 101; i++) buckets[i].sort((a, b) => a - b);

  let res = [];
  for (let point of points) {
    let sum = 0;
    for (let j = point[1]; j < 101; j++) {
      // lowest index >= point[0]
      let index = lower_bound(buckets[j], point[0]);
      sum += buckets[j].length - index;
    }
    res.push(sum);
  }
  return res;

  function lower_bound(arr, targ) {
    let low = 0, high = arr.length;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] >= targ) high = mid;
      else low = mid + 1;
    }
    return low;
  }
};

// Three test cases to run function on
console.log(countRectangles([[1,2],[2,3],[2,5]], [[2,1],[1,4]])) // [2,1]
console.log(countRectangles([[1,1],[2,2],[3,3]], [[1,3],[1,1]])) // [1,3]
console.log(countRectangles([[7,1],[2,6],[1,4],[5,2],[10,3],[2,4],[5,9]], [[10,3],[8,10],[2,3],[5,4],[8,5],[7,10],[6,6],[3,6]])) // [1,0,4,1,0,0,0,1]