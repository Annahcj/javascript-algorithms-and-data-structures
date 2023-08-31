// 1326. Minimum Number of Taps to Open to Water a Garden


// Solution 1: Greedy w/ Sorting

// Turn the ranges into intervals with [start, end].
// The problem now becomes getting the minimum number of overlapping intervals.
// Sort the intervals by start index.

// Keep track of the end index of the previous interval we took.
// For the next interval, we want to take the interval within the range of the last interval, with the greatest end index.
// Loop through all upcoming intervals where the start index <= the previous end index and record the maximum intervals[i][1].

// Time Complexity: O(n log(n)) 68ms
// Space Complexity: O(n) 47.1MB
var minTaps = function(n, ranges) {
  let intervals = [];
  for (let i = 0; i <= n; i++) {
    let start = Math.max(0, i - ranges[i]);
    let end = Math.min(n, i + ranges[i]);
    if (start === end) continue;
    intervals.push([start, end]);
  }
  intervals.sort((a, b) => a[0] - b[0]);
  let maxEnd = 0, i = 0, intervalsTaken = 0;
  while (maxEnd < n) {
    let newMaxEnd = maxEnd;
    while (i < intervals.length && maxEnd >= intervals[i][0]) {
      newMaxEnd = Math.max(newMaxEnd, intervals[i][1]);
      i++;
    }
    if (maxEnd === newMaxEnd) return -1;
    maxEnd = newMaxEnd;
    intervalsTaken++;
  }
  return intervalsTaken;
};


// Solution 2: Greedy w/o Sorting

// Go through each ranges[i] and calculate the start and end of the range.
// For each start index, record the maximum end index: maxEnd[i] = maximum end index with an interval starting at i

// Keep track of the end index of the previous interval we took.
// For the next interval, we want to take the interval within the range of the last interval, with the greatest end index.
// Loop through all upcoming points where i <= the previous end index and record the maximum maxEnd[start].

// Time Complexity: O(n) 53ms
// Space Complexity: O(n) 43.9MB
var minTaps = function(n, ranges) {
  let maxEnd = Array(n + 1).fill(0);
  for (let i = 0; i <= n; i++) {
    let start = Math.max(0, i - ranges[i]);
    let end = Math.min(n, i + ranges[i]);
    if (start === end) continue;
    maxEnd[start] = Math.max(maxEnd[start], end);
  }
  let prevMaxEnd = 0, i = 0, intervalsTaken = 0;
  while (prevMaxEnd < n) {
    let newMaxEnd = prevMaxEnd;
    while (i <= n && prevMaxEnd >= i) {
      newMaxEnd = Math.max(newMaxEnd, maxEnd[i]);
      i++;
    }
    if (prevMaxEnd === newMaxEnd) return -1;
    prevMaxEnd = newMaxEnd;
    intervalsTaken++;
  }
  return intervalsTaken;
};

// Two test cases
console.log(minTaps(5, [3,4,1,1,0,0])) // 1
console.log(minTaps(3, [0,0,0,0])) // -1