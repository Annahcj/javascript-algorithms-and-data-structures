// 3325. Count Substrings With K-Frequency Characters I
// Given a string s and an integer k, return the total number of substrings of s where at least one character appears at least k times.


// Solution: Sliding Window

// Maintain a minimum-lengthed sliding window with one character appearing k times.
// Keep track of:
  // The count of occurances of each character
  // The count of characters that have appeared at least k times
// The right pointer moves up incrementally, move up the left pointer while there is at least one k-frequency character.
// For every index j, count the number of substrings ending at index j: i + 1 (all substrings that extend the current window are also valid if the current window is valid).

// n = length of s
// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 51.7MB
function numberOfSubstrings(s, k) {
  let n = s.length, charCount = Array(26).fill(0);
  let kFreq = 0, substrings = 0;
  for (let j = 0, i = 0; j < n; j++) {
    charCount[s.charCodeAt(j) - 97]++;
    if (charCount[s.charCodeAt(j) - 97] === k) {
      kFreq++;
    }
    while (kFreq >= 1) {
      if (kFreq === 1 && charCount[s.charCodeAt(i) - 97] === k) break; // can't remove s[i] because without it there are no characters that appear at least k times
      if (charCount[s.charCodeAt(i) - 97] === k) {
        kFreq--;
      }
      charCount[s.charCodeAt(i) - 97]--;
      i++;
    }
    if (kFreq === 1) {
      substrings += i + 1;
    }
  }
  return substrings;
};

// Two test cases
console.log(numberOfSubstrings("abacb", 2)) // 4
console.log(numberOfSubstrings("abcde", 1)) // 15