// 837. New 21 Game
// Alice plays the following game, loosely based on the card game "21".
// Alice starts with 0 points and draws numbers while she has less than k points. During each draw, she gains an integer number of points randomly from the range [1, maxPts], where maxPts is an integer. Each draw is independent and the outcomes have equal probabilities.
// Alice stops drawing numbers when she gets k or more points.
// Return the probability that Alice has n or fewer points.
// Answers within 10^-5 of the actual answer are considered accepted.


// Solution: DP

// dp[i] = probablity of getting i points.
// Base cases: dp[0] = 1, since there is 100% chance of getting 0 points.
// For each dp[i] where i < maxPts, dp[i] = 1 / maxPts.
// For each j where i - j <= maxPts, dp[i] += dp[i - 1] / maxPts.

// Notice the following observation: 
  // e.g: 1/maxPts + 0.5/maxPts + 0.7/maxPts = 2.2/maxPts
// Keep track of sum of the last maxPts dp[i] using a sliding window approach.

// Time Complexity: O(n) 67ms
// Space Complexity: O(n) 44.3MB
var new21Game = function(n, k, maxPts) {
  if (k === 0 || n - maxPts > k) return 1;
  let dp = Array(n + 1), sum = 1, ans = 0;
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    dp[i] = sum / maxPts;
    if (i < k) sum += dp[i]; // only if i < k since we stop once exceeding k points
    if (i >= maxPts) sum -= dp[i - maxPts];
    if (i >= k) ans += dp[i]; // sum of probabilities for points k to n
  }
  return ans;
};

// Three test cases
console.log(new21Game(10, 1, 10)) // 1
console.log(new21Game(6, 1, 10)) // 0.6
console.log(new21Game(21, 17, 10)) // 0.73278