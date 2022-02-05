// 1994. The Number of Good Subsets
// You are given an integer array nums. We call a subset of nums good if its product can be represented as a product of one or more distinct prime numbers.
  // For example, if nums = [1, 2, 3, 4]:
    // [2, 3], [1, 2, 3], and [1, 3] are good subsets with products 6 = 2*3, 6 = 2*3, and 3 = 3 respectively.
    // [1, 4] and [4] are not good subsets with products 4 = 2*2 and 4 = 2*2 respectively.
// Return the number of different good subsets in nums modulo 109 + 7.
// A subset of nums is any array that can be obtained by deleting some (possibly none or all) elements from nums. Two subsets are different if and only if the chosen indices to delete are different.


// Solution: Recursion & Bitmasks

// Since nums[i] is within the range [1, 30], we can count the frequencies of nums and use a brute force solution.
// Get the prime and bad numbers: 
  // bad: numbers that cannot be included in any good subset. e.g: 4, 4 is comprised of 2 * 2, which breaks the rule.
// Now, we have 19 numbers left. The number 1 is a special case, since a good subset cannot only consist of 1's. Hence, we will deal with this later.

// 1. Get the prime numbers and bad numbers.
// 2. Generate a bit mask of prime numbers for each number.
// 3. Count the frequency of each number.
// 4. Use recursion to count the number of good subsets.

// Note: In JavaScript, we need to use BigInt to avoid integer overflow.

// Explanations:
// dp(2, 0) - 1: Since we have a basecase of 1 when we reach 31, we need to subtract it off.
// ones: Calculate the numbers of subsets of all the ones. This is 2^count[nums]. For each 1, we either take it or not take it.

// Time Complexity: O(2^18) 277ms
// Space Complexity: O(2^18) 59.8MB 
var numberOfGoodSubsets = function(nums) {
  let prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 27];
  let bad = new Set([4, 8, 9, 12, 16, 18, 20, 24, 25, 27, 28]);
  
  let masks = Array(31), mod = BigInt(10 ** 9 + 7);
  for (let i = 1; i < 31; i++) {
    let mask = 0;
    for (let pri of prime) {
      if (i % pri === 0) mask |= (1 << (pri - 1));
    }
    masks[i] = mask;
  }
  
  let count = Array(31).fill(0);
  for (let num of nums) count[num]++;
  let ones = 1n;
  for (let i = 0; i < count[1]; i++) {
    ones = (ones * 2n) % mod; 
  }
  return ((dp(2, 0) - 1n) * ones) % mod; 
  
  function dp(num, mask) {
    if (num == 31) return 1n;
    let ans = dp(num + 1, mask);
    if (!bad.has(num) && (mask & masks[num]) === 0) {
      ans = (ans + dp(num + 1, mask | masks[num]) * BigInt(count[num])) % mod;
    }
    return ans;
  }
};