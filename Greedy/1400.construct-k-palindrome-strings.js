// 1400. Construct K Palindrome Strings
// Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.


// Solution: Greedy

// Greedily construct as few palindromes as possible.
// We know that we can construct a palindrome given pairs of equal characters and one single character.
// After we get the fewest count of palindromes, if the count is <= k, 
  // it is proven that we can construct any amount of palindromes within the range of [min, ..., k]

// e.g: aabbccd
// the minimum amount of palindromes is 1 -> an example is "abcdcba"
// How let's try all the possibilities of k where k <= s.length

// Note that each of the examples are only one example, there may be many others.
// k = 1: "abcdcba"
// k = 2: "bcdcb", "aa"
// k = 3: "cdc", "bb", "aa"
// k = 4: "cdc", "bb", "a", "a"
// k = 5: "cdc", "b", "b", "a", "a"
// k = 6: "cc", "d", "b", "b", "a", "a"
// k = 7: "c", "c", "d", "b", "b", "a", "a"

// To get the minimum count of palindromes, we can just count the number of odd frequency characters.
// We don't have to worry about even frequency characters because one odd frequency character can always be added as the middle part of a bigger palindrome.

// Note: Additional to checking the minimum number of palindromes, the length of s must also be bigger than or equal to k.

// Time Complexity: O(n) 127ms
// Space Complexity: O(1) 45.6MB
var canConstruct = function(s, k) {
  let count = Array(26).fill(0);
  for (let char of s) count[char.charCodeAt() - 97]++;
  let min = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] % 2 === 1) min++;
  }
  return min <= k && s.length >= k;
};

// Three test cases
console.log(canConstruct("annabelle", 2)) // true
console.log(canConstruct("leetcode", 3)) // false
console.log(canConstruct("true", 4)) // true