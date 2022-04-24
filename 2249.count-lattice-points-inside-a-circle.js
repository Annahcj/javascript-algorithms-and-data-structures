// 2249. Count Lattice Points Inside a Circle
// Given a 2D integer array circles where circles[i] = [xi, yi, ri] represents the center (xi, yi) and radius ri of the ith circle drawn on a grid, return the number of lattice points that are present inside at least one circle.
// Note:
  // A lattice point is a point with integer coordinates.
  // Points that lie on the circumference of a circle are also considered to be inside it.


// Solution: Brute Force & Euclidean Distance

// 1. Get the maximum x and y coordinate on the grid (remember to consider the points within the radius)
// 2. Loop through each point in the grid
  // Loop through each circle and check whether the distance between the circle center and grid point <= radius.
    // Calculate the distance using the euclidean distance algorithm.

// n = number of circles, m = number of points on the grid
// Time Complexity: O(nm) 218ms
// Space Complexity: O(1) 46.9MB
var countLatticePoints = function(circles) {
  let points = 0;
  let maxX = 0, maxY = 0;
  for (let [x, y, r] of circles) {
    maxX = Math.max(maxX, x + r); // x + r: consider points within the radius
    maxY = Math.max(maxY, y + r); // x + y: consider points within the radius
  }

  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
      for (let [x, y, r] of circles) {
        if (getDist([i, j], [x, y]) <= r) {
          points++;
          break;
        }
      }
    }
  }
  return points;
};

function getDist(p1, p2) {
  let [x1, y1] = p1, [x2, y2] = p2;
  let calc1 = (x2 - x1) * (x2 - x1), calc2 = (y2 - y1) * (y2 - y1);
  return Math.sqrt(calc1 + calc2);
}

// Two test cases to run function on
console.log(countLatticePoints([[2,2,1]])) // 5
console.log(countLatticePoints([[2,2,2],[3,4,1]])) // 16