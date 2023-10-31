// 2585. Number of Ways to Earn Points
// There is a test that has n types of questions. You are given an integer target and a 0-indexed 2D integer array types where types[i] = [count[i], marks[i]] indicates that there are count[i] questions of the ith type, and each one of them is worth marks[i] points.
// Return the number of ways you can earn exactly target points in the exam. Since the answer may be too large, return it modulo 10^9 + 7.
// Note that questions of the same type are indistinguishable.
  // For example, if there are 3 questions of the same type, then solving the 1st and 2nd questions is the same as solving the 1st and 3rd questions, or the 2nd and 3rd questions.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, points), where
  // i = current index in types
  // points = the current amount of points we have

// For each dp(i, points), try to take each amount of question i (<= types[i][0]) and count the total number of ways.

// n = number of questions, m = target, k = max(count[i])
// Time Complextity: O(n * m * k) 432ms
// Space Complexity: O(n * m) 52.6MB
var waysToReachTarget = function(target, types) {
  let n = types.length, memo = Array(n).fill(0).map(() => Array(target + 1).fill(-1));
  let MOD = 10 ** 9 + 7;
  return dp(0, 0);
  
  function dp(i, points) {
    if (points > target) return 0;
    if (points === target) return 1;
    if (i === n) return 0;
    if (memo[i][points] !== -1) return memo[i][points];
    
    let ans = 0;
    for (let j = 0; j <= types[i][0]; j++) {
      let totalPoints = points + (types[i][1] * j);
      if (totalPoints > target) break;
      ans = (ans + dp(i + 1, totalPoints)) % MOD;
    }
    return memo[i][points] = ans;
  }  
};


// Solution 2: DP - Tabulation

// Populate each dp[i], where i = the amount of points.
// The outer loop goes through the types, because we have a limit to the amount of each question we take.
// We then loop through the target backwards because we don't want any results from the current question type to be included in the count (we will end up overcounting).
  // Calculate each dp[i] = dp[i] + dp[i - marks * k]

// n = number of questions, m = target, k = max(count[i])
// Time Complextity: O(n * m * k) 128ms
// Space Complexity: O(n) 42.2MB
var waysToReachTarget = function(target, types) {
  let dp = Array(target + 1).fill(0), MOD = 10 ** 9 + 7;
  dp[0] = 1;
  for (let [count, marks] of types) {
    for (let i = target; i > 0; i--) {
      for (let k = 1; k <= count && i - marks * k >= 0; k++) {
        dp[i] = (dp[i] + dp[i - marks * k]) % MOD;
      }
    }
  }
  return dp[target];
};

// Three test cases
console.log(waysToReachTarget(6, [[6,1],[3,2],[2,3]])) // 7
console.log(waysToReachTarget(5, [[50,1],[50,2],[50,5]])) // 4
console.log(waysToReachTarget(18, [[6,1],[3,2],[2,3]])) // 1