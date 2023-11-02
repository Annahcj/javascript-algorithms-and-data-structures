// 56. Merge Intervals
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Solution 1: Sorting
// Sort the intervals by start (interval[i] = [start i, end i])
// Loop through intervals, keep start and end variables.
// If current interval's end is bigger 'start', it would be out of range, so we push [start, end] into our result, and set start and end to the current start and end,
// otherwise, we update 'end' if necessary.
// Finally, we return our results array.

// Time Complexity: O(n + logn) 80ms
// Space Complexity: O(logn) (built-in sorting) 40.1MB
var merge = function(intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    let [start, end] = intervals[0];
    let result = [];
    for (var i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= end) end = Math.max(end, intervals[i][1]);
      else {
        result.push([start, end]);
        [start, end] = intervals[i];
      }
    }
    result.push([start, end]);
    return result;
  };
  
  // Three test cases to run function on
  console.log(merge([[1,3],[2,6],[8,10],[15,18]])) // [[1,6],[8,10],[15,18]]
  console.log(merge([[1,4],[4,5]])) // [[1,5]]
  console.log(merge([[1,4],[4,5],[7,8],[7,9]])) // [[1,5]]