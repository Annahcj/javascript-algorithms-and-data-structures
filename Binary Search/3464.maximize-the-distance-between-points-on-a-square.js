// 3464. Maximize the Distance Between Points on a Square
// You are given an integer side, representing the edge length of a square with corners at (0, 0), (0, side), (side, 0), and (side, side) on a Cartesian plane.
// You are also given a positive integer k and a 2D integer array points, where points[i] = [x[i], y[i]] represents the coordinate of a point lying on the boundary of the square.
// You need to select k elements among points such that the minimum Manhattan distance between any two points is maximized.
// Return the maximum possible minimum Manhattan distance between the selected k points.
// The Manhattan Distance between two cells (x[i], y[i]) and (x[j], y[j]) is |x[i] - x[j]| + |y[i] - y[j]|.


// Solution: Binary Search & Greedy

// Binary search for the maximum minimum distance between points.
// Treat the sides of a square as a straight line.
// Convert each point to the corresponding coordinate on a flat line:
  // Left side: y
  // Top: x + y
  // Right: (side * 2) + (side - y)
  // Bottom: (side * 3) + (side - x)

// For a distance d, greedily check whether we can take k points with a minimum distance of d.
// Try every starting point, and greedily find the closest possible next points. If we can get k points, that distance is possible.
// Use binary search to find the closest next points. Since k <= 25, in total this will be n * 25 (for every starting point).

// n = number of points
// Time Complexity: O(nk * log(side)) 122ms
// Space Complexity: O(1) 62.84MB
function maxDistance(side, points, k) {
  points = points.map(([x, y]) => { // convert to points on a flat line
    if (x === 0) { // left
      return y;
    } else if (y === side) { // top
      return x + y;
    } else if (x === side) { // right
      return (side * 2) + (side - y);
    } else { // bottom
      return (side * 3) + (side - x);
    }
  }).sort((a, b) => a - b);
  
  let low = 1, high = side;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isPossible(points, side, k, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

// Check that we can take at least k points that are at least `minDist` apart
function isPossible(points, side, k, minDist) {
  const n = points.length, endOfLine = side * 4;
  for (let i = 0; i < n; i++) {
    let j = i, taken = 1;
    while (taken < k) {
      // binary search for the leftmost point at least `minDist` away from points[j], on the right of j.
      let low = j, high = n - 1;
      while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (points[mid] - points[j] >= minDist) high = mid;
        else low = mid + 1;
      }
      // no valid point on the right side, or too close to the starting point (wraps around circularly).
      if (points[low] - points[j] < minDist || endOfLine + points[i] - points[low] < minDist) {
        break;
      }
      j = low, taken++;
    }
    if (taken === k) {
      return true;
    }
  }
  return false;
}

// Two test cases
console.log(maxDistance(2, [[0,2],[2,0],[2,2],[0,0]], 4)) // 2
console.log(maxDistance(2, [[0,0],[1,2],[2,0],[2,2],[2,1]], 4)) // 1