// 757. Set Intersection Size At Least Two
// You are given a 2D integer array intervals where intervals[i] = [starti, endi] represents all the integers from starti to endi inclusively.
// A containing set is an array nums where each interval from intervals has at least two integers in nums.
  // For example, if intervals = [[1,3], [3,7], [8,9]], then [1,2,4,7,8,9] and [2,3,4,8,9] are containing sets.
// Return the minimum possible size of a containing set.


// Solution: Greedy w/ Sorting

// Sort intervals by end, then by start.
// It is optimal to take the last two points in each interval.
// Since intervals are sorted by end, we know that the bigger the points are, the more chance there is in being covered in upcoming intervals.

// There are three possible cases:
  // 1. Both points are not covered in the current interval
    // Take the last two points as the current interval.
  // 2. Only the first point is not covered in the current interval.
    // a. If the last point is already equal to the end point, set the first point to end - 1.
    // b. Otherwise, add end as a new point and swap the positions of first and second (so that first is always smaller than second).

// n = number of intervals
// Time Complexity: O(n log(n)) 136ms
// Space Complexity: O(log(n)) (space for sorting) 47.3MB
var intersectionSizeTwo = function(intervals) {
  intervals.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]);
  let size = 0, first = -1, second = -1;
  for (let [start, end] of intervals) {
    if (first < start && second < start) { // both points not covered
      first = end - 1;
      second = end;
      size += 2;
    } else if (first < start) { // first point not covered
      if (second === end) {
        first = end - 1;
      } else {
        first = second;
        second = end;
      }
      size++;
    }
  }
  return size;
};

// Three test cases to run function on
console.log(intersectionSizeTwo([[1,3],[3,7],[8,9]])) // 5
console.log(intersectionSizeTwo([[1,3],[1,4],[2,5],[3,5]])) // 3
console.log(intersectionSizeTwo([[1,2],[2,3],[2,4],[4,5]])) // 5