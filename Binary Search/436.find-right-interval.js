// 436. Find Right Interval
// You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.
// The right interval for an interval i is an interval j such that startj >= endi and startj is minimized. Note that i may equal j.
// Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.


// Solution: Sorting & Binary Search

// 1. Sort intervals by start time, then by index.
// 2. For each interval, binary search for smallest index j where j's start time >= i's end time.

// Time Complexity: O(n log(n)) 191ms
// Space Complexiy: O(n) 54.5MB
var findRightInterval = function(intervals) {
  let n = intervals.length, res = Array(n);
  intervals = intervals.map((interval, index) => [...interval, index]).sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < n; i++) {
    let [_start, end, index] = intervals[i];
    let low = i, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (intervals[mid][0] >= end) high = mid;
      else low = mid + 1;
    }
    res[index] = intervals[low][0] < end ? -1 : intervals[low][2];
  }
  return res;
};

// Three test cases to run function on
console.log(findRightInterval([[1,2]])) // [-1]
console.log(findRightInterval([[3,4],[2,3],[1,2]])) // [-1,0,1]
console.log(findRightInterval([[1,4],[2,3],[3,4]])) // [-1,2,-1]