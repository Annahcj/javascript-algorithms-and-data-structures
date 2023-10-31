// 1883. Minimum Skips to Arrive at Meeting On Time
// You are given an integer hoursBefore, the number of hours you have to travel to your meeting. To arrive at your meeting, you have to travel through n roads. The road lengths are given as an integer array dist of length n, where dist[i] describes the length of the ith road in kilometers. In addition, you are given an integer speed, which is the speed (in km/h) you will travel at.
// After you travel road i, you must rest and wait for the next integer hour before you can begin traveling on the next road. Note that you do not have to rest after traveling the last road because you are already at the meeting.
  // For example, if traveling a road takes 1.4 hours, you must wait until the 2 hour mark before traveling the next road. If traveling a road takes exactly 2 hours, you do not need to wait.
// However, you are allowed to skip some rests to be able to arrive on time, meaning you do not need to wait for the next integer hour. Note that this means you may finish traveling future roads at different hour marks.
  // For example, suppose traveling the first road takes 1.4 hours and traveling the second road takes 0.6 hours. Skipping the rest after the first road will mean you finish traveling the second road right at the 2 hour mark, letting you start traveling the third road immediately.
// Return the minimum number of skips required to arrive at the meeting on time, or -1 if it is impossible.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, skipsLeft), where dp(i, skipsLeft) = hours needed to get to road i from road 0 with skipsLeft number of skips left to use.
// For each dp(i, skipsLeft), we have two choices:
  // 1. If we have at least one skip left, skip the rest at stop i
  // 2. Don't skip the rest at stop i

// dp(i - 1, ...) = the current time we have taken to get to stop i - 1. Use a post-order dfs approach to get the current time.
// Make the hours multiples of speed so that we don't have to use floats. 
  // When we don't skip a rest, round the current hour to a multiple of speed.

// Time Complexity: O(n^2) 367ms
// Space Complexity: O(n^2) 69.8MB
var minSkips = function(dist, speed, hoursBefore) {
  let n = dist.length, memo = Array(n).fill(0).map(() => Array(n + 1).fill(-1));
  for (let skips = 0; skips <= n; skips++) {
    if (dp(n - 1, skips) / speed <= hoursBefore) {
      return skips;
    }
  }
  return -1;
  
  function dp(i, skipsLeft) {
    if (i === -1) return 0;
    if (memo[i][skipsLeft] !== -1) return memo[i][skipsLeft];
    
    memo[i][skipsLeft] = dist[i] + Math.ceil(dp(i - 1, skipsLeft) / speed) * speed;
    if (skipsLeft > 0) {
      memo[i][skipsLeft] = Math.min(memo[i][skipsLeft], dist[i] + dp(i - 1, skipsLeft - 1));
    }
    return memo[i][skipsLeft];
  }  
};


// Solution 2: Bottom up DP

// The same idea as solution 1, except we use bottom up iterative dp.

// Time Complexity: O(n^2) 310ms
// Space Complexity: O(n^2) 78MB
var minSkips = function(dist, speed, hoursBefore) {
  let n = dist.length, dp = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < n; i++) {
    for (let skips = 0; skips <= n; skips++) {
      dp[i + 1][skips] = dist[i] + Math.ceil(dp[i][skips] / speed) * speed;
      if (skips > 0) {
        dp[i + 1][skips] = Math.min(dp[i + 1][skips], dist[i] + dp[i][skips - 1]);
      }
    }
  }
  for (let skips = 0; skips <= n; skips++) {
    if (dp[n][skips] / speed <= hoursBefore) {
      return skips;
    }
  }
  return -1;
};

// Three test cases
console.log(minSkips([1,3,2], 4, 2)) // 1
console.log(minSkips([7,3,5,5], 2, 10)) // 2
console.log(minSkips([7,3,5,5], 1, 10)) // -1