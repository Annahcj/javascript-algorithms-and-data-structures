// 2741. Special Permutations
// You are given a 0-indexed integer array nums containing n distinct positive integers. A permutation of nums is called special if:
  // For all indexes 0 <= i < n - 1, either nums[i] % nums[i+1] == 0 or nums[i+1] % nums[i] == 0.
// Return the total number of special permutations. As the answer could be large, return it modulo 10^9 + 7.


// Solution: DP w/ Bitmasks

// Memoize each dp(mask, prevIndex), where
  // mask = bitmask which indicates which numbers we have used so far
  // prevIndex = index of the previous number in the permutation

// For each dp(mask, prevIndex), go through each number and try each unused number that is valid for the current sequence.
// Count the total number of ways.

// Time Complexity: O(2^n * n^2) 496ms
// Space Complexity: O(2^n * n) 88.1MB
var specialPerm = function(nums) {
  let n = nums.length, fullMask = (1 << n) - 1;
  let memo = Array(1 << n).fill(0).map(() => Array(n).fill(-1)), MOD = 10 ** 9 + 7, res = 0;
  for (let i = 0; i < n; i++) {
    res = (res + dp(1 << i, i)) % MOD;
  }
  return res;
  
  function dp(mask, prevIndex) {
    if (mask === fullMask) return 1;
    if (memo[mask][prevIndex] !== -1) return memo[mask][prevIndex];

    let ans = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue; 
      if ((nums[i] % nums[prevIndex] === 0) || (nums[prevIndex] % nums[i] === 0)) {
        let newMask = mask | (1 << i);
        ans = (ans + dp(newMask, i)) % MOD;
      }
    }
    return memo[mask][prevIndex] = ans;
  }  
};

// Two test cases
console.log(specialPerm([2,3,6])) // 2
console.log(specialPerm([1,4,3])) // 2