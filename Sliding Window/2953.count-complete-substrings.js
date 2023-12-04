// 2953. Count Complete Substrings
// You are given a string word and an integer k.
// A substring s of word is complete if:
  // Each character in s occurs exactly k times.
  // The difference between two adjacent characters is at most 2. That is, for any two adjacent characters c1 and c2 in s, the absolute difference in their positions in the alphabet is at most 2.
// Return the number of complete substrings of word.
// A substring is a non-empty contiguous sequence of characters in a string.


// Solution: Sliding Window

// There can be up to 26 unique characters in a substring, and each character occurs exactly k times.
// For each number of unique characters, maintain a sliding window of characters where 
  // 1. The difference between two adjacent characters is at most 2.
  // 2. The length of the window doesn't exceed the size the substring is meant to be: unique characters * k.
// Count the number of substrings with exactly `unique` unique characters which occur k times each.

// Time Complexity: O(26n) 1994ms
// Space Complexity: O(1) 53.2MB
var countCompleteSubstrings = function(word, k) {
  let n = word.length, complete = 0;
  for (let unique = 1; unique <= 26; unique++) {
    let substrSize = unique * k;
    let charsWithKFreq = 0;
    let count = Array(26).fill(0);
    for (let j = 0, i = 0; j < n; j++) {
      // diff between adjacent chars > 2, reset the window completely
      if (j > 0 && diff(word[j], word[j - 1]) > 2) {
        count = Array(26).fill(0);
        charsWithKFreq = 0;
        i = j;
      }
      count[word.charCodeAt(j) - 97]++;
      if (count[word.charCodeAt(j) - 97] === k) charsWithKFreq++;
      // move left pointer up while window is too big for the substring size
      while (j - i + 1 > substrSize) {
        if (count[word.charCodeAt(i) - 97] === k) charsWithKFreq--;
        count[word.charCodeAt(i) - 97]--;
        i++;
      }
      if (charsWithKFreq === unique) complete++;
    }
  }
  return complete;
};

function diff(a, b) {
  return Math.abs(a.charCodeAt() - b.charCodeAt());
}

// Two test cases
console.log(countCompleteSubstrings("igigee", 2)) // 3
console.log(countCompleteSubstrings("aaabbbccc", 3)) // 6