// 1423. Maximum Points You Can Obtain from Cards
// There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.
// In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.
// Your score is the sum of the points of the cards you have taken.
// Given the integer array cardPoints and the integer k, return the maximum score you can obtain.


// Solution 1: Prefix Sum - Try all combinations

// Try out each k combinations:
  // 0 from left, k from right.
  // 1 from left, k - 1 from right.
  // 2 from left, k - 2 from right.
  // etc...

// Store the prefix sum of the first k nums from the left, and last k nums from the right.

// Time Complexity: O(k) 102ms
// Space Complexity: O(k) 50.6MB
var maxScore = function(cardPoints, k) {
  let n = cardPoints.length;
  let left = Array(k + 1).fill(0), right = Array(k + 1).fill(0);
  for (let i = 0; i < k; i++) {
    left[i + 1] = cardPoints[i] + left[i];
    right[i + 1] = cardPoints[n - i - 1] + right[i];
  }
  // take i from left, k - i from right
  let ans = 0;
  for (let i = 0; i <= k; i++) {
    let leftScore = left[i], rightScore = right[k - i];
    ans = Math.max(ans, leftScore + rightScore);
  }
  return ans;
};

// Solution 2: Constant Space

// 1. Calculate the sum of the last k cardPoints.
// 2. Keep the running sum of the first k cardPoints and try every combination
  // calculate the score: left + right
  // add cardPoints[i] to left
  // subtract cardPoints[n - k + i] from right

// Time Complexity: O(k) 80ms
// Space Complexity: O(1) 48.2MB
var maxScore = function(cardPoints, k) {
  let n = cardPoints.length;
  let left = 0, right = 0;
  for (let i = n - k; i < n; i++) right += cardPoints[i];
  // take i from left, k - i from right
  let ans = 0;
  for (let i = 0; i <= k; i++) {
    ans = Math.max(ans, left + right);
    left += cardPoints[i], right -= cardPoints[n - k + i];
  }
  return ans;
};

// Two test cases to run function on
console.log(maxScore([1,2,3,4,5,6,1], 3)) // 12
console.log(maxScore([9,7,7,9,7,7,9], 7)) // 55