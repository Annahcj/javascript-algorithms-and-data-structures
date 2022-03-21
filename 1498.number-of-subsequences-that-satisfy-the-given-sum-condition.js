// 1498. Number of Subsequences That Satisfy the Given Sum Condition
// You are given an array of integers nums and an integer target.
// Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: Sorting, Two Pointers, Precompute Powers

// Note: Since we only care about subsequences, the order of nums really doesn't matter.
// So, we can sort nums so that we can use two pointers.

// For each valid min and max number, take right - left subsequences.
// For an array [2,3,4], we take 2^2 subsequences. 
// 2^n represents every choice of taking nums[i] or not taking nums[i].
// Note that we always take the power of the length - 1. This is because we must include the minimum in every subsequence.

// e.g: [2,3,10], target = 12
// l = 0, r = 2: 2 + 10 <= 12, take 2^2 (4) subsequences. 
// l = 1, r = 2: 3 + 10 > 12, decrement r.
// l = 1, r = 1: 3 + 3 <= 12, take 2^0 (1) subsequences.
// The total is 5 subsequences.

// Last note: We must precompute the powers from 0 to n - 1 so that we will not have an integer overflow.

// Time Complexity: O(n log(n)) 208ms
// Space Complexity: O(n) 53MB
var numSubseq = function(nums, target) {
  let n = nums.length, pows = Array(n), mod = 10 ** 9 + 7;
  pows[0] = 1;
  for (let i = 1; i < n; i++) {
    pows[i] = (pows[i - 1] * 2) % mod;
  }
  
  nums.sort((a, b) => a - b);
  
  let ans = 0, l = 0, r = n - 1;
  while (l <= r) {
    if (nums[l] + nums[r] > target) r--;
    else {
      ans = (ans + pows[r - l++]) % mod;
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(numSubseq([3,5,6,7], 9)) // 4
console.log(numSubseq([3,3,6,8], 10)) // 6