// 1335. Minimum Difficulty of a Job Schedule
// You want to schedule a list of jobs in d days. Jobs are dependent (i.e To work on the ith job, you have to finish all the jobs j where 0 <= j < i).
// You have to finish at least one task every day. The difficulty of a job schedule is the sum of difficulties of each day of the d days. The difficulty of a day is the maximum difficulty of a job done on that day.
// You are given an integer array jobDifficulty and an integer d. The difficulty of the ith job is jobDifficulty[i].
// Return the minimum difficulty of a job schedule. If you cannot find a schedule for the jobs return -1.


// Solution 1: Top Down DP - Recursion w/ Memoization

// Try all combinations of splitting the jobs into d days.
// Use memoization to avoid recomputing repeated subproblems.

// n = length of jobDifficulty
// Time Complexity: O(n^2 * d) 131ms
// Space Complexity: O(nd) 46.6MB
var minDifficulty = function(jobDifficulty, d) {
  let n = jobDifficulty.length;
  let memo = Array(n).fill(0).map(() => Array(d + 1).fill(-1));
  let res = dfs(0, d);
  return res === Infinity ? -1 : res;
  
  function dfs(i, days) {
    if (days < 0 || n - i < days) return Infinity; // not enough days for jobs
    if (i === n) return days === 0 ? 0 : Infinity; // reached the end
    if (memo[i][days] !== -1) return memo[i][days]; 
    
    let ans = Infinity, max = 0;
    for (let idx = i; idx < n; idx++) {
      max = Math.max(max, jobDifficulty[idx]);
      ans = Math.min(ans, dfs(idx + 1, days - 1) + max);
    }
    return memo[i][days] = ans;
  }
};


// Solution 2: Bottom Up Iterative DP - O(n) space

// Notice that we only need to reference results saved from the previous row (d - 1).
// We only need to keep track of the results of the previous row, and the current row.
// Each dp[i] = the minimum cost to finish jobs 0 to jobs i for the current day.

// For each dp[i], 
  // Go through each index j <= i to try each segment of jobs.
  // Record the maximum maxDifficulty + dp[j].

// n = length of jobDifficulty
// Time Complexity: O(n^2 * d) 109ms
// Space Complexity: O(n) 43.9MB
var minDifficulty = function(jobDifficulty, d) {
  let n = jobDifficulty.length, prev = Array(n + 1).fill(Infinity);
  prev[0] = 0;
  for (let k = 0; k < d; k++) {
    let curr = Array(n + 1).fill(Infinity);
    for (let i = 0; i < n; i++) {
      let maxDifficulty = 0;
      for (let j = i; j >= 0; j--) {
        maxDifficulty = Math.max(maxDifficulty, jobDifficulty[j]);
        curr[i + 1] = Math.min(curr[i + 1], maxDifficulty + prev[j]);
      }
    }
    prev = curr;
  }
  return prev[n] === Infinity ? -1 : prev[n];
};

// Two test cases 
console.log(minDifficulty([6,5,4,3,2,1], 2)) // 7
console.log(minDifficulty([1,1,1], 3)) // 3