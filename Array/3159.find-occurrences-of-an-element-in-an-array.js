// 3159. Find Occurrences of an Element in an Array
// You are given an integer array nums, an integer array queries, and an integer x.
// For each queries[i], you need to find the index of the queries[i]th occurrence of x in the nums array. If there are fewer than queries[i] occurrences of x, the answer should be -1 for that query.
// Return an integer array answer containing the answers to all queries.


// Solution: Array of Indices

// Get the indices of occurances of x in an array.
// For each query, find the queries[i]th index and fallback to -1 if there are no enough indices.

// n = length of nums, m = number of queries
// Time Complexity: O(n + m) 239ms
// Space Complexity: O(n) (excluding output) 79.8MB
var occurrencesOfElement = function(nums, queries, x) {
  let n = nums.length, indices = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] === x) {
      indices.push(i);
    }
  }
  let answer = Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    answer[i] = queries[i] > indices.length ? -1 : indices[queries[i] - 1];
  }
  return answer;
};

// Two test cases
console.log(occurrencesOfElement([1,3,1,7], [1,3,2,4], 1)) // [0,-1,2,-1]
console.log(occurrencesOfElement([1,2,3], [10], 5)) // [-1]