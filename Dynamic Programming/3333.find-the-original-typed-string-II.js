// 3333. Find the Original Typed String II
// Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.
// You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.
// Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP & Combinatorics

// count-1 * count-1 * count-1 * ...
// However, string size must be >= k.

// Use dynamic programming to calculate the number of combinations to take strings <= length k.
// dp[i] = number of combinations with total size <= i.

// For each consecutive group of the same character, 
// go through each possible new sum i from 0 to k - 1, 
// dp2[i] = accumulated dp2[i - 1] + prefix sum dp[i - count] to dp[i] (instead of looping through from 1 to count, use prefix sum).

// Note: If the number of groups > k, that means there will never be a combination where we can take less than k characters
// This ensures the outer loop never exceeds 2000.

// Time Complexity: O(min(k, n) * k) 383ms
// Space Complexity: O(n + k) 93MB
function possibleStringCount(word, k) {
  const n = word.length, groupCounts = [];
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (word[i] === word[i - 1]) {
      count++;
    } else {
      groupCounts.push(count);
      count = 1;
    }
  }
  groupCounts.push(count);
  let totalCombinations = 1;
  const MOD = 1000000007;
  for (let count of groupCounts) {
    totalCombinations = (totalCombinations * count) % MOD;
  }
  if (groupCounts.length > k) {
    return totalCombinations;
  }
  let prev = Array(k).fill(0);
  prev[0] = 1;
  for (let count of groupCounts) {
    const curr = Array(k).fill(0);
    let sum = 0;
    for (let i = 1; i < k; i++) {
      // prefix sum of all prev from i-1 to i-count-1
      sum = (sum + prev[i - 1]) % MOD; // only taking 1 from the current group
      if (i > count) sum = (sum - prev[i - count - 1] + MOD) % MOD;
      curr[i] = sum;
    }
    prev = curr;
  }
  let eliminatedCombinations = 0;
  for (let i = 0; i < k; i++) {
    eliminatedCombinations = (eliminatedCombinations + prev[i]) % MOD;
  }
  return ((totalCombinations - eliminatedCombinations) + MOD) % MOD;
};

// Three test cases
console.log(possibleStringCount("aabbccdd", 7)) // 5
console.log(possibleStringCount("aabbccdd", 8)) // 1
console.log(possibleStringCount("aaabbb", 3)) // 8