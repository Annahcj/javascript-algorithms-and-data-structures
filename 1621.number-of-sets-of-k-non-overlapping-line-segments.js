// 1621. Number of Sets of K Non-Overlapping Line Segments
// Given n points on a 1-D plane, where the ith point (from 0 to n-1) is at x = i, find the number of ways we can draw exactly k non-overlapping line segments such that each segment covers two or more points. The endpoints of each segment must have integral coordinates. The k line segments do not have to cover all n points, and they are allowed to share endpoints.
// Return the number of ways we can draw k non-overlapping line segments. Since this number can be huge, return it modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, k, isStart), where
  // i = the ith point
  // k = the number of segments left to go
  // isStart = whether we can start a new segment or is currently in a segment
    // if isStart = 1, we can start a new segment.
    // if isStart = 0, we can end the segment.

// For each dp(i, k, isStart), we have three possible choices:
  // 1. Do nothing - don't start or end a segment
  // 2. If isStart = 1, start a new segment.
  // 3. If isStart = 0, end the current segment. (Since segments can share endpoints, we don't have to increment i)

// Time Complexity: O(nk) 4160ms
// Space Complexity: O(nk) 124.1MB
var numberOfSets = function(n, k) {
  let mod = 10 ** 9 + 7, memo = new Map();
  return dp(0, k, 1);
  
  function dp(i, k, isStart) {
    if (k === 0) return 1;
    if (i === n) return 0;
    let key = `${i},${k},${isStart}`;
    if (memo.has(key)) return memo.get(key);
    
    let ways = dp(i + 1, k, isStart); // do nothing
    if (isStart) ways = (ways + dp(i + 1, k, 0)) % mod; // start of new segment
    else ways = (ways + dp(i, k - 1, 1)) % mod; // end of a segment
    memo.set(key, ways);
    return ways;
  }  
};

// Three test cases to run function on
console.log(numberOfSets(4, 2)) // 5
console.log(numberOfSets(3, 1)) // 3
console.log(numberOfSets(30, 7)) // 796297179