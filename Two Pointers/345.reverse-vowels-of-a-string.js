// 345. Reverse Vowels of a String
// Given a string s, reverse only all the vowels in the string and return it.
// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both cases.


// Solution: Two Pointers

// 1. Split s into an array.
// 2. Use two pointers to track the vowels and swap them.

// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 51.8MB
var reverseVowels = function(s) {
  let chars = s.split(""), n = s.length;  
  let i = 0, j = n - 1;
  while (i < j) {
    while (i < n && !isVowel(chars[i])) i++; // find next vowel
    while (j >= 0 && !isVowel(chars[j])) j--; // find next vowel
    if (i >= j) break;
    [chars[i], chars[j]] = [chars[j], chars[i]];
    i++, j--;
  }
  return chars.join("");
};

function isVowel(char) {
  let vowels = new Set(['a','e','i','o','u']);
  return vowels.has(char.toLowerCase());
}

// Two test cases to run function on
console.log(reverseVowels("hello")) // "holle"
console.log(reverseVowels("leetcode")) // "leotcede"