// 438. Find All Anagrams in a String
// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.


// Solution: Sliding Window

// 1. Count the frequency of each character in p.
// 2. Get the number of unique characters in p: count
// 3. Maintain a sliding window of length p over s.
  // When we add characters to our window, decrement the freq count of that character.
  // If the current count of that character is 0, decrement the overall unique count by 1.
  // (If the count is equal to 0, we have found an anagram. Push the left pointer into result)
  // When removing characters from our window, increment back the freq count of that character.
  // Before we decrement the freq count, if the freq count was 0, increment the overall unique count by 1.

// Time Complexity: O(n) 125ms
// Space Complexity: O(1) 41.5MB
var findAnagrams = function(s, p) {
  let freq = Array(26).fill(0), count = 0;
  for (var char of p) {
    if (freq[char.charCodeAt() - 97] === 0) count++;
    freq[char.charCodeAt() - 97]++;
  }
  let res = [];
  for (var left = 0, right = 0; left <= s.length - p.length; left++) {
    while (right - left < p.length) {
      freq[s[right].charCodeAt() - 97]--;
      if (freq[s[right].charCodeAt() - 97] === 0) count--;
      right++;
    }
    if (count === 0) res.push(left);
    if (freq[s[left].charCodeAt() - 97] === 0) count++;
    freq[s[left].charCodeAt() - 97]++;
  }
  return res;
};

// Two test cases to run function on
console.log(findAnagrams("cbaebabacd", "abc")) // [0,6]
console.log(findAnagrams("abab", "ab")) // [0,1,2]