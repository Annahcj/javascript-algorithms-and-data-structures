// 2516. Take K of Each Character From Left and Right
// You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.
// Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.


// Solution: Sliding Window

// Instead of taking characters on the left and right side, try to take the maximum window in the center (the part we will not be taking).
// Maintain a sliding window of characters where each character count does not exceed count[i] - k.
  // Keep moving the right pointer forward.
  // When the character count exceeds count[i] - k, move the left pointer up.

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 44.6MB
var takeCharacters = function(s, k) {
  if (k === 0) return 0;
  let n = s.length, count = Array(3).fill(0);
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 97;
    count[charcode]++;
  }
  for (let i = 0; i < 3; i++) {
    if (count[i] < k) return -1; // not enough characters in the entire string
  }
  
  let currCount = Array(3).fill(0), ans = n;
  for (let j = 0, i = 0; j < n; j++) {
    let charcode = s.charCodeAt(j) - 97;
    currCount[charcode]++;
    while (currCount[charcode] > count[charcode] - k) { // window contains more than count[charcode] - k of a character, move left pointer up
      currCount[s.charCodeAt(i) - 97]--;
      i++;
    }
    let windowSize = j - i + 1;
    ans = Math.min(ans, n - windowSize);
  }
  return ans;
};

// Two test cases
console.log(takeCharacters("aabaaaacaabc", 2)) // 8
console.log(takeCharacters("a", 1)) // -1