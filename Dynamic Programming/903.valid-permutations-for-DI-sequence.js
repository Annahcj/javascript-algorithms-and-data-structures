// 903. Valid Permutations for DI Sequence
// You are given a string s of length n where s[i] is either:
  // 'D' means decreasing, or
  // 'I' means increasing.
// A permutation perm of n + 1 integers of all the integers in the range [0, n] is called a valid permutation if for all valid i:
  // If s[i] == 'D', then perm[i] > perm[i + 1], and
  // If s[i] == 'I', then perm[i] < perm[i + 1].
// Return the number of valid permutations perm. Since the answer may be large, return it modulo 109 + 7.


// Solution: DP

// Observation: We don't need to know the exact numbers that we've taken, we only need to know how many numbers are smaller or larger relative to the previous number in the sequence.

// Memoize each dp(i, smaller, larger), where
  // i = index in s
  // smaller = count of numbers that are smaller than the previous number in the sequence
  // larger = count of numbers that are larger than the previous number in the sequence

// For each dp(i, smaller, larger),
  // If s[i] is 'I', we can only use numbers from `smaller`.
  // If s[i] is 'D', we can only use numbers from `larger`.

// Note: Although we have two parameters smaller and larger, larger can be derived from smaller, so there are only n combinations, not O(n^2).

// n = length of s
// Time Complexity: O(n^3) 738ms
// Space Complexity: O(n^2) 64.2MB
var numPermsDISequence = function(s) {
  let n = s.length, MOD = 1000000007;
  let memo = new Map(), ans = 0;
  for (let j = 0; j <= n; j++) {
    ans = (ans + dp(0, j, n - j)) % MOD;
  }
  return ans;
  
  function dp(i, smaller, larger) {
    if (i === n) return 1;
    let key = `${i},${smaller},${larger}`;
    if (memo.has(key)) return memo.get(key);
    
    let ans = 0;
    if (s[i] === 'I') {
      for (let j = 0; j < larger; j++) {
        ans = (ans + dp(i + 1, j + smaller, larger - j - 1)) % MOD;
      }
    } else {
      for (let j = 0; j < smaller; j++) {
        ans = (ans + dp(i + 1, j, smaller - j - 1 + larger)) % MOD;
      }
    }
    memo.set(key, ans);
    return ans;
  }
};

// Two test cases
console.log(numPermsDISequence("DID")) // 5
console.log(numPermsDISequence("D")) // 1