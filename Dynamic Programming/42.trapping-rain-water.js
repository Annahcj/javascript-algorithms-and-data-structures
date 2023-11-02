// 42. Trapping Rain Water
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Solution: Dynamic Programming

// Thoughts:
// Use an array to store the lower wall of (the highest wall on the left and the highest wall on the right) at each given index.

// Algorithm:
// Keep an array walls in which we will store the wall height
// Loop through height from left to right, keeping a max left wall (highest wall on the left)
  // Push max into 'walls'
  // If height[i] is bigger than max, update max to be height[i].
// Loop through height from right to left, keeping a max right wall (highest wall on the right)
  // If right wall max is smaller than left wall max at index, update it. (we keep the smaller wall since the water will flow off)
  // Update right wall max if necessary
// Loop through walls (pointer = h), 
  // if walls[h] - height[h] is bigger than zero, add it to total.
// Return total.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 40.8MB
  var trap = function(height) {
    let walls = [], total = 0;
    let max = 0;
    for (var i = 0; i < height.length; i++) {
      walls.push(max);
      max = Math.max(max, height[i]);
    }
    max = 0;
    for (var j = height.length - 1; j >= 0; j--) {
      walls[j] = Math.min(walls[j], max);
      max = Math.max(max, height[j]);
    }
    for (var h = 0; h < height.length; h++) {
      let water = walls[h] - height[h];
      if (water > 0) total += water;
    }
    return total
  };
  
  // Two test cases to run function on
  console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])) // 6
  console.log(trap([4,2,0,3,2,5])) // 9