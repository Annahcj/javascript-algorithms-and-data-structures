// 1573. Number of Ways to Split a String
// Given a binary string s, you can split s into 3 non-empty strings s1, s2, and s3 where s1 + s2 + s3 = s.
// Return the number of ways s can be split such that the number of ones is the same in s1, s2, and s3. Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: Count Combinations of Zeros in Between

// The number of ones is s must be divisible by 3. 

// Edge case 1: number of ones not divisible by 3, return 0.
// Edge case 2: s only contains 0's, return all the combinations of splitting.

// Find the combinations of the number of zeros in between each batch of 1's.
// When reaching the start of a new segment, 
  // Count the number of zeros in between the last one and the current position.
  // Multiply these counts together to get the number of split combinations.

// Time Complexity: O(n) 108ms
// Space Complexity: O(1) 48.4MB
var numWays = function(s) {
  let ones = 0, mod = 10 ** 9 + 7, n = s.length;
  for (let char of s) ones += Number(char);
  if (ones % 3 !== 0) return 0;
  if (ones === 0) return ((n - 2) * (n - 1) / 2) % mod;
  
  let prev = s.indexOf('1') - 1, count = 0;
  let numOnes = ones / 3, ans = 1;
  for (let i = 0; i < n; i++) {
    if (s[i] === '1' && count % numOnes === 0) {
      ans = (ans * (i - prev)) % mod;
    }
    if (s[i] === '1') {
      prev = i;
      count++;
    }
  }
  return ans === 0 ? 1 : ans;
};

// Three test cases
console.log(numWays("10101")) // 4
console.log(numWays("1001")) // 0
console.log(numWays("0000")) // 3