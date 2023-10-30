// 2681. Power of Heroes
// You are given a 0-indexed integer array nums representing the strength of some heroes. The power of a group of heroes is defined as follows:
  // Let i0, i1, ... ,ik be the indices of the heroes in a group. Then, the power of this group is max(nums[i0], nums[i1], ... ,nums[ik])2 * min(nums[i0], nums[i1], ... ,nums[ik]).
// Return the sum of the power of all non-empty groups of heroes possible. Since the sum could be very large, return it modulo 10^9 + 7.


// Solution: Math - Sorting & Prefix Sum 

// Sort nums in asc order.
// Take each nums[i] as the maximum in a subsequence.
// Keep track of the prefix sum of all the contributions of numbers on the left in all possible subsequences.
// We need the contributions of the minimum numbers in all the subsequences where nums[i] is present:
  // nums[i] will have one new subsequence by itself ([nums[i]]).
  // nums[i] will be included as the maximum in `i` new subsequences (a copy of all the past subsequences, with nums[i] added to them)
  // Take nums[i] as maximum: nums[i] * nums[i]
  // Multiplied by the sum of the minimum numbers in subsequences where nums[i] is the maximum: nums[i] * nums[i] * (previous subsequence sum + nums[i])

// e.g: [1,2,4]
  // 1: [1] 
    // 1 is the minimum in 1 subsequence ([1])
  // 2: [2],[1,2]
    // 2 is the minimum in 1 subsequence ([2])
    // 1 is the minimum in another subsequence ([1,2])
  // 4: [4],[1,4],[2,4],[1,2,4]
    // 4 is the minimum in 1 subsequence ([4])
    // 1 is the minimum in two other subsequences ([1,4],[1,2,4])
    // 2 is the minimum in one oher subsequence ([2,4])

// Note: See how each iteration copies the previous subsequences and adds nums[i] as the maximum.
// Keep track of the prefix sum of minimum numbers in all subsequences.

// Time Complexity: O(n log(n)) 245ms
// Space Complexity: O(log(n)) (space for sorting) 56.1MB
var sumOfPower = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length, subsequenceSum = 0n;
  let MOD = 1000000007n, ans = 0n;
  for (let i = 0; i < n; i++) {
    let num = BigInt(nums[i]);
    let currSubsequenceSum = subsequenceSum + num;
    let power = (((num * num) % MOD) * currSubsequenceSum) % MOD;
    ans = (ans + power) % MOD;
    subsequenceSum = (subsequenceSum + currSubsequenceSum) % MOD;
  }
  return ans;
};

// Two test cases
console.log(sumOfPower([4,2,1])) // 141
console.log(sumOfPower([1,1,1])) // 7