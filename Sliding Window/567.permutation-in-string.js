// 567. Permutation in String
// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
// In other words, return true if one of s1's permutations is the substring of s2. 


// Solution: Sliding Window

// Note: This question is very similar to 438. Find All Anagrams in a String.

// 1. Count the frequency of each character in p.
// 2. Get the number of unique characters in p: count
// 3. Maintain a sliding window of length p over s.
  // When we add characters to our window, decrement the freq count of that character.
  // If the current count of that character is 0, decrement the overall unique count by 1.
  // If the overall unique count is equal to 0, return true (we have found a permutation)
  // When removing characters from our window, increment back the freq count of that character.
  // Before we decrement the freq count, if the freq count was 0, increment the overall unique count by 1.

var checkInclusion = function(s1, s2) {
  let freq = Array(26).fill(0), count = 0;
  for (var char of s1) {
    if (freq[char.charCodeAt() - 97] === 0) count++;
    freq[char.charCodeAt() - 97]++;
  }
  let n = s1.length, m = s2.length;
  for (var left = 0, right = 0; left <= m - n; left++) {
    while (right < m && right - left < n) {
      freq[s2[right].charCodeAt() - 97]--;
      if (freq[s2[right].charCodeAt() - 97] === 0) count--;
      right++;
    }
    if (count === 0) return true;
    if (freq[s2[left].charCodeAt() - 97] === 0) count++;
    freq[s2[left].charCodeAt() - 97]++;
  }
  return false;
};

// Two test cases to run function on
console.log(checkInclusion("ab", "eidbaooo")) // true
console.log(checkInclusion("ab", "eidbaeidboaooooo")) // false