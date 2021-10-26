// 424. Longest Repeating Character Replacement
// You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
// Return the length of the longest substring containing the same letter you can get after performing the above operations.


// Solution: Sliding Window

// Time Complexity: O(n) 121ms
// Space Complexity: O(1) 39MB
var characterReplacement = function(s, k) {
  let freq = Array(26).fill(0);
  let start = 0, longest = 0, max = 0;
  for (var end = 0; end < s.length; end++) {
    let idx = s.charCodeAt(end) - 65;
    // most frequency character from start to this point
    longest = Math.max(longest, ++freq[idx]);
    // while more than k characters are missing from the substring from start to end, move start up
    while (end - start + 1 - longest > k) {
      freq[s.charCodeAt(start) - 65]--;
      start++;
    }
    // update max if new longest is found
    max = Math.max(max, end - start + 1);
  }
  return max;
};

// Two test cases to run function on
console.log(characterReplacement("ABAB", 2)) // 4
console.log(characterReplacement("AABABBA", 1)) // 4