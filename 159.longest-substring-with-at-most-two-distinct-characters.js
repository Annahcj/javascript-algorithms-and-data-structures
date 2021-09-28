// 159. Longest Substring with At Most Two Distinct Characters
// Given a string s, return the length of the longest substring that contains at most two distinct characters.


// Solution: Sliding Window 

// Use a hashmap to keep the last occurance indexes
// set two variables char1 and char2
// set max to 0, start to 0
// loop through s (pointer = i)
  // set the lastIdx[s[i]] to i
  // if s[i] is not char1 and not char2, (then we need to move our window)
    // set max to Math.max(max, i - start)
    // if s[i - 1] is equal to fruit1
      // set start to the last index of char2 + 1 (that is the first valid index of char2)
      // delete lastIdx[char2] to save space
      // set char2 to fruit
    // otherwise 
      // set start to the last index of char1 + 1
      // delete lastIdx[char1] to save space
      // set char1 to fruit
  // set max to Math.max(max, i - start)
  // return max

// Time Complexity: O(n) 236ms
// Space Complexity: O(1) 45.8MB
var lengthOfLongestSubstringTwoDistinct = function(s) {
  let lastIdx = {};
  let char1, char2;
  let max = 0, start = 0;
  for (var i = 0; i < s.length; i++) {
    lastIdx[s[i]] = i;
    if (s[i] !== char1 && s[i] !== char2) {
      max = Math.max(max, i - start);
      if (i > 0 && s[i - 1] === char1) {
        start = lastIdx[char2] !== undefined ? lastIdx[char2] + 1 : 0;
        delete lastIdx[char2];
        char2 = s[i];
      } else {
        start = lastIdx[char1] !== undefined ? lastIdx[char1] + 1 : 0;
        delete lastIdx[char1];
        char1 = s[i];
      }
    }
  }  
  max = Math.max(max, i - start);
  return max;
};

// Two test cases to run function on
console.log(lengthOfLongestSubstringTwoDistinct("eceba")) // 3
console.log(lengthOfLongestSubstringTwoDistinct("ccaabbb")) // 5