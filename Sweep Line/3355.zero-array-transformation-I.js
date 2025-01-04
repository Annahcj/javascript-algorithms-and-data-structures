// 3355. Zero Array Transformation I
// You are given an integer array nums of length n and a 2D array queries, where queries[i] = [l[i], r[i]].
// For each queries[i]:
  // Select a subset of indices within the range [l[i], r[i]] in nums.
  // Decrement the values at the selected indices by 1.
// A Zero Array is an array where all elements are equal to 0.
// Return true if it is possible to transform nums into a Zero Array after processing all the queries sequentially, otherwise return false.


// Solution: Line Sweep

// Use line sweep to lazily apply the queries:
  // updates[l]++
  // updates[r + 1]--
// At the end, accumulate the updates and return true if every nums[i] - prefix sum of nums[i] <= 0.

// Time Complexity: O(n + m) 18ms
// Space Complexity: O(n) 90.87MB
function isZeroArray(nums, queries) {
  const n = nums.length, updates = Array(n + 1).fill(0);
  for (let [l, r] of queries) {
    updates[l]++;
    updates[r + 1]--;
  }
  for (let i = 0; i < n; i++) {
    updates[i] += i > 0 ? updates[i - 1] : 0;
    if (nums[i] - updates[i] > 0) {
      return false;
    }
  }
  return true;
};

// Two test cases
console.log(isZeroArray([1,0,1], [[0,2]])) // true
console.log(isZeroArray([4,3,2,1], [[1,3],[0,2]])) // false