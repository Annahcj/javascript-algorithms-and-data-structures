// 2932. Maximum Strong Pair XOR I
// You are given a 0-indexed integer array nums. A pair of integers x and y is called a strong pair if it satisfies the condition:
  // |x - y| <= min(x, y)
// You need to select two integers from nums such that they form a strong pair and their bitwise XOR is the maximum among all strong pairs in the array.
// Return the maximum XOR value out of all possible strong pairs in the array nums.
// Note that you can pick the same integer twice to form a pair.


// Solution: Brute Force

// Go through each pair and record the maximum XOR for pairs where Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j]).

// Time Complexity: O(n^2) 51ms
// Space Complexity: O(1) 44.3MB
var maximumStrongPairXor = function(nums) {
  let n = nums.length, maxXOR = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j])) {
        maxXOR = Math.max(maxXOR, nums[i] ^ nums[j]);
      }
    }
  }
  return maxXOR;
};

// Three test cases
console.log(maximumStrongPairXor([1,2,3,4,5])) // 7
console.log(maximumStrongPairXor([10,100])) // 0
console.log(maximumStrongPairXor([5,6,25,30])) // 7