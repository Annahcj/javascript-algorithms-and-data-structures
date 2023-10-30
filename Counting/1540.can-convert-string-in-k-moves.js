// 1540. Can Convert String in K Moves
// Given two strings s and t, your goal is to convert s into t in k moves or less.
// During the ith (1 <= i <= k) move you can:
  // Choose any index j (1-indexed) from s, such that 1 <= j <= s.length and j has not been chosen in any previous move, and shift the character at that index i times.
  // Do nothing.
// Shifting a character means replacing it by the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Shifting a character by i means applying the shift operations i times.
// Remember that any index j can be picked at most once.
// Return true if it's possible to convert s into t in no more than k moves, otherwise return false.


// Solution: Counting & Logic

// Keep counts of distances where count[dist] = count of letters with this distance.
// An important note is that we can only shift an index j at most once.
// For each distance, if there are multiple characters with the same distance, we can shift them (dist, dist + 26, dist + 26 + 26, ...) number of times to shift them to the right character.
  // We need different shift amounts since we can only use the ith operation on one character.

// If the maximum shift amount is <= k, it is possible to convert s into t.

// Time Complexity: O(n) 148ms
// Space Complexity: O(1) 47.9MB
var canConvertString = function(s, t, k) {
  if (s.length !== t.length) return false;
  let count = Array(26).fill(0), n = s.length;
  for (let i = 0; i < n; i++) {
    let dist = getDist(s[i], t[i]);
    if (dist > 0) count[dist]++;
  }

  let maxShift = 0;
  for (let dist = 0; dist < 26; dist++) {
    let pow = 0;
    for (let i = 0; i < count[dist]; i++) {
      maxShift = Math.max(maxShift, dist + pow);
      pow += 26;
    }
  }
  return maxShift <= k;
};

function getDist(char1, char2) {
  let charcode1 = char1.charCodeAt(), charcode2 = char2.charCodeAt();
  if (charcode1 > charcode2) charcode2 += 26;
  return charcode2 - charcode1;
}

// Two test cases
console.log(canConvertString("input", "ouput", 9)) // true
console.log(canConvertString("abc", "bcd", 10)) // false