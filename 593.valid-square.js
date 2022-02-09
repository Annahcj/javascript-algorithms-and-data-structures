// 593. Valid Square
// Given the coordinates of four points in 2D space p1, p2, p3 and p4, return true if the four points construct a square.
// The coordinate of a point pi is represented as [xi, yi]. The input is not given in any order.
// A valid square has four equal sides with positive length and four equal angles (90-degree angles).


// Solution: Try all Permuations

// Calculate distance between two points: (y[0] - x[0]) ** 2 + (y[1] - x[1]) ** 2

// Edge case: If any point is equal to any other point, return false.

// 1. Get all permutations between the four points
// 2. Check each permutation for a valid square:
  // The distances between these points must all be equal to each other:
    // 1. Bottom Left and Bottom Right
    // 2. Bottom Right and Top Right
    // 3. Top Left and Top Right
    // 4. Top Left and Bottom Left
  // The last case:
    // Distance between (Bottom Left and Top Right) and (Top Left and Bottom Right) must be equal.

// Time Complexity: O(4!) = O(1) 103ms
// Space Complexity: O(1) 44.6MB
var validSquare = function(p1, p2, p3, p4) {
  let points = [p1, p2, p3, p4], res = false;
  
  let pointsSet = new Set();
  for (let [x, y] of points) {
    if (pointsSet.has(`${x},${y}`)) return false;
    pointsSet.add(`${x},${y}`);
  }
  
  backtrack(0, [...points]);
  return res;
  
  function backtrack(start, arr) {
    if (start === 4) {
      // check valid square
      if (isValid(...arr)) res = true;
      return;
    }
    for (let i = start; i < 4; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      backtrack(start + 1, arr);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  
  function isValid(bLeft, bRight, tLeft, tRight) {
    let d = dist(bLeft, bRight);
    if (d > 0 && dist(bRight, tRight) === d && dist(tLeft, tRight) === d && dist(bLeft, tLeft) === d && dist(tLeft, bRight) === dist(bLeft, tRight)) return true;
    return false;
  }
  
  function dist(x, y) {
    return (y[0] - x[0]) ** 2 + (y[1] - x[1]) ** 2;
  }
};

// Two test cases to run function on
console.log(validSquare([0,0], [1,1], [1,0], [0,1])) // true
console.log(validSquare([1,1], [5,3], [3,5], [7,7])) // false