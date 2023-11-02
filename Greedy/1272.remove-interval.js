// 1272. Remove Interval
// A set of real numbers can be represented as the union of several disjoint intervals, where each interval is in the form [a, b). A real number x is in the set if one of its intervals [a, b) contains x (i.e. a <= x < b).
// You are given a sorted list of disjoint intervals intervals representing a set of real numbers as described above, where intervals[i] = [ai, bi] represents the interval [ai, bi). You are also given another interval toBeRemoved.
// Return the set of real numbers with the interval toBeRemoved removed from intervals. In other words, return the set of real numbers such that every x in the set is in intervals but not in toBeRemoved. Your answer should be a sorted list of disjoint intervals as described above.


// Solution: Three Cases

// There are three possible cases:
  // 1. The interval has no overlap with toBeRemoved: just add the interval
  // 2. There is an interval on the left
  // 3. There is an interval on the right
  // (the second and third cases can both be matched)

// Time Complexity: O(n) 188ms
// Space Complexity: O(1) (not including output) 62.4MB
var removeInterval = function(intervals, toBeRemoved) {
  let res = [];
  for (let [start, end] of intervals) {
    if (end < toBeRemoved[0] || start > toBeRemoved[1]) {
      res.push([start, end]);
    } else {
      if (start < toBeRemoved[0]) {
        res.push([start, toBeRemoved[0]]);
      } 
      if (end > toBeRemoved[1]) {
        res.push([toBeRemoved[1], end]);
      }
    }
  }
  return res;
};

// Two test cases 
console.log(removeInterval([[0,2],[3,4],[5,7]], [1,6])) // [[0,1],[6,7]]
console.log(removeInterval([[0,5]], [2,3])) // [[0,2],[3,5]]