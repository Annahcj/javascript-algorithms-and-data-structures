// 1288. Remove Covered Intervals
// Given an array intervals where intervals[i] = [li, ri] represent the interval [li, ri), remove all intervals that are covered by another interval in the list.
// The interval [a, b) is covered by the interval [c, d) if and only if c <= a and b <= d.
// Return the number of remaining intervals.


// Solution: Greedy Approach w/ Sorting

// The interval has to be inside of another interval, meaning it has to be completely covered.
// Sort the intervals by the start, if there is a tie, sort by the end in desc order.
  // We want the longer interval in front of the shorter interval.

// Keep track of the max end, if an interval's end is smaller than or equal to the max end, it can be removed.
// This works because it is already sorted by the start.

// Time Complexity: O(n log(n)) 81ms
// Space Complexity: O(log(n)) (space for sorting) 44.9MB
var removeCoveredIntervals = function(intervals) {
  intervals.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });
  
  let maxEnd = -1, total = intervals.length;
  for (let [_x, y] of intervals) {
    if (y <= maxEnd) total--;
    maxEnd = Math.max(maxEnd, y);
  }
  return total;
};

// Three test cases 
console.log(removeCoveredIntervals([[1,4],[3,6],[2,8]])) // 2
console.log(removeCoveredIntervals([[1,4],[2,3]])) // 1
console.log(removeCoveredIntervals([[1,6],[4,6],[4,8]])) // 2