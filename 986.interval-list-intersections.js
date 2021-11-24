// 986. Interval List Intersections
// You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.
// Return the intersection of these two interval lists.
// A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.
// The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].


// Solution: Two Pointers

// Set two pointers i and j to 0.
// Loop while i is smaller than firstList.length and j is smaller than secondList.length
  // get the start -> Math.max(firstList[i]'s start, secondList[j]'s start)
  // get the end -> Math.min(firstList[i]'s end, secondList[j]'s end)
  // if the interval is of a valid length, push [start, end] to res.
  // if the end of firstList[i] is smaller than the end of secondList[j], increment i.
  // otherwise increment j.

// Time Complexity: O(n + m) 104ms
// Space Complexity: O(1) (not including output) 45.5MB
var intervalIntersection = function(firstList, secondList) {
  let i = 0, j = 0;
  let n = firstList.length, m = secondList.length;
  let res = [];
  while (i < n && j < m) {
    let start = Math.max(firstList[i][0], secondList[j][0]);
    let end = Math.min(firstList[i][1], secondList[j][1]);
    if (start <= end) {
      res.push([start, end]);
    }
    if (firstList[i][1] < secondList[j][1]) { // the one which finishes earlier is not needed anymore
      i++;
    } else {
      j++;
    }
  }   
  return res;
};

// A test case to run function on
console.log(intervalIntersection([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]])) // [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]