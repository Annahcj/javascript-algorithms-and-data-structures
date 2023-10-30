// 2865. Beautiful Towers I
// You are given a 0-indexed array maxHeights of n integers.
// You are tasked with building n towers in the coordinate line. The ith tower is built at coordinate i and has a height of heights[i].
// A configuration of towers is beautiful if the following conditions hold:
  // 1 <= heights[i] <= maxHeights[i]
  // heights is a mountain array.
// Array heights is a mountain if there exists an index i such that:
  // For all 0 < j <= i, heights[j - 1] <= heights[j]
  // For all i <= k < n - 1, heights[k + 1] <= heights[k]
// Return the maximum possible sum of heights of a beautiful configuration of towers.


// Solution 1: Brute Force 

// Try to take each position as the peak.
// From the peak, iterate to the left and right and calculate the sum of heights ensuring that the heights on the left of the peak and right of the peak decrease/are equal.

// Time Complexity: O(n^2) 72ms
// Space Complexity: O(1) 43.7MB
var maximumSumOfHeights = function(maxHeights) {
  let n = maxHeights.length, maxSum = 0;
  for (let i = 0; i < n; i++) {
    let peak = maxHeights[i], currHeight = peak, sum = peak;
    for (let j = i - 1; j >= 0; j--) {
      currHeight = Math.min(currHeight, maxHeights[j]);
      sum += currHeight;
    }
    currHeight = peak;
    for (let j = i + 1; j < n; j++) {
      currHeight = Math.min(currHeight, maxHeights[j]);
      sum += currHeight;
    }
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
};


// Solution 2: Monotonic Increasing Stack

// Find the maximum possible sum of heights ending and starting at each index i.
  // left: left[i] = sum of heights from (0, ..., i) such that they are descending from index i to 0.
  // right: right[i] = sum of heights from (i, ..., n - 1) such that they are descending from index i to n - 1.

// Use a monotonic increasing stack to store indices of maxHeights such that they are smaller than maxHeights[i].
  // left to right: We know that from index i to stack[stack.length - 1], all heights are smaller than maxHeights[i].
  // Take the existing sum up to stack[stack.length - 1] (left[stack[stack.length - 1]]) and add the sum for the current range (maxHeights[i] * (i - stack[stack.length - 1]))
  // Then, do the same from right to left.

// Take each maxHeights[i] as the peak of the mountain and use the results from left[i] and right[i] to calculate the total sum of heights.

// Time Complexity: O(n) 78ms
// Space Complexity: O(n) 45.9MB
var maximumSumOfHeights = function(maxHeights) {
  let n = maxHeights.length, left = Array(n).fill(0);
  let stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && maxHeights[stack[stack.length - 1]] >= maxHeights[i]) stack.pop();
    if (stack.length) {
      let lastIndex = stack[stack.length - 1];
      let currentRange = i - lastIndex;
      left[i] = left[lastIndex] + maxHeights[i] * currentRange;
    } else {
      left[i] = maxHeights[i] * (i + 1);
    }
    stack.push(i);
  }
  stack = [];
  let right = Array(n).fill(0), ans = 0;
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && maxHeights[stack[stack.length - 1]] >= maxHeights[i]) stack.pop();
    if (stack.length) {
      let lastIndex = stack[stack.length - 1];
      let len = lastIndex - i;
      right[i] = right[lastIndex] + maxHeights[i] * len;
    } else {
      let len = n - i;
      right[i] = maxHeights[i] * len;
    }
    stack.push(i);
    ans = Math.max(ans, left[i] + right[i] - maxHeights[i]);
  }
  return ans;
};

// Three test cases
console.log(maximumSumOfHeights([5,3,4,1,1])) // 13
console.log(maximumSumOfHeights([6,5,3,9,2,7])) // 22
console.log(maximumSumOfHeights([3,2,5,5,2,3])) // 18