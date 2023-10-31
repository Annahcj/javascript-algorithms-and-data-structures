// 1954. Minimum Garden Perimeter to Collect Enough Apples
// In a garden represented as an infinite 2D grid, there is an apple tree planted at every integer coordinate. The apple tree planted at an integer coordinate (i, j) has |i| + |j| apples growing on it.
// You will buy an axis-aligned square plot of land that is centered at (0, 0).
// Given an integer neededApples, return the minimum perimeter of a plot such that at least neededApples apples are inside or on the perimeter of that plot.


// Solution: Calculate Outer Rings with a Formula

// Thoughts:
// Apples on each outer ring:
// Side Length of 2, biggest coordinate 1: 12 apples
// Side Length of 4, biggest coordinate 2: 48 apples
// Side Length of 6, biggest coordinate 3: 108 apples
// and so on... 
// The formula for each outer ring is (biggest coordinate * biggestcoordinate * 12).
// To calculate ALL apples for the entire plot of land, keep a total of past rings (since we work from 1 outwards) as the total.

// Algorithm:
// Set a variable n (which is half of the side length) to 1, and a total (total number of apples which we will keep adding on)
// Loop while total apples is smaller than neededApples
  // Increment n
  // Calculate outer perimeter of new side length (12 * n * n), add it onto total apples.
// Return n * 8 (n is half of the side length, so the side length is n * 2. The land is always a square, so we times the side length by 4)

// Time Complexity: O(n) (n is perimeter) 88ms
// Space Complexity: O(1) 40.1MB
var minimumPerimeter = function(neededApples) {
  let n = 1, total = 12;
  while (total < neededApples) {
    n++;
    total += 12 * n * n;
  }
  return n * 8;
};

// Three test cases
console.log(minimumPerimeter(1)) // 8
console.log(minimumPerimeter(13)) // 16
console.log(minimumPerimeter(1000000000)) // 5040