// 149. Max Points on a Line
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.


// Solution: Use GCD to get slope

// For every point, loop through every other point and get the slope between the two points. Keep a map which counts the number of points on the same slope.
// How to calculate slope: e.g: [4,8], [2,4] -> 
  // diffX = 4 - 2 = 2, diffY = 8 - 4 = 4
  // get GCD for 2,4 => 2
  // the slope is [diffX / gcd (1), diffY / gcd (2)]
// Duplicate points: count the number of duplicate points and add it to the sum of every slope.

// n = points.length
// Time Complexity: O(n^2) 104ms
// Space Complexity: O(n) 44.7MB
var maxPoints = function(points) {
  let ans = 0;
  for (var i = 0; i < points.length; i++) {
    let slopeMap = {}, duplicates = 1;
    let [x1, y1] = points[i];
    for (var j = i + 1; j < points.length; j++) {
      let [x2, y2] = points[j];
      if (x1 === x2 && y1 === y2) {
        duplicates++;
      } else {
        let diffX = x1 - x2, diffY = y1 - y2;
        let xyGCD = gcd(diffX, diffY), slope = `${diffX / xyGCD},${diffY / xyGCD}`;
        slopeMap[slope] = (slopeMap[slope] || 0) + 1;
      }
    }
    ans = Math.max(ans, duplicates);
    for (var key in slopeMap) {
      ans = Math.max(ans, slopeMap[key] + duplicates);
    }
  } 
  return ans; 
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases to run function on
console.log(maxPoints([[1,1],[2,2],[3,3]])) // 3
console.log(maxPoints([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]])) // 4