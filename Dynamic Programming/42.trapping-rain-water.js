// 42. Trapping Rain Water
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.


// Solution: DP

// The amount of water we can trap at position i is determined by the minimum out of the highest wall on the left and highest wall on the right of index i.
// Use two passes to find the maximum wall height on the right and left of each position i.

// Time Complexity: O(n) 66ms
// Space Complexity: O(n) 52.4MB
var trap = function(height) {
  let n = height.length, maxRight = Array(n).fill(0);   
  for (let i = n - 2; i >= 0; i--) {
    maxRight[i] = Math.max(maxRight[i + 1], height[i + 1]);
  }
  let maxLeft = height[0], sum = 0;
  for (let i = 1; i < n; i++) {
    let minHeight = Math.min(maxLeft, maxRight[i]);
    sum += Math.max(0, minHeight - height[i]);
    maxLeft = Math.max(maxLeft, height[i]);
  }
  return sum;
};
  
// Two test cases
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])) // 6
console.log(trap([4,2,0,3,2,5])) // 9