// 1799. Maximize Score After N Operations
// You are given nums, an array of positive integers of size 2 * n. You must perform n operations on this array.
// In the ith operation (1-indexed), you will:
  // Choose two elements, x and y.
  // Receive a score of i * gcd(x, y).
  // Remove x and y from nums.
// Return the maximum score you can receive after performing n operations.
// The function gcd(x, y) is the greatest common divisor of x and y.


// Solution: DP w/ Bitmasks

// Memoize each dp(mask), where
  // mask = bitmask of which numbers we have removed
// Since we know how many operations we have done based on the bitmask, we don't need to memoize i.

// For the ith operation, try every pair of unused numbers and record the maximum score.

// m = length of nums
// Time Complexity: O(2^m * m^2) 420ms
// Space Complexity: O(2^m) 44.5MB
var maxScore = function(nums) {
  let n = nums.length / 2, m = nums.length;
  let memo = Array(1 << m).fill(-1);
  return dp(1, 0);
  
  function dp(i, mask) {
    if (i === n + 1) return 0;
    if (memo[mask] !== -1) return memo[mask];
    
    let ans = 0;
    for (let j = 0; j < m; j++) {
      if ((mask >> j) & 1) continue; // j has already been used
      for (let k = j + 1; k < m; k++) {
        if ((mask >> k) & 1) continue; // k has already been used
        let score = i * gcd(nums[j], nums[k]);
        let newMask = mask | (1 << j) | (1 << k);
        ans = Math.max(ans, dp(i + 1, newMask) + score);
      }
    }
    return memo[mask] = ans;
  }
  
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
};

// Three test cases to run function on
console.log(maxScore([1,2])) // 1
console.log(maxScore([3,4,6,8])) // 11
console.log(maxScore([1,2,3,4,5,6])) // 14