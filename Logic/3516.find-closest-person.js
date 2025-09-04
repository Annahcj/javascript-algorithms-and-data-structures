// 3516. Find Closest Person
// You are given three integers x, y, and z, representing the positions of three people on a number line:
  // x is the position of Person 1.
  // y is the position of Person 2.
  // z is the position of Person 3, who does not move.
// Both Person 1 and Person 2 move toward Person 3 at the same speed.
// Determine which person reaches Person 3 first:
  // Return 1 if Person 1 arrives first.
  // Return 2 if Person 2 arrives first.
  // Return 0 if both arrive at the same time.
// Return the result accordingly.


// Solution: Math.abs

// Find the absolute distance from x -> z and y -> z and return the one with the smaller distance.

// Time Complexity: O(1) 0ms
// Space Complexity: O(1) 55MB
function findClosest(x, y, z) {
  const distX = Math.abs(x - z);
  const distY = Math.abs(y - z);
  if (distX === distY) {
    return 0;
  }
  return distX < distY ? 1 : 2;
};

// Three test cases
console.log(findClosest(2, 7, 4)) // 1
console.log(findClosest(2, 5, 6)) // 2
console.log(findClosest(1, 5, 3)) // 0