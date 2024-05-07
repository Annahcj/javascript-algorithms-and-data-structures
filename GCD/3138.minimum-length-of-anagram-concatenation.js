// 3138.minimum-length-of-anagram-concatenation.js
// 3138. Minimum Length of Anagram Concatenation
// You are given a string s, which is known to be a concatenation of anagrams of some string t.
// Return the minimum possible length of the string t.
// An anagram is formed by rearranging the letters of a string. For example, "aab", "aba", and, "baa" are anagrams of "aab".

 
// [Solution for any permutation after concatenation of anagrams]
// Solution: Counting & GCD

// Count the occurances of each character in s.
// For the string t to have length x, each character count must be divisible by x.
// Find the GCD of all the character counts, and get the sum of each character count divided by the GCD.

// n = length of s
// Time Complexity: O(n) 66ms
// Space Complexity: O(1) 52.8MB
var minAnagramLength = function(s) {
  let count = Array(26).fill(0);
  for (let char of s) {
    count[char.charCodeAt() - 97]++;
  }
  let gcd = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] > 0) {
      gcd = gcd === 0 ? count[i] : getGCD(gcd, count[i]);
    }
  }
  let t = 0;
  for (let i = 0; i < 26; i++) {
    t += (count[i] / gcd);
  }
  return t;
};

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}

// [The correct solution]
// Solution: Brute Force

// For each length divisible by s.length, iterate over s to check whether all concatenated substrings are anagrams of the same string.
// The maximum number of factors for a number <= 10^5 = 128 (83160).

// Time Complexity: O(n log(n)) 160ms
// Space Complexity: O(1) 57.6MB
var minAnagramLength = function(s) {
  let n = s.length;
  for (let len = 1; len <= n; len++) {
    if (n % len === 0 && isAnagramConcatenation(s, len)) {
      return len;
    }
  }
};

function isAnagramConcatenation(s, len) {
  let n = s.length, count = Array(26).fill(0);
  for (let i = 0; i < len; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  let count2 = Array(26).fill(0);
  for (let i = len; i < n; i++) {
    count2[s.charCodeAt(i) - 97]++;
    if (i % len === len - 1) { // end of a substring
      // compare substring's counts with the first substring.
      // character counts must match to be an anagram
      for (let j = 0; j < 26; j++) {
        if (count2[j] !== count[j]) return false;
      }
      count2 = Array(26).fill(0);
    }
  }
  return true;
}

// Two test cases
console.log(minAnagramLength("abba")) // 2
console.log(minAnagramLength("cdef")) // 4