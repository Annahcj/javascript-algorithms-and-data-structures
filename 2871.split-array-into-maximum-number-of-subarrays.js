// 2871. Split Array Into Maximum Number of Subarrays
// You are given an array nums consisting of non-negative integers.
// We define the score of subarray nums[l..r] such that l <= r as nums[l] AND nums[l + 1] AND ... AND nums[r] where AND is the bitwise AND operation.
// Consider splitting the array into one or more subarrays such that the following conditions are satisfied:
  // Each element of the array belongs to exactly one subarray.
  // The sum of scores of the subarrays is the minimum possible.
// Return the maximum number of subarrays in a split that satisfies the conditions above.
// A subarray is a contiguous part of an array.


// Solution: Greedy

// The total bitwise AND for nums is always the minimum bitwise AND for any subarray in nums.

// There are two scenarios:
  // 1. If nums contains at least one 0, the entire bitwise AND will be 0.
    // Greedily take as many subarrays as possible where the bitwise AND is 0.
    // Proof: Taking the smallest subarrays possible where the bitwise AND equals 0 is correct, it will never affect the maximum number of subarrays created. Once a subarray has bitwise AND of 0, anything we add to it will still keep the bitwise AND to be 0.
  
  // 2. If the total bitwise AND is greater than 0, we can't split nums at all because any subarray will have bitwise AND greater than 0, which summed up will become larger than the original bitwise AND.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 52.2MB
var maxSubarrays = function(nums) {
  let n = nums.length, bitwiseAND = nums[0], subarrays = 0;
  for (let i = 0; i < n; i++) {
    bitwiseAND &= nums[i];
    if (bitwiseAND === 0) {
      subarrays++;
      bitwiseAND = nums[i + 1];
    }
  }
  return subarrays === 0 ? 1 : subarrays;
};

// Two test cases
console.log(maxSubarrays([1,0,2,0,1,2])) // 3
console.log(maxSubarrays([5,7,1,3])) // 1