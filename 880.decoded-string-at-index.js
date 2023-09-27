// 880. Decoded String at Index
// You are given an encoded string s. To decode the string to a tape, the encoded string is read one character at a time and the following steps are taken:
  // If the character read is a letter, that letter is written onto the tape.
  // If the character read is a digit d, the entire current tape is repeatedly written d - 1 more times in total.
// Given an integer k, return the kth letter (1-indexed) in the decoded string.


// Solution: Store Lengths

// Store the length of the decoded string at each s[i]. The decoded length takes into account repetition.
  // lengths[i] = length of the decoded string ending at s[i].

// Go through the decoded lengths from right to left.
// If lengths[i] <= k, this means there was some reptition for the kth letter, and we can reduce k to k % lengths[i] in order to find the original non-repeated string.
// If k is 0 and s[i] is a character, that means we have found the character at the original non-repeated string.

// e.g: "leet2code3", k = 7
  // lengths: [1,2,3,4,8,9,10,11,12,36]
  // Significant indices:
    // i = 3, lengths[i] = 4: k % lengths[i] = 7 % 4 = 3
    // i = 2, lengths[i] = 3: k % lengths[i] = 3 % 3 = 0
      // since k is 0 and s[2] is "e", we can return "e".

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 42.1MB
var decodeAtIndex = function(s, k) {
  let n = s.length, decodedLen = 0, lengths = Array(n);
  for (let i = 0; i < n; i++) {
    if (isNumber(s[i])) {
      decodedLen *= Number(s[i]);
    } else {
      decodedLen++;
    }
    lengths[i] = decodedLen;
  }
  for (let i = n - 1; i >= 0; i--) {
    if (lengths[i] <= k) k = k % lengths[i];
    if (k === 0 && !isNumber(s[i])) {
      return s[i];
    }
  }
};
  
function isNumber(char) {
  return !isNaN(Number(char));
}

// Three test cases
console.log(decodeAtIndex("leet2code3", 10)) // "o"
console.log(decodeAtIndex("ha22", 5)) // "h"
console.log(decodeAtIndex("a2345678999999999999999", 1)) // "a"