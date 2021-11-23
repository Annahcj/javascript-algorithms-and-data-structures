// 159. Longest Substring with At Most Two Distinct Characters
// Given a string s, return the length of the longest substring that contains at most two distinct characters.


// Solution: Sliding Window

// Use two pointers -> left and right
// Keep a hashmap 'freq' which stores the number of times a character has occured.

// if the frequency of s[right] is 0, set the frequency to 1, and decrement unique by 1.
// otherwise, increment the frequency of s[right].
// increment right.
// while unique is smaller than 0,
  // decrement the frequency of s[left] by 1
  // if the frequency of s[left] is 0, increment unique by 1.
  // increment left.
// keep track of the max length

// Time Complexity: O(n) 116ms
// Space Complexity: O(n) 41.5MB
var lengthOfLongestSubstringTwoDistinct = function(s) {
  let freq = {};
  let left = 0, right = 0;
  let unique = 2;
  let max = 0;
  while (right < s.length) {
    if (!freq[s[right]]) {
      freq[s[right]] = 1;
      unique--;
    } else {
      freq[s[right]]++;
    }
    right++;
    while (unique < 0) {
      freq[s[left]]--;
      if (freq[s[left]] === 0) unique++;
      left++;
    }
    max = Math.max(max, right - left);
  }
  return max;
};

// Two test cases to run function on
console.log(lengthOfLongestSubstringTwoDistinct("eceba")) // 3
console.log(lengthOfLongestSubstringTwoDistinct("ccaabbb")) // 5