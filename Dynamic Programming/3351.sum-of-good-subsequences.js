// 3351. Sum of Good Subsequences
// You are given an integer array nums. A good subsequence is defined as a subsequence of nums where the absolute difference between any two consecutive elements in the subsequence is exactly 1.
// Return the sum of all possible good subsequences of nums.
// Since the answer may be very large, return it modulo 10^9 + 7.
// Note that a subsequence of size 1 is considered good by definition.


// Solution: DP w/ Hashmap

// Store the count of subsequences ending at each nums[i], in a hashmap.
// Store the total sum of elements in subsequences ending at each nums[i], in a hashmap.

// For every nums[i], 
  // Count the number of subsequences ending with nums[i]:
    // One subsequence with only nums[i].
    // subsequenceCount[nums[i] + 1]: Subsequences with previous number at nums[i] + 1.
    // subsequenceCount[nums[i] - 1]: Subsequences with previous number at nums[i] - 1.
  // Count the total sum of elements in subsequences ending at nums[i]:
    // nums[i]: One subsequence with only nums[i].
    // nums[i] * count of subsequences: Add nums[i] to every new subsequence we're creating.
    // subsequenceSum[nums[i] + 1] + subsequenceSum[nums[i] - 1]: The sum of other elements from the new subsequences we're creating.

// Time Complexity: O(n) 1012ms
// Space Complexity: O(n) 81.82MB
function sumOfGoodSubsequences(nums) {
  const n = nums.length, MOD = 1000000007n;
  const subsequenceCount = {}, subsequenceSum = {};
  let ans = 0n;
  for (let i = 0; i < n; i++) {
    const subsequences = 1n + (subsequenceCount[nums[i] + 1] || 0n) + (subsequenceCount[nums[i] - 1] || 0n);
    const sum = ((BigInt(nums[i]) * subsequences) + (subsequenceSum[nums[i] + 1] || 0n) + (subsequenceSum[nums[i] - 1] || 0n)) % MOD;
    ans = (ans + sum) % MOD;
    subsequenceCount[nums[i]] = (subsequenceCount[nums[i]] || 0n) + subsequences;
    subsequenceSum[nums[i]] = ((subsequenceSum[nums[i]] || 0n) + sum) % MOD; 
  }
  return Number(ans);
};

// Two test cases
console.log(sumOfGoodSubsequences([1,2,1])) // 14
console.log(sumOfGoodSubsequences([3,4,5])) // 40