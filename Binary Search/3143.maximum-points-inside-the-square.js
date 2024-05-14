// 3143. Maximum Points Inside the Square
// You are given a 2D array points and a string s where, points[i] represents the coordinates of point i, and s[i] represents the tag of point i.
// A valid square is a square centered at the origin (0, 0), has edges parallel to the axes, and does not contain two points with the same tag.
// Return the maximum number of points contained in a valid square.
// Note:
  // A point is considered to be inside the square if it lies on or within the square's boundaries.
  // The side length of the square can be zero.


// Solution: Binary Search

// Binary search for the maximum length of the square.
// For a length `len`, loop through the points to count how many are within the square, and whether it contains duplicate tags.
// To check whether a point is within a square with length `len`, it should meet the following conditions:
  // x >= -len and x <= len
  // y >= -len and y <= len

// n = number of points, m = maximum point coordinate in points
// Time Complexity: O(n log(m)) 144ms
// Space Complexity: O(1) 73.7MB
var maxPointsInsideSquare = function(points, s) {
  let low = 0, high = points.reduce((max, point) => Math.max(max, Math.abs(point[0]), Math.abs(point[1])), 0);
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    let validPoints = countValidPoints(points, s, mid);
    if (validPoints > -1) low = mid;
    else high = mid - 1;
  }
  return countValidPoints(points, s, low);
};
  
function countValidPoints(points, s, len) {
  let count = 0, tags = Array(26).fill(false);
  for (let i = 0; i < points.length; i++) {
    if (!isWithinSquare(points[i], len)) continue;
    if (tags[s.charCodeAt(i) - 97]) return -1;

    tags[s.charCodeAt(i) - 97] = true;
    count++;
  }
  return count;
}
  
function isWithinSquare(point, len) {
  return point[0] >= -len && point[0] <= len && point[1] >= -len && point[1] <= len;
}

// Three test cases
console.log(maxPointsInsideSquare([[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], "abdca")) // 2
console.log(maxPointsInsideSquare([[1,1],[-2,-2],[-2,2]], "abb")) // 1
console.log(maxPointsInsideSquare([[1,1],[-1,-1],[2,-2]], "ccd")) // 0