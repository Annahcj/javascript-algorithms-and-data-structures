// 646. Maximum Length of Pair Chain
// You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.
// A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.
// Return the length longest chain which can be formed.
// You do not need to use up all the given intervals. You can select pairs in any order.


// Solution 1: Dynamic Programming

// 1. Sort pairs by start time, then end time. (if start time is equal, sort by end time)
// 2. Create a dp array filled with 1's.
// 3. 
// Loop through pairs (pointer = i)
  // loop backwards from i - 1 to 0 (pointer = j)
    // if pairs[j] end is smaller than pairs[i] start
      // update dp[i] to Math.max(dp[i], dp[j] + 1)
      // update ans if dp[i] is bigger.
// Return ans.

// Time Complexity: O(n^2 + n log(n)) 140ms
// Space Complexity: O(n) 43.4MB
var findLongestChain = function(pairs) {
  pairs.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  })
  let n = pairs.length, ans = 1;
  let dp = Array(n).fill(1);
  for (var i = 0; i < n; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (pairs[j][1] < pairs[i][0]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        ans = Math.max(ans, dp[i]);
      }
    }
  }
  return ans;
};


// Solution 2: Greedy

// 1. Sort by end point (to give us more room for next intervals, we sort by end, not start)
// 2. Greedily take as many intervals as possible.

// This solution will always be optimal because if we take a lower end time, it leaves us more room for the next intervals.

// Time Complexity: O(n log(n)) 84ms
// Space Complexity: O(log(n)) 42.6MB
var findLongestChain = function(pairs) {
  pairs.sort((a, b) => a[1] - b[1])
  let n = pairs.length, count = 1;
  let end = pairs[0][1];
  for (var i = 1; i < n; i++) {
    if (pairs[i][0] > end) {
      count++;
      end = pairs[i][1];
    }
  }
  return count;
};

// Two test cases to run function on
console.log(findLongestChain([[1,2],[2,3],[3,4]])) // 2
console.log(findLongestChain([[1,2],[7,8],[4,5]])) // 3