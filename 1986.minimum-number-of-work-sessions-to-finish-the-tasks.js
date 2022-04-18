// 1986. Minimum Number of Work Sessions to Finish the Tasks
// There are n tasks assigned to you. The task times are represented as an integer array tasks of length n, where the ith task takes tasks[i] hours to finish. A work session is when you work for at most sessionTime consecutive hours and then take a break.
// You should finish the given tasks in a way that satisfies the following conditions:
  // If you start a task in a work session, you must complete it in the same work session.
  // You can start a new task immediately after finishing the previous one.
  // You may complete the tasks in any order.
// Given tasks and sessionTime, return the minimum number of work sessions needed to finish all the tasks following the conditions above.
// The tests are generated such that sessionTime is greater than or equal to the maximum element in tasks[i].


// Solution: Bitmasks & Recursion w/ Memoization

// Use a bitmask to represent which tasks have been done: bits 110 = tasks at index 1 & 2 done, task at index 0 not done.
// Use recursion and memoization to try every combination of tasks
  // For each task, get the minimum session of two situations:
    // 1. Use tasks[i] in the current session (we handle going out of bounds when time > sessionTime)
    // 2. Use tasks[i] in a new session

// To check whether the tasks are all done, we compare the current bitmask with (1 << n) - 1.
// When n = 5
  // 1 << n = 100000
  // (1 << n) - 1 = 11111

// n = tasks.length, s = sessionTime
// Time Complexity: O(2^n * n * s) 1283ms
// Space Complexity: O(2^n * s) 72.6MB
var minSessions = function(tasks, sessionTime) {
  let n = tasks.length, finished = (1 << n) - 1;
  let memo = Array(1 << 14).fill(0).map(() => Array(16).fill(-1));
  return dp(0, 0);
  
  function dp(mask, time) {
    if (time > sessionTime) return Infinity;
    if (memo[mask][time] !== -1) return memo[mask][time];
    if (mask === finished) return 1;
    
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue; // already done, skip.
      let take = dp(mask | (1 << i), time + tasks[i]); // use tasks[i] in current session
      let skip = dp(mask | (1 << i), tasks[i]) + 1; // use tasks[i] in a new session
      ans = Math.min(ans, take, skip);
    }
    return memo[mask][time] = ans;
  }
};

// Three test cases to run function on
console.log(minSessions([1,2,3], 3)) // 2
console.log(minSessions([3,1,3,1,1], 8)) // 2
console.log(minSessions([1,2,3,4,5], 15)) // 1