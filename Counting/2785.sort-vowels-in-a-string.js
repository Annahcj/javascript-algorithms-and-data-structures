// 2785. Sort Vowels in a String
// Given a 0-indexed string s, permute s to get a new string t such that:
  // All consonants remain in their original places. More formally, if there is an index i with 0 <= i < s.length such that s[i] is a consonant, then t[i] = s[i].
  // The vowels must be sorted in the nondecreasing order of their ASCII values. More formally, for pairs of indices i, j with 0 <= i < j < s.length such that s[i] and s[j] are vowels, then t[i] must not have a higher ASCII value than t[j].
// Return the resulting string.
// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in lowercase or uppercase. Consonants comprise all letters that are not vowels.


// Solution 1: Sorting

// 1. Collect the vowels in an array and sort them by ASCII value.
// 2. Build the result string, appending vowels coming from the sorted array of vowels.

// Time Complexity: O(n log(n)) 252ms
  // Technically O(n^2) due to string concatenation, but can be considered O(n) since JS has optimizations.
// Space Complexity: O(n) 68.8MB
var sortVowels = function(s) {
  let n = s.length, vowels = [];
  for (let i = 0; i < n; i++) {
    if (isVowel(s[i])) vowels.push(s[i]);
  }
  vowels.sort();
  let res = "", vowelIndex = 0;
  for (let i = 0; i < n; i++) {
    if (isVowel(s[i])) {
      res += vowels[vowelIndex++];
    } else {
      res += s[i];
    }
  }
  return res;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
}

// Solution 2: Counting

// Count the occurances of each vowel and store them in a hashmap.
// Sort the counts by ASCII value of the vowels.
// By storing in a hashmap, the size will never exceed 10 and sorting will be much faster on such a small array.
// Build up the result array while iterating through the sorted counts.

// Time Complexity: O(n) 196ms
  // Technically O(n^2) due to string concatenation, but can be considered O(n) since JS has optimizations.
// Space Complexity: O(1) (not including output) 61.1MB 
var sortVowels = function(s) {
  let n = s.length, vowelCount = {};
  for (let char of s) {
    if (isVowel(char)) {
      vowelCount[char] = (vowelCount[char] || 0) + 1;
    }
  }
  let counts = Object.entries(vowelCount);
  counts.sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt());
  let res = "", vowelIndex = 0;
  for (let char of s) {
    if (isVowel(char)) {
      res += counts[vowelIndex][0];
      if (--counts[vowelIndex][1] === 0) vowelIndex++;
    } else {
      res += char;
    }
  }
  return res;
};

// Two test cases
console.log(sortVowels("lEetcOde")) // "lEOtcede"
console.log(sortVowels("lYmpH")) // "lYmpH"