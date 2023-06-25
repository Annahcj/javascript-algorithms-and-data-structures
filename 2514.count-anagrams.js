// 2514. Count Anagrams
// You are given a string s containing one or more words. Every consecutive pair of words is separated by a single space ' '.
// A string t is an anagram of string s if the ith word of t is a permutation of the ith word of s.
  // For example, "acb dfe" is an anagram of "abc def", but "def cab" and "adc bef" are not.
// Return the number of distinct anagrams of s. Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Combinatorics & Modular Inverse

// For each word, count the occurances of each character within the word.
  // n! / (char count)! * (char count)! * (char count)!
  // Reasoning: We eliminate all individual permutations of the groups of same characters, since there is only one distinct order.

// To avoid precision errors when dividing, we instead multiply by the modular inverse.
// It can be proven that factorial[n] / charCountFactorialProd IS EQUAL TO factorial[n] * modularInverse(charCountFactorialProd, MOD - 2, MOD)

// n = number of words, k = max(words[i].length), m = modulo
// Time Complexity: O(n * k log(m)) 463ms
// Space Complexity: O(k) 89.1MB
var countAnagrams = function(s) {
  let words = s.split(" "), maxWordLen = words.reduce((maxLen, word) => Math.max(maxLen, word.length), 0);
  let factorial = Array(maxWordLen + 1).fill(1n);
  let ans = 1n, MOD = 1000000007n;
  for (let i = 1; i <= maxWordLen; i++) {
    factorial[i] = (factorial[i - 1] * BigInt(i)) % MOD;
  }
  for (let word of words) {
    let n = word.length, charCount = {};
    for (let char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    let charCountFactorialProd = 1n;
    for (let char in charCount) {
      let count = charCount[char];
      let charCountFactorial = factorial[count];
      charCountFactorialProd = (charCountFactorialProd * charCountFactorial) % MOD;
    }
    let res = factorial[n] * modularInverse(charCountFactorialProd, Number(MOD) - 2, MOD);
    ans = (ans * res) % MOD;
  }
  return Number(ans);
};

function modularInverse(x, y, mod) { 
  let currPow = x, ans = 1n;
  while (y > 0) {
    if (y & 1) {
      ans = (ans * currPow) % mod;
    }
    currPow = (currPow * currPow) % mod;
    y >>= 1;
  }
  return ans;
}

// Two test cases
console.log(countAnagrams("too hot")) // 18
console.log(countAnagrams("aa")) // 1