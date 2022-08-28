// 2389. Longest Subsequence With Limited Sum
// You are given an integer array nums of length n, and an integer array queries of length m.
// Return an array answer of length m where answer[i] is the maximum size of a subsequence that you can take from nums such that the sum of its elements is less than or equal to queries[i].
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Greedy - Sorting & Two Pointers

// It is always optimal to take the smallest numbers possible, since we want the more quantity.
// Sort nums in asc order.
// Sort the queries in asc order and use two pointers (i = index in nums, j = index in queries) to process the queries efficiently.
  // Move i up until it exceeds queries[j].

// n = length of nums, m = length of queries
// Time Complexity: O(n log(n) + m log(m)) 137ms
// Space Complexity: O(m) 46.9MB
var answerQueries = function(nums, queries) {
  nums.sort((a, b) => a - b);
  queries = queries.map((query, idx) => [query, idx]).sort((a, b) => a[0] - b[0]);
  let n = nums.length, m = queries.length;
  let res = Array(m).fill(0);
  let sum = 0;
  for (let j = 0, i = 0; j < m; j++) {
    let [maxSum, index] = queries[j];
    while (i < n && sum + nums[i] <= maxSum) {
      sum += nums[i++];
    }
    res[index] = i;
  }
  return res;
};

// Two test cases to run function on
console.log(answerQueries([4,5,2,1], [3,10,21])) // [2,3,4]
console.log(answerQueries([2,3,4,5], [1])) // [0]