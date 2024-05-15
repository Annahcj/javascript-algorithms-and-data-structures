// 3143. Maximum Points Inside the Square
// You are given a 2D array points and a string s where, points[i] represents the coordinates of point i, and s[i] represents the tag of point i.
// A valid square is a square centered at the origin (0, 0), has edges parallel to the axes, and does not contain two points with the same tag.
// Return the maximum number of points contained in a valid square.
// Note:
  // A point is considered to be inside the square if it lies on or within the square's boundaries.
  // The side length of the square can be zero.


// Solution: Flatten Grid

// Instead of looking at the two-dimensional points, treat it as a flat line, taking the maximum coordinate value out of [x, y].
// Reasoning: We are looking at the furthest coordinate away from the origin, hence taking the maximum absolute value for [x, y].
// From now on, we will treat points as the distance away from origin.

// For each tag, find the minimum and second minimum distance away from origin.
// Out of all tags, find the smallest second minimum distance away from origin, this will be the final square size.
// At the end, go through each tag and count tags where the minimum distance away from origin is within the square size.

// e.g.             a  b  b     a   c
//      1  2  3  4  5  6  7  8  9  10

// a: The second minimum distance from origin is 9, hence the square size will be 8 (-1 because we can't include this duplicate point).
// b: The second minimum distance from origin is 7, hence the square size becomes 6.
// There are two points (a and b) within the final square size.

// Time Complexity: O(n) 130ms
// Space Complexity: O(1) 74.5MB
var maxPointsInsideSquare = function(points, s) {
  let min = Array(26).fill(Infinity);
  let squareLen = Infinity, n = points.length;
  for (let i = 0; i < n; i++) {
    let [x, y] = points[i];
    let tagCharcode = s.charCodeAt(i) - 97;
    let maxCoord = Math.max(Math.abs(x), Math.abs(y));
    if (maxCoord <= min[tagCharcode]) {
      squareLen = Math.min(squareLen, min[tagCharcode] - 1);
      min[tagCharcode] = maxCoord;
    } else {
      squareLen = Math.min(squareLen, maxCoord - 1);
    }
  }
  return min.reduce((pointsInSquare, minCoordForTag) => pointsInSquare + (minCoordForTag < Infinity && minCoordForTag <= squareLen ? 1 : 0), 0);
};

// Three test cases
console.log(maxPointsInsideSquare([[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], "abdca")) // 2
console.log(maxPointsInsideSquare([[1,1],[-2,-2],[-2,2]], "abb")) // 1
console.log(maxPointsInsideSquare([[1,1],[-1,-1],[2,-2]], "ccd")) // 0