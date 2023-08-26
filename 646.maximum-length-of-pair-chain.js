// 646. Maximum Length of Pair Chain
// You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.
// A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.
// Return the length longest chain which can be formed.
// You do not need to use up all the given intervals. You can select pairs in any order.


// Solution: Greedy w/ Sorting

// Sort pairs by the end index in asc order.
// Greedily take non-overlapping pairs, as early as possible.

// It is always optimal to take the earliest possible pairs[i] if it's not overlapping with the previous pair we took.
// Because pairs is sorted by end index, taking an earlier pairs[i] instead of other pairs on the right will guarantee the maximum number of pairs as it leaves more room on the right.

// Time Complexity: O(n log(n)) 68ms
// Space Complexity: O(log(n)) (space for sorting) 44.8MB
var findLongestChain = function(pairs) {
  pairs.sort((a, b) => a[1] - b[1]);
  let prevEnd = pairs[0][1], pairsCount = 1, n = pairs.length;
  for (let i = 1; i < n; i++) {
    if (prevEnd < pairs[i][0]) {
      pairsCount++;
      prevEnd = pairs[i][1];
    }
  }
  return pairsCount;
};

// Two test cases
console.log(findLongestChain([[1,2],[2,3],[3,4]])) // 2
console.log(findLongestChain([[1,2],[7,8],[4,5]])) // 3