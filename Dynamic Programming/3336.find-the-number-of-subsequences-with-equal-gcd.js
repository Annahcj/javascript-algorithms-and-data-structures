// 3336. Find the Number of Subsequences With Equal GCD
// You are given an integer array nums.
// Your task is to find the number of pairs of non-empty subsequences (seq1, seq2) of nums that satisfy the following conditions:
  // The subsequences seq1 and seq2 are disjoint, meaning no index of nums is common between them.
  // The GCD of the elements of seq1 is equal to the GCD of the elements of seq2.
// Return the total number of such pairs.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP

// For every nums[i], store the previous and current DP results:
// dp[gcd1][gcd2] = number of subsequences with gcd1 in the first subsequence and gcd2 in the second subsequence.

// The base case is dp[0][0] = 1, as gcd of x and 0 = x.

// At the end, count the subsequences for every dp[gcd][gcd], where both gcds are equal.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(nm^2) 2755ms
// Space Complexity: O(m^2) 61.2MB
function subsequencePairCount(nums) {
  let n = nums.length, max = Math.max(...nums);
  let prev = Array(max + 1).fill(0).map(() => Array(max + 1).fill(0));
  prev[0][0] = 1;
  let MOD = 1000000007;
  for (let i = 0; i < n; i++) {
    let curr = Array(max + 1).fill(0).map(() => Array(max + 1).fill(0));
    for (let gcd1 = 0; gcd1 <= max; gcd1++) {
      for (let gcd2 = 0; gcd2 <= max; gcd2++) {
        curr[gcd1][gcd2] = (curr[gcd1][gcd2] + prev[gcd1][gcd2]) % MOD; // skip
        
        let newGcd1 = gcd(gcd1, nums[i]);
        curr[newGcd1][gcd2] = (curr[newGcd1][gcd2] + prev[gcd1][gcd2]) % MOD; // add to first sequence
        
        let newGcd2 = gcd(gcd2, nums[i]);
        curr[gcd1][newGcd2] = (curr[gcd1][newGcd2] + prev[gcd1][gcd2]) % MOD; // add to second sequence
      }
    }
    prev = curr;
  }
  let pairs = 0;
  for (let gcd = 1; gcd <= max; gcd++) {
    pairs = (pairs + prev[gcd][gcd]) % MOD;
  }
  return pairs;
};
  
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Three test cases
console.log(subsequencePairCount([1,2,3,4])) // 10
console.log(subsequencePairCount([10,20,30])) // 2
console.log(subsequencePairCount([1,1,1,1])) // 50