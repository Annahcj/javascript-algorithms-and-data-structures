// 2580. Count Ways to Group Overlapping Ranges
// You are given a 2D integer array ranges where ranges[i] = [start[i], end[i]] denotes that all integers between start[i] and end[i] (both inclusive) are contained in the ith range.
// You are to split ranges into two (possibly empty) groups such that:
  // Each range belongs to exactly one group.
  // Any two overlapping ranges must belong to the same group.
// Two ranges are said to be overlapping if there exists at least one integer that is present in both ranges.
  // For example, [1, 3] and [2, 5] are overlapping because 2 and 3 occur in both ranges.
// Return the total number of ways to split ranges into two groups. Since the answer may be very large, return it modulo 109 + 7.


// Solution: Group Overlapping Ranges

// Group ranges that have overlap.
// Sort the ranges by start. If ranges have overlap, then they are in the same group.
// The number of combinations to split the groups of ranges = 2 ^ groups (each group can either be in group 1 or group 2)

// Time Complexity: O(n log(n)) 117ms
// Space Complexity: O(log(n)) (space for sorting) 62.2MB
var countWays = function(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  let n = ranges.length, groups = 0, maxEnd = -1;
  for (let i = 0; i < n; i++) {
    if (ranges[i][0] > maxEnd) {
      groups++;
    }
    maxEnd = Math.max(maxEnd, ranges[i][1]);
  }
  return (2n ** BigInt(groups)) % 1000000007n;
};

// Two test cases
console.log(countWays([[6,10],[5,15]])) // 2
console.log(countWays([[1,3],[10,20],[2,5],[4,8]])) // 4