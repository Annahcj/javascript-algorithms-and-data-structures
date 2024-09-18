// 3285. Find Indices of Stable Mountains
// There are n mountains in a row, and each mountain has a height. You are given an integer array height where height[i] represents the height of mountain i, and an integer threshold.
// A mountain is called stable if the mountain just before it (if it exists) has a height strictly greater than threshold. Note that mountain 0 is not stable.
// Return an array containing the indices of all stable mountains in any order.


// Solution: 

// Time Complexity: O(n) 53ms
// Space Complexity: O(1) excluding output 52.5MB
function stableMountains(height, threshold) {
  let n = height.length, stable = [];
  for (let i = 1; i < n; i++) {
    if (height[i - 1] > threshold) {
      stable.push(i);
    }
  }
  return stable;
};

// Two test cases
console.log(stableMountains([1,2,3,4,5], 2)) // [3,4]
console.log(stableMountains([10,1,10,1,10], 3)) // [1,3]