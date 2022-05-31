// 1461. Check If a String Contains All Binary Codes of Size K
// Given a binary string s and an integer k, return true if every binary code of length k is a substring of s. Otherwise, return false.


// Solution: Rolling Hash w/ Bit Manipulation & Hashset

// There should be exactly 2^k combinations of binary codes: There are two choices at each location, so (2 * 2 * 2 * ...) k times.
// Represent the current number with a bitmask.
// Maintain a sliding window of size k, when the window becomes bigger than k, shift out the i - kth bit.
  // Use the XOR operator to turn a 1 bit into 0 if the s[i - k] is 1.
// At each iteration, shift all the bits left 1.
// Use a set to keep track of unique numbers, if the size of the set is exactly 2^k, return true.

// Time Complexity: O(n) 214ms
// Space Complexity: O(2^k) 58.6MB
var hasAllCodes = function(s, k) {
  let set = new Set(), num = 0;
  for (let i = 0; i < s.length; i++) {
    let bit = Number(s[i]);
    num = num | bit;
    if (i >= k) { // shift out i - kth bit
      let prevBit = Number(s[i - k]);
      if (prevBit) num = num ^ (1 << k); 
    }
    if (i >= k - 1) set.add(num);
    num <<= 1; // shift all bits left
  }
  return set.size === 2 ** k;
};

// Three test cases to run function on
console.log(hasAllCodes("00110110", 2)) // true
console.log(hasAllCodes("0110", 1)) // true
console.log(hasAllCodes("0110", 2)) // false