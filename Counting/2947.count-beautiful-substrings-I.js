// 2947. Count Beautiful Substrings I
// You are given a string s and a positive integer k.
// Let vowels and consonants be the number of vowels and consonants in a string.
// A string is beautiful if:
  // vowels == consonants.
  // (vowels * consonants) % k == 0, in other terms the multiplication of vowels and consonants is divisible by k.
// Return the number of non-empty beautiful substrings in the given string s.
// A substring is a contiguous sequence of characters in a string.
// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
// Consonant letters in English are every letter except vowels.


// Solution: Brute Force w/ Counting

// Iterate through each substring (i, j), and keep track of the running count of vowels and consonants.
// If the two conditions are met, add to the count of beautiful substrings.

// Time Complexity: O(n^2) 383ms
// Space Complexity: O(1) 44.3MB
var beautifulSubstrings = function(s, k) {
  let n = s.length, ans = 0;
  for (let i = 0; i < n; i++) {
    let vowels = 0, consonants = 0;
    for (let j = i; j < n; j++) {
      if (isVowel(s[j])) {
        vowels++;
      } else {
        consonants++;
      }
      if (vowels === consonants && (vowels * consonants) % k === 0) ans++;
    }
  }
  return ans;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char);
}

// Three test cases
console.log(beautifulSubstrings("baeyh", 2)) // 2
console.log(beautifulSubstrings("abba", 1)) // 3
console.log(beautifulSubstrings("bcdf", 1)) // 0