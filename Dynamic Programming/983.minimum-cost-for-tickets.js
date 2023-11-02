// 983. Minimum Cost For Tickets
// Return the minimum number of dollars you need to travel every day in the given list of days.


// Solution: Dynamic Programming

// Create a dp array with the length of lastDay + 1, filled with Infinity.
// Set dp[0] to 0.

// Record days in a set for easy access.

// Loop through from 1 to lastDay (pointer = i)
  // if daySet doesn't contain i,
    // set dp[i] to dp[i - 1] (no travel on these days)
  // set dp[i] to Math.min(
    // dp[i],
    // dp[i - 1] + costs[0], (1-day ticket)
    // dp[i - 7] + costs[1], (7-day ticket)
    // dp[i - 30] + costs[2]
  // )
// Return dp[lastDay]


// For e.g: days -> [1,4,6,7,8,20], costs -> [2,7,15]
//                                                       no travel for these days,
//                                                   so we take the previous day as it is
//                                                   |------------------------------|
//                        0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20                        
// dp will look like -> [ 0, 2, 2, 2, 4, 4, 6, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 11 ]

// n = days[days.length - 1]
// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 41.4MB
var mincostTickets = function(days, costs) {
  let lastDay = days[days.length - 1];
  let daySet = new Set(days);
  let dp = Array(lastDay + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= lastDay; i++) {
    if (!daySet.has(i)) {
      dp[i] = dp[i - 1];
    }
    dp[i] = Math.min(
     dp[i],
     dp[i - 1] + costs[0],
     (dp[i - 7] || 0) + costs[1],
     (dp[i - 30] || 0) + costs[2]
    );
  }
  return dp[lastDay];
};

// Four test cases
console.log(mincostTickets([1,4,6,7,8,20], [7,2,15])) // 6
console.log(mincostTickets([2], [2,7,15])) // 2
console.log(mincostTickets([1,4,6,7,8,20], [2,7,15])) // 11
console.log(mincostTickets([1,2,3,4,5,6,7,8,9,10,30,31], [2,7,15])) // 17