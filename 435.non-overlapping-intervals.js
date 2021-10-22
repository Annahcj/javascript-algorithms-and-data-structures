// 435. Non-overlapping Intervals
// Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.


// Solution 1: [Time Limit Exceeded] Dynamic Programming

// sort intervals by start time
// create a dp array
// dp[i] indicates the maximum number of non-overlapping intervals up to i (including i).
// returun number of intervals - maximum number of intervals we can take

// Time Complexity: O(n^2)
// Space Complexity: O(n)
var eraseOverlapIntervals = function(intervals) {
  let n = intervals.length;
  let dp = Array(n);
  dp[0] = 1;
  intervals.sort((a, b) => a[0] - b[0]);
  for (var i = 1; i < intervals.length; i++) {
    let max = 0;
    let start = intervals[i][0];
    for (var j = i - 1; j >= 0; j--) {
      if (intervals[j][1] <= start) max = Math.max(max, dp[j]);
    }
    dp[i] = max + 1;
  }
  return n - dp[n - 1];
};

// Solution 2: Greedy Approach w/ Sorting

// First, sort intervals by their end time.
// Then, greedily choose the non-overlapping intervals with the smallest end time.
// This works because if we choose the smaller end time, we will always have more room for more intervals than an interval with a bigger end time.

// Time Complexity: O(n log(n)) 252ms
// Space Complexity: O(log(n)) 69.2MB
var eraseOverlapIntervals = function(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = -Infinity;
  for (var i = 0; i < intervals.length; i++) {
    if (intervals[i][0] >= end) {
      end = intervals[i][1];
    } else {
      count++;
    }
  }
  return count;
};

// Three test cases to run function on
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])) // 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])) // 2
console.log(eraseOverlapIntervals([[1,2],[2,3]])) // 0