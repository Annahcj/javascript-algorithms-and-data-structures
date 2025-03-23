// 3488. Closest Equal Element Queries
// You are given a circular array nums and an array queries.
// For each query i, you have to find the following:
  // The minimum distance between the element at index queries[i] and any other index j in the circular array, where nums[j] == nums[queries[i]]. If no such index exists, the answer for that query should be -1.
// Return an array answer of the same size as queries, where answer[i] represents the result for query i.


// Solution: Hashmap

// Precompute the minimum distance to an element with the same value.
// Two passes:
  // 1. From left-to-right, find the minimum distance to the same value on the left, or to the last same element (circularly).
  // 2. From right-to-left, find the minimum distance to the same value on the right, or to the first same element (circularly).

// Time Complexity: O(n + m) 94ms
// Space Complexity: O(n) 85.8MB
function solveQueries(nums, queries) {
  const n = nums.length, prev = {};
  // get the last occurrance for every nums[i]
  for (let i = 0; i < n; i++) {
    prev[nums[i]] = i;
  }
  // minimum distance to element on the left
  const minDist = Array(n).fill(-1); 
  for (let i = 0; i < n; i++) {
    // numbers that only have one occurrance do not have a minimum distance.
    if (prev[nums[i]] === i) continue;
    // if previous index was the last occurrance, calculate the circular distance
    minDist[i] = prev[nums[i]] > i ? n - prev[nums[i]] + i : i - prev[nums[i]];
    prev[nums[i]] = i;
  }
  // get the first occurrance for every nums[i]
  for (let i = n - 1; i >= 0; i--) {
    prev[nums[i]] = i;
  }
  // minimum distance to element on the right
  for (let i = n - 1; i >= 0; i--) {
    if (prev[nums[i]] === i) continue;
    const dist = prev[nums[i]] < i ? n - i + prev[nums[i]] : prev[nums[i]] - i;
    minDist[i] = Math.min(minDist[i], dist);
    prev[nums[i]] = i;
  }
  const m = queries.length, answer = Array(m);
  for (let i = 0; i < m; i++) {
    answer[i] = minDist[queries[i]];
  }
  return answer;
};

// Two test cases
console.log(solveQueries([1,3,1,4,1,3,2], [0,3,5])) // [2,-1,3]
console.log(solveQueries([1,2,3,4], [0,1,2,3])) // [-1,-1,-1,-1]