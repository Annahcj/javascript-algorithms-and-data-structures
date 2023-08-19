// 1856. Maximum Subarray Min-Product
// The min-product of an array is equal to the minimum value in the array multiplied by the array's sum.
  // For example, the array [3,2,5] (minimum value is 2) has a min-product of 2 * (3+2+5) = 2 * 10 = 20.
// Given an array of integers nums, return the maximum min-product of any non-empty subarray of nums. Since the answer may be large, return it modulo 10^9 + 7.
// Note that the min-product should be maximized before performing the modulo operation. Testcases are generated such that the maximum min-product without modulo will fit in a 64-bit signed integer.
// A subarray is a contiguous part of an array.


// Solution: Monotonic Increasing Stack & Prefix Sum

// Since nums[i] >= 1, this means the more numbers we include in a subarray, the greater the min-product.
// Take each nums[i] as the minimum value in a subarray, and get the largest subarray possible where nums[i] is the minimum value.
// Use a monotonic increasing stack to find the closest smaller value on the left and right of each nums[i].
// After we know the subarray range, use prefix sum to find the sum of the subarray in O(1) time complexity.

// Time Complexity: O(n) 229ms
// Space Complexity: O(n) 77.8MB
var maxSumMinProduct = function(nums) {
  let n = nums.length, pSum = [0, ...nums];
  let leftSmallest = Array(n).fill(-1), stack = [];
  for (let i = 0; i < n; i++) {
    pSum[i + 1] += pSum[i];
    while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    leftSmallest[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }
  let ans = 0n, MOD = 1000000007n;
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    let rightSmallest = stack.length ? stack[stack.length - 1] : n;
    let subarraySum = pSum[rightSmallest] - pSum[leftSmallest[i] + 1];
    let minProduct = BigInt(nums[i]) * BigInt(subarraySum);
    ans = minProduct > ans ? minProduct : ans;
    stack.push(i);
  }
  return ans % MOD;
};

// Three test cases
console.log(maxSumMinProduct([1,2,3,2])) // 14
console.log(maxSumMinProduct([2,3,3,1,2])) // 18
console.log(maxSumMinProduct([3,1,5,6,4,2])) // 60