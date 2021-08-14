// 3. Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without repeating characters.


// Solution: Hash Map

// Use a hash map to store the indexes of each unique character in s
// Loop through s (pointer = j) 
  // If map doesn't contain s[j], set map[s[j]] to j
  // else,
    // set max (longest substring) to Math.max(max, j - i)
    // set i to Math.max(i, index in map + 1) (i could be bigger than index in map)
    // update map[s[j]] to be j
// set max to Math.max(max, j - i) (for last check)
// return max

// n = length of s, k = number of unique characters
// Time Complexity: O(n) 171ms
// Space Complexity: O(k) 45.3MB
  var lengthOfLongestSubstring = function(s) {
    let map = {}, max = 0, i = 0;
    for (var j = 0; j < s.length; j++) {
      if (map[s[j]] === undefined) map[s[j]] = j;
      else {
        max = Math.max(max, j - i);
        i = Math.max(i, map[s[j]] + 1);
        map[s[j]] = j;
      } 
    }
    max = Math.max(max, j - i);
    return max;
  };
  
  // Five test cases to run function on
  console.log(lengthOfLongestSubstring("abcbad")) // 4
  console.log(lengthOfLongestSubstring("abcabcbb")) // 3 
  console.log(lengthOfLongestSubstring("bbbbb")) // 1
  console.log(lengthOfLongestSubstring("pwwkew")) // 3 
  console.log(lengthOfLongestSubstring("")) // 0