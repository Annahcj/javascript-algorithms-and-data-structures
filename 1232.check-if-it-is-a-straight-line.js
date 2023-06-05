// 1232. Check If It Is a Straight Line
// You are given an array coordinates, coordinates[i] = [x, y], where [x, y] represents the coordinate of a point. Check if these points make a straight line in the XY plane.


// Solution: Slope w/ GCD

// For each adjacent pair of coordinates, find the slope using the formula: (y2 - y1) / (x2 - x1).
// Find the GCD for each slope, then divide both x and y of the slope by the GCD.
// If all slopes between each pair of coordinates are the same after dividing by GCD, then they make a straight line.
// Note: We avoid actually dividing the slope numerator and denominator to prevent integer overflow.

// Time Complexity: O(n) 61ms
// Space Complexity: O(1) 45MB
var checkStraightLine = function(coordinates) {
  let n = coordinates.length, baseSlope = getSimplifiedSlope(...coordinates[0], ...coordinates[1]);
  for (let i = 1; i < n - 1; i++) {
    let slope = getSimplifiedSlope(...coordinates[i], ...coordinates[i + 1]);
    if (baseSlope[0] !== slope[0] || baseSlope[1] !== slope[1]) {
      return false;
    }
  }
  return true;
};

function getSimplifiedSlope(x1, y1, x2, y2) {
  let slopeX = x2 - x1, slopeY = y2 - y1;
  let gcd = getGCD(slopeX, slopeY);
  return [slopeX / gcd, slopeY / gcd];
}

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}

// Two test cases
console.log(checkStraightLine([[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]])) // true
console.log(checkStraightLine([[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]])) // false