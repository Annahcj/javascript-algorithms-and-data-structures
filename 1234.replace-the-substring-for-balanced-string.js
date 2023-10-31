// 1234. Replace the Substring for Balanced String
// You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', and 'R'.
// A string is said to be balanced if each of its characters appears n / 4 times where n is the length of the string.
// Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0.


// Solution: Sliding Window

// Count the occurances of each character, and count the number of characters with occurances exceeding n / 4.
// Maintain a sliding window where the count of characters outside the window are always less than or equal to n / 4.
// Keep track of two pointers:
  // j: The right pointer which iterates through s.
  // i: The left pointer, which will be moved up while the count of characters exceeding n / 4 is 0.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 44MB
var balancedString = function(s) {
  let count = {}, charsExceeding = 0, n = s.length;
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
    if (count[char] === (n / 4) + 1) charsExceeding++;
  }
  let minLen = n;
  for (let j = 0, i = 0; j < n; j++) {
    count[s[j]]--;
    if (count[s[j]] === n / 4) charsExceeding--;
    
    while (i <= j && charsExceeding === 0) {
      minLen = Math.min(minLen, j - i + 1);
      count[s[i]]++;
      if (count[s[i]] === (n / 4) + 1) charsExceeding++;
      i++;
    }
    if (charsExceeding === 0) minLen = Math.min(minLen, j - i + 1);
  }
  return minLen;
};

// Three test cases
console.log(balancedString("QWER")) // 0
console.log(balancedString("QQWE")) // 1
console.log(balancedString("QQQW")) // 2