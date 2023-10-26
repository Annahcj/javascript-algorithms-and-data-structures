// 568.maximum-vacation-days.js
// 568. Maximum Vacation Days
// Given the two matrices flights and days, return the maximum vacation days you could take during k weeks.


// Solution 1: Recursion w/ Memoization

// Starting from city 0, use recursion and memoization to try all the possible paths.
// At each city, we can either stay or fly to another city.

// Time Complexity: O(n^2 * k) 180ms
// Space Complexity: O(nk) 43.6MB
var maxVacationDays = function(flights, days) {
  let n = flights.length, k = days[0].length;
  let memo = Array(n);
  for (var i = 0; i < n; i++) memo[i] = Array(k);
  return recurse(0, 0);
  
  function recurse(city, week) {
    if (week === k) return 0;
    if (memo[city][week] !== undefined) return memo[city][week];
    let maxVacation = days[city][week] + recurse(city, week + 1); // stay at current city
    for (var i = 0; i < n; i++) {
      if (flights[city][i]) {
        maxVacation = Math.max(maxVacation, days[i][week] + recurse(i, week + 1));
      }
    }
    memo[city][week] = maxVacation;
    return maxVacation;
  }
};

// Solution 2: Dynamic Programming

// Work backwards for each week (from last week to first week)
  // try out all flights, calculating and recording the maximum vacation time for each.

// Time Complexity: O(n^2 * k) 180ms
// Space Complexity: O(nk) 43.7MB
var maxVacationDays = function(flights, days) {
  let n = flights.length, k = days[0].length;
  let dp = Array(n);
  for (var i = 0; i < n; i++) {
    dp[i] = Array(k + 1);
    dp[i][k] = 0;
  }
  for (var week = k - 1; week >= 0; week--) {
    for (var i = 0; i < n; i++) {
      dp[i][week] = dp[i][week + 1] + days[i][week]; // stay at current city
      for (var j = 0; j < n; j++) {
        if (flights[i][j]) {
          dp[i][week] = Math.max(dp[i][week], dp[j][week + 1] + days[j][week]);
        }
      }
    }
  }
  return dp[0][0];
};

// Three test cases to run function on
console.log(maxVacationDays([[0,1,1],[1,0,1],[1,1,0]], [[1,3,1],[6,0,3],[3,3,3]])) // 12
console.log(maxVacationDays([[0,0,0],[0,0,0],[0,0,0]], [[1,1,1],[7,7,7],[7,7,7]])) // 3
console.log(maxVacationDays([[0,1,1],[1,0,1],[1,1,0]], [[7,0,0],[0,7,0],[0,0,7]])) // 21