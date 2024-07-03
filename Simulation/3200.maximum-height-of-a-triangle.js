// 3200. Maximum Height of a Triangle
// You are given two integers red and blue representing the count of red and blue colored balls. You have to arrange these balls to form a triangle such that the 1st row will have 1 ball, the 2nd row will have 2 balls, the 3rd row will have 3 balls, and so on.
// All the balls in a particular row should be the same color, and adjacent rows should have different colors.
// Return the maximum height of the triangle that can be achieved.


// Solution: Simulation

// Simulate finding the maximum height of the triangle starting from red, and starting from blue.
// Return the maximum height out of the two.

// n = red, m = blue
// Time Complexity: O(sqrt(n + m)) 58ms
// Space Complexity: O(1) 51.1MB
function maxHeightOfTriangle(red, blue) {
  return Math.max(getMaxHeight(red, blue), getMaxHeight(blue, red));  
};

function getMaxHeight(red, blue) {
  let row = 1, isRed = true;
  while (true) {
    if (isRed) {
      if (red < row) return row - 1;
      red -= row;
    } else {
      if (blue < row) return row - 1;
      blue -= row;
    }
    isRed = !isRed;
    row++;
  }
}

// Four test cases
console.log(maxHeightOfTriangle(2, 4)) // 3
console.log(maxHeightOfTriangle(2, 1)) // 2
console.log(maxHeightOfTriangle(1, 1)) // 1
console.log(maxHeightOfTriangle(10, 1)) // 2