// 2078. Two Furthest Houses With Different Colors
// There are n houses evenly lined up on the street, and each house is beautifully painted. You are given a 0-indexed integer array colors of length n, where colors[i] represents the color of the ith house.
// Return the maximum distance between two houses with different colors.
// The distance between the ith and jth houses is abs(i - j), where abs(x) is the absolute value of x.


// Solution: Brute Force

// Loop through each color (pointer = i)
  // loop backwards from colors.length - 1 to i + 1 (pointer = j)
    // if colors[j] is different from colors[i], update max if j - i is bigger than max.
// Return max.

// Time Complexity: O(n^2) 110ms
// Space Complexity: O(1) 38.6MB
var maxDistance = function(colors) {
  let max = 0;
  for (let i = 0; i < colors.length; i++) {
    for (let j = colors.length - 1; j > i; j--) {
      if (colors[j] !== colors[i]) max = Math.max(max, j - i);
    }
  }
  return max;
};

// Two test cases
console.log(maxDistance([1,1,1,6,1,1,1])) // 3
console.log(maxDistance([1,8,3,8,3])) // 4