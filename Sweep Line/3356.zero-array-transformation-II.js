// 3356. Zero Array Transformation II
// You are given an integer array nums of length n and a 2D array queries where queries[i] = [l[i], r[i], val[i]].
// Each queries[i] represents the following action on nums:
  // Decrement the value at each index in the range [l[i], r[i]] in nums by at most val[i].
  // The amount by which each value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.
// Return the minimum possible non-negative value of k, such that after processing the first k queries in sequence, nums becomes a Zero Array. If no such k exists, return -1.


// Solution 1: Binary Search & Line Sweep

// Binary search for the minimum k, where nums becomes a zero array after k queries.
// To check whether a value k is valid,
  // Use line sweep to accumulate updates on every range.
  // Accumulate them at the end using prefix sum and check that every nums[i] <= 0.

// n = length of nums, m = number of queries
// Time Complexity: O(n log(m)) 148ms
// Space Complexity: O(n) 90.81MB
var minZeroArray = function(nums, queries) {
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


// Solution 2: Line Sweep & Two Pointers

// In the end, all numbers need to become 0.
// So, go through every index from 0 to n-1 and apply queries while nums[i] is not yet 0.
// We don't apply any queries unless nums[i] > 0.

// Apply range updates using line sweep and prefix sum.
// Compute the prefix sum for range updates on the fly as we move i forward.

// Time Complexity: O(n + m) 25ms
// Space Complexity: O(n) 91.92MB
var minZeroArray = function(nums, queries) {
  const n = nums.length, m = queries.length;  
  const updates = Array(n + 1).fill(0);
  let updateSum = 0, j = 0;
  for (let i = 0; i < n; i++) {
    updateSum += updates[i];
    while (nums[i] + updateSum > 0 && j < m) {
      const [l, r, val] = queries[j];
      if (l <= i && r >= i) updateSum -= val; // query starts before or at this index, hence we need to add directly to running sum.
      if (l > i) updates[l] -= val; // no point adding update to an index we have already passed.
      if (r >= i) updates[r + 1] += val; // no point adding update to an index we have already passed.
      j++;
    }
    if (nums[i] + updateSum > 0 && j === m) {
      return -1;
    }
  }
  return j;
};

// Two test cases
console.log(minZeroArray([2,0,2], [[0,2,1],[0,2,1],[1,1,3]])) // 2
console.log(minZeroArray([4,3,2,1], [[1,3,2],[0,2,1]])) // -1