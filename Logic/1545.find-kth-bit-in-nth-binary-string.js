// 1545. Find Kth Bit in Nth Binary String
// Given two positive integers n and k, the binary string S[n] is formed as follows:
  // S[1] = "0"
  // S[i] = S[i - 1] + "1" + reverse(invert(S[i - 1])) for i > 1
// Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).
// For example, the first four strings in the above sequence are:
  // S[1] = "0"
  // S[2] = "011"
  // S[3] = "0111001"
  // S[4] = "011100110110001"
// Return the kth bit in S[n]. It is guaranteed that k is valid for the given n.


// Solution: Logic

// Once we find the count of numbers on the same level as k, we can trace the digit down to the very first level (S1 = "0").
// On every level, all indices revolve around the middle index, which is always "1".
// For every level, reverse the current k into the first half of the sequence
// Keep track of how many times we have reversed k, as that determines how many inversions the digit has gone through.
// Repeat this until we:
  // 1. Reach a middle digit (always guaranteed to be "1") or 
  // 2. Reach the first level

// At the end, 
  // If the final k is a middle digit, return '0' if it should be inversed, otherwise '1'.
  // If the final k is 1, return '1' if it should be inversed, otherwise '0'.

// Example: n = 4, k = 11 (k = 10 when 0-indexed)
  //   0123456 7 8901234
  //   0111001_1_0110001 (15)
  // 1.            | (k = 10)
  // 2.    | (k = 4)
  // 3.  | (k = 2)
  // 4.| (k = 0)
  // We had 3 inversions, so we need to inverse '0' to '1'.

// Time Complexity: O(log(k)) 0ms
// Space Complexity: O(1) 48.1MB
function findKthBit(n, k) {
  k--;
  let levelCount = getLevelCount(k);
  let inverse = false;
  while (levelCount !== 1 && k !== Math.floor(levelCount / 2)) {
    inverse = !inverse;
    let half = Math.floor(levelCount / 2);
    let distFromMid = k - half;
    let inversedIndex = half - distFromMid;
    k = inversedIndex;
    levelCount = getLevelCount(k);
  }
  if (levelCount > 1 && k === Math.floor(levelCount / 2)) {
    return inverse ? '0' : '1';
  }
  return inverse ? '1' : '0';
};

// Find the count of numbers on the same level as k
function getLevelCount(k) {
  let count = 1;
  while (count < k + 1) {
    count = count * 2 + 1;
  }
  return count;
}

// Two test cases
console.log(findKthBit(3, 1)) // "0"
console.log(findKthBit(4, 11)) // "1"