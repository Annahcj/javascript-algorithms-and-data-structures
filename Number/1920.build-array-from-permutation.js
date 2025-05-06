// 1920. Build Array from Permutation
// Given a zero-based permutation nums (0-indexed), build an array ans of the same length where ans[i] = nums[nums[i]] for each 0 <= i < nums.length and return it.
// A zero-based permutation nums is an array of distinct integers from 0 to nums.length - 1 (inclusive).


// Solution: Modulo - Combining Numbers

// To replace the numbers in-place, we need to store both the original and new number at each nums[i].
// Since we know each nums[i] < n, we can store both numbers within one number.
// Multiply nums[nums[i]] by n, then add the original nums[i].
// So the original number is always at nums[i] % n.
// For every nums[i], replace nums[i] = (nums[nums[i]] % n) * n + (nums[i] % n).

// After replacing, do one more pass and replace each nums[i] with floor(nums[i] / n) to extract the new numbers.

// e.g. original = 2, new = 4, n = 5.
  // combined = 4*5 + 2 = 22
  // 22 % 5 = 2
  // floor(22 / 5) = 4

// Time Complexity: O(n) 1ms
// Space Complexity: O(1) 58MB
function buildArray(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    nums[i] = (nums[nums[i]] % n) * n + (nums[i] % n);
  }
  for (let i = 0; i < n; i++) {
    nums[i] = Math.floor(nums[i] / n);
  }
  return nums;
};

// Two test cases
console.log(buildArray([0,2,1,5,3,4])) // [0,1,2,4,5,3]
console.log(buildArray([5,0,1,2,3,4])) // [4,5,0,1,2,3]