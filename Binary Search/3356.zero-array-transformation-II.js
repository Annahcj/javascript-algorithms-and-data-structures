// 3356. Zero Array Transformation II
// You are given an integer array nums of length n and a 2D array queries where queries[i] = [l[i], r[i], val[i]].
// Each queries[i] represents the following action on nums:
  // Decrement the value at each index in the range [l[i], r[i]] in nums by at most val[i].
  // The amount by which each value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.
// Return the minimum possible non-negative value of k, such that after processing the first k queries in sequence, nums becomes a Zero Array. If no such k exists, return -1.


// Solution: Binary Search & Line Sweep

// Binary search for the minimum k, where nums becomes a zero array after k queries.
// To check whether a value k is valid,
  // Use line sweep to accumulate updates on every range.
  // Accumulate them at the end using prefix sum and check that every nums[i] <= 0.

// n = length of nums, m = number of queries
// Time Complexity: O(n log(m)) 148ms
// Space Complexity: O(n) 90.81MB
function minZeroArray(nums, queries) {
  const m = queries.length;
  let low = 0, high = m;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (isValid(nums, queries, mid)) high = mid;
    else low = mid + 1;
  }
  return isValid(nums, queries, low) ? low : -1;
};

function isValid(nums, queries, k) {
  const n = nums.length, updates = Array(n + 1).fill(0);
  for (let i = 0; i < k; i++) {
    const [l, r, val] = queries[i];
    updates[l] -= val;
    updates[r + 1] += val;
  }
  let sum = 0, updateSum = 0;
  for (let i = 0; i < n; i++) {
    updateSum += updates[i];
    sum += Math.max(0, nums[i] + updateSum);
  }
  return sum === 0;
}

// Two test cases
console.log(minZeroArray([2,0,2], [[0,2,1],[0,2,1],[1,1,3]])) // 2
console.log(minZeroArray([4,3,2,1], [[1,3,2],[0,2,1]])) // -1