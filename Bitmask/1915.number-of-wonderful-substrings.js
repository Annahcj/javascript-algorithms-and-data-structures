// 1915. Number of Wonderful Substrings
// A wonderful string is a string where at most one letter appears an odd number of times.
  // For example, "ccjjc" and "abab" are wonderful, but "ab" is not.
// Given a string word that consists of the first ten lowercase English letters ('a' through 'j'), return the number of wonderful non-empty substrings in word. If the same substring appears multiple times in word, then count each occurrence separately.
// A substring is a contiguous sequence of characters in a string.

 
// Solution: Prefix Bitmasks & Counting

// Keep track of the running counts of each character.
// We can observe that we don't need to know the exact count, but just whether the count is even or odd.
// This means we can use a bitmask to store this since the it's only the first ten lowercase letters.

// Go through word, keeping track of the prefix bitmask.
// Count each occurance of the prefix bitmask, and at each index i, 
  // Count the number of previous bitmasks that were the same as the current bitmask (all characters have an even count)
  // Count the number of previous bitmasks with one toggled bit (one character has an odd odd)

// Time Complexity: O(n * 10) 118ms
// Space Complexity: O(2^10) 55.8MB
var wonderfulSubstrings = function(word) {
  let n = word.length, count = {0: 1};
  let bitmask = 0, substrings = 0;
  for (let i = 0; i < n; i++) {
    let charcode = word.charCodeAt(i) - 97;
    bitmask = bitmask ^ (1 << charcode);
    substrings += (count[bitmask] || 0);
    for (let j = 0; j < 10; j++) {
      let toggledBitmask = bitmask ^ (1 << j);
      substrings += (count[toggledBitmask] || 0);
    }
    count[bitmask] = (count[bitmask] || 0) + 1;
  }
  return substrings;
};

// Three test cases
console.log(wonderfulSubstrings("aba")) // 4
console.log(wonderfulSubstrings("aabb")) // 9
console.log(wonderfulSubstrings("he")) // 2