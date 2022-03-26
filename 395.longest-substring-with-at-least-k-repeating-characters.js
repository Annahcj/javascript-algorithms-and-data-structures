// 395. Longest Substring with At Least K Repeating Characters
// Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k.


// Solution: Sliding Window

// Try each i, where i is the number of unique characters in the substring.
// for each i, use a sliding window approach to find the longest substring with 
  // exactly i unique characters
  // a frequency of k or more for each character
  
// for each i, keep track of:
  // count: where count[i] is the frequency of the ith character (a = 0, b = 1, ...)
  // unique: number of unique characters
  // kCount: number of characters with frequency >= k

// Time Complexity: O(26n) = O(n) 68ms
// Space Complexity: O(1) 42.7MB
var longestSubstring = function(s, k) {
  let n = s.length, ans = 0;
  for (let i = 1; i <= 26; i++) {
    let count = Array(26).fill(0);
    let unique = 0, kCount = 0;
    for (let end = 0, start = 0; end < n; end++) {
      let key = s.charCodeAt(end) - 97;
      if (count[key] === 0) unique++; // new character
      count[key]++;
      if (count[key] === k) kCount++; // a character has freq of k
      
      while (unique > i) {
        let startKey = s.charCodeAt(start) - 97;
        if (count[startKey] === k) kCount--; // a character no longer has freq of k
        count[startKey]--;
        if (count[startKey] === 0) unique--; // a character no longer exists in the window
        start++;
      }
      if (unique === i && kCount === i) { // there must be exactly i unique characters, each with a frequency >= k
        ans = Math.max(ans, end - start + 1);
      }
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(longestSubstring("aaabb", 3)) // 3
console.log(longestSubstring("ababbc", 2)) // 5