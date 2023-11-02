// 356. Line Reflection
// Given n points on a 2D plane, find if there is such a line parallel to the y-axis that reflects the given points symmetrically.
// In other words, answer whether or not if there exists a line that after reflecting all points over the given line, the original points' set is the same as the reflected ones.
// Note that there can be repeated points.


// Solution: Hashset

// The sum of a pair of symmetrical x coordinates will always be the same.
// e.g: if the y axis is 3, and we have points [[2,0],[4,0],[1,2],[5,2]],
// symmetrical points will be:
  // [2,0],[4,0], 2 + 4 = 6
  // [1,2],[5,2], 1 + 5 = 6

// 1. Find the minimum and maximum x coordinates in points, and add each coordinate to a hashset.
// 2. Get the sum: minimum + maximum.
// 3. Loop through each point, if the hashset doesn't contain [sum - x, y], return false.

// explaining (sum - x): 
  // using the example above, the sum is 6.
  // let's loop through points:
  // [2, 0]: hashset has [6 - 2, 0] = [4, 0]
  // [4, 0]: hashset has [6 - 4, 0] = [2, 0]
  // [1, 2]: hashset has [6 - 1, 2] = [5, 2]
  // [5, 2]: hashset has [6 - 5, 2] = [1, 2]

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 46.2MB
var isReflected = function(points) {
  let min = Infinity, max = -Infinity;
  let hashset = new Set();
  for (var [x, y] of points) {
    min = Math.min(min, x);
    max = Math.max(max, x);
    hashset.add(`${x},${y}`);
  }
  let sum = min + max;
  for (var [x, y] of points) {
    if (!hashset.has(`${sum - x},${y}`)) return false;
  }
  return true;
};

// Two test cases to run function on
console.log(isReflected([[1,1],[-1,1]])) // true
console.log(isReflected([[1,1],[-1,-1]])) // false