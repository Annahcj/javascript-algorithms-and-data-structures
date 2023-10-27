// 940. Distinct Subsequences II
// Given a string s, return the number of distinct non-empty subsequences of s. Since the answer may be very large, return it modulo 109 + 7.
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not.


// Solution: Dynamic Programming

// Since s[i] is between a - z, there can only be 26 letters.
// endsWith represents the number of subsequences ending with character i.
// Loop through s
  // set endsWith[charcode of s[i]] to the sum of endsWith + 1.
  // This is adding s[i] to the end of every subsequence we have come across so far. Since the character itself needs to be counted, +1.

  // for example: aba, endsWith = [1, 1]. We have processed ab so far. 
  // Now we are at the last a: a -> aa, b -> ba, and itself 'a'. So endsWith[a] = 3.

// Time Complexity: O(26n) = O(n) 95ms
// Space Complexity: O(26) = O(1) 42.7MB
var distinctSubseqII = function(s) {
  let endsWith = Array(26).fill(0), n = s.length, mod = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < 26; j++) sum = (sum + endsWith[j]) % mod;
    endsWith[s.charCodeAt(i) - 97] = sum + 1;
  }
  
  let ans = 0;
  for (let j = 0; j < 26; j++) ans = (ans + endsWith[j]) % mod;
  return ans;
};

// Three test cases
console.log(distinctSubseqII("abc")) // 7
console.log(distinctSubseqII("aba")) // 6
console.log(distinctSubseqII("aaa")) // 3