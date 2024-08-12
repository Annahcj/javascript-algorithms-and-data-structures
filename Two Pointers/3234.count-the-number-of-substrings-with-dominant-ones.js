// 3234.count-the-number-of-substrings-with-dominant-ones.js
// 3234. Count the Number of Substrings With Dominant Ones
// You are given a binary string s.
// Return the number of substrings with dominant ones.
// A string has dominant ones if the number of ones in the string is greater than or equal to the square of the number of zeros in the string.


// Solution: Two Pointers

// There can be at most sqrt(n) zeros in a valid substring.

// Anchor the right pointer j (increment from 0 to n - 1), while keeping track of the current indices of zeros.
// For each index j, loop through all indices of zeros on the left of j up to sqrt(n), and count the number of substrings with at least as many ones as zeros squared.
// Given two adjacent indices of zeros, we know the number of ones in between, and can calculate how many substrings have enough ones.

// Different cases we need to consider:
  // 1. When we don't have enough ones in a substring, no substrings can be made.
  // 2. When all the ones we need are not on the left of the leftmost zero, we can only make one substring: e.g. "011"
  // 3. When there are ones we need on the left of the leftmost zero, we can make multiple substrings starting at different ones on the left: e.g. "11011".
  // 4. There are no zeros in the substring, we can take as many substrings as there are ones.

// Time Complexity: O(n sqrt(n)) 393ms
// Space Complexity: O(n) 55.4MB
var numberOfSubstrings = function(s) {
  let n = s.length, zeros = [], substrings = 0;
  for (let i = 0; i < n; i++) {
    let totalOnes = 0;
    if (s[i] === '0') zeros.push(i);
    for (let j = zeros.length; j >= Math.max(0, zeros.length - Math.sqrt(n)); j--) {
      let prevZero = j === 0 ? -1 : zeros[j - 1];
      let onesInBetween = (j === zeros.length ? i + 1 : zeros[j]) - prevZero - 1;
      let zerosInSubstring = zeros.length - j;
      let minimumOnes = zerosInSubstring ** 2;
      totalOnes += onesInBetween;
      // we have `onesInBetween` ones on the left of the leftmost zero, at which we can place the left pointer.
      // if the ones we currently have < minimum ones we need, then no substrings can be made.
      // totalOnes - minimumOnes = the number of ones we can optionally not include in our substring.
      // however, the left pointer of the substring cannot be greater than the leftmost zero, hence we need to take the minimum of (totalOnes - minimumOnes, ones on the left of the leftmost zero); 
      // edge case: "111", where there are no zeros in the substring, then totalOnes - minimumOnes + 1 is counting the empty string case, so: (zerosInSubstring === 0 ? 0 : 1)
      substrings += Math.max(0, Math.min(totalOnes - minimumOnes + (zerosInSubstring === 0 ? 0 : 1), onesInBetween + 1));
    }
  }
  return substrings;
};

// Two test cases
console.log(numberOfSubstrings("00011")) // 5 
console.log(numberOfSubstrings("101101")) // 16