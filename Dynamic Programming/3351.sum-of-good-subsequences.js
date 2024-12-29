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

// Time Complexity: O(n) 518ms
// Space Complexity: O(n) 76.47MB
function sumOfGoodSubsequences(nums) {
  const MOD = 1000000007n;
  const subsequenceCount = Array(100003).fill(0n);
  const subsequenceSum = Array(100003).fill(0n);
  let ans = 0n;
  for (let num of nums) {
    const subsequences = (1n + subsequenceCount[num] + subsequenceCount[num + 2]) % MOD;
    const sum = ((BigInt(num) * subsequences) + subsequenceSum[num] + subsequenceSum[num + 2]) % MOD;
    ans = (ans + sum) % MOD;
    subsequenceCount[num + 1] = (subsequenceCount[num + 1] + subsequences) % MOD;
    subsequenceSum[num + 1] = (subsequenceSum[num + 1] + sum) % MOD; 
  }
  return Number(ans);
};

// Two test cases
console.log(sumOfGoodSubsequences([1,2,1])) // 14
console.log(sumOfGoodSubsequences([3,4,5])) // 40