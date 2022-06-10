// 963. Minimum Area Rectangle II
// You are given an array of points in the X-Y plane points where points[i] = [xi, yi].
// Return the minimum area of any rectangle formed from these points, with sides not necessarily parallel to the X and Y axes. If there is not any such rectangle, return 0.
// Answers within 10^-5 of the actual answer will be accepted.


// Solution: Brute Force w/ Hashset

// Keep the points in a hashset for quick look-up.
// Brute force the combinations for three points - 
  // Use pythagorean's theorem to check that the three points make up a right angle, indicating that they can be valid points in a rectangle.
    // a^2 + b^2 = c^2, where a is the length from the first two points, b is the length of the latter two points, and c is the length from the first and third point.
  // Properties of a rectangle: x1 + x3 = x2 + x4, and y1 + y3 = y2 + y4
    // Reference - https://www.mathopenref.com/coordrectangle.html
    // We can change the formula to find x4 and y4: x4 = x1 + x3 - x2, y4 = y1 + y3 - y2
    // Check if the hashset contains (x4, y4), if it does, we have found a valid rectangle.

// Time Complexity: O(n^3) 218ms
// Space Complexity: O(n) 45.9MB
var minAreaFreeRect = function(points) {
  let ans = Infinity;
  let n = points.length, pointsSet = new Set(points.map(point => `${point[0]},${point[1]}`));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;
        if (getDistSquared(points[i], points[j]) + getDistSquared(points[j], points[k]) !== getDistSquared(points[i], points[k])) continue; 
        let newX = points[i][0] + points[k][0] - points[j][0];
        let newY = points[i][1] + points[k][1] - points[j][1];
        if (!pointsSet.has(`${newX},${newY}`)) continue;
        ans = Math.min(ans, Math.sqrt(getDistSquared(points[i], points[j])) * Math.sqrt(getDistSquared(points[j], points[k])));
      }
    }
  }
  return ans === Infinity ? 0 : ans;
  
  function getDistSquared(p1, p2) {
    let calc1 = (p1[0] - p2[0]) * (p1[0] - p2[0]);
    let calc2 = (p1[1] - p2[1]) * (p1[1] - p2[1]);
    return calc1 + calc2;
  }
};

// Three test cases to run function on
console.log(minAreaFreeRect([[1,2],[2,1],[1,0],[0,1]])) // 2
console.log(minAreaFreeRect([[0,1],[2,1],[1,1],[1,0],[2,0]])) // 1
console.log(minAreaFreeRect([[0,3],[1,2],[3,1],[1,3],[2,1]])) // 0