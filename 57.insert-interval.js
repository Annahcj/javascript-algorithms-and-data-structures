// 57. Insert Interval
// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
// Return intervals after the insertion.


// Solution 1: Calculate Window

// left: anything on the left of the end of newInterval should be pushed into res.
// middle overlapping interval: take minimum start and maximum end area of the interval which overlaps with newInterval
// right: push in middle interval, then push in the right intervals (right intervals that don't overlap with middle interval)

// note: use a flag 'pushed' to record whether we have pushed in the middle interval yet or not

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 41.3MB
var insert = function(intervals, newInterval) {
  let res = [], pushed = false;
  let minStart = newInterval[0], maxEnd = newInterval[1];
  for (var [start, end] of intervals) {
    if (end < minStart) {
      res.push([start, end]);
    } else if (start > maxEnd) {
      if (!pushed) res.push([minStart, maxEnd]);
      pushed = true;
      res.push([start, end]);
    } else {
      minStart = Math.min(minStart, start);
      maxEnd = Math.max(maxEnd, end);
    } 
  }
  if (!pushed) res.push([minStart, maxEnd]);
  return res;
};

// Solution 2: Simpler

// The same approach as solution 1, but we store 'left' and 'right' intervals in seperate arrays.
// We keep updating our middle window.

// Return an array of left intervals + middle window + right intervals

// Note: This solution is simpler and easier to keep track of, but requires slightly more time than solution 1 since we need to copy the final results before returning.

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) 42MB
var insert = function(intervals, newInterval) {
  let left = [], right = [];
  let minStart = newInterval[0], maxEnd = newInterval[1];
  for (var [start, end] of intervals) {
    if (end < minStart) {
      left.push([start, end]);
    } else if (start > maxEnd) {
      right.push([start, end]);
    } else {
      minStart = Math.min(minStart, start);
      maxEnd = Math.max(maxEnd, end);
    }
  }
  return [...left, [minStart, maxEnd], ...right];
};

// Six test cases to run function on
console.log(insert([[1,3],[6,9]], [2,5])) // [[1,5],[6,9]]
console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])) // [[1,2],[3,10],[12,16]]
console.log(insert([], [5,7])) // [[5,7]]
console.log(insert([[1,5]], [2,3])) // [[1,5]]
console.log(insert([[1,5]], [0,3])) // [[0,5]]
console.log(insert([[2,5],[6,7],[8,9]], [0,1])) // [[0,1],[2,5],[6,7],[8,9]]