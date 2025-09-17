// 3677. Count Binary Palindromic Numbers
// You are given a non-negative integer n.
// A non-negative integer is called binary-palindromic if its binary representation (written without leading zeros) reads the same forward and backward.
// Return the number of integers k such that 0 <= k <= n and the binary representation of k is a palindrome.
// Note: The number 0 is considered binary-palindromic, and its representation is "0".


// Solution: Bit Manipulation

// Try every combination of up to d/2 digits, flip it and append it to get a palindrome and check if it's smaller than n.

// For numbers with less bits than n, we don't need to check whether it's smaller than n.
// For each i from 1 to floor(d / 2), generate the halves of palindromes: 2^(i - 1).
  // For odd lengthed palindromes: 2^(i - 1)
  // For even lengthed palindromes: 2^(i - 1)
    // Note: At exactly half length (d/2), only count the palindromes if n has an odd number of bits.

// For numbers with the same number of bits as n,
// iterate over each bit starting from the leftmost one, and count the number of combinations.

// At each bit, 
  // If the bit is 1, 
    // Count all combinations with current bit as 0 and the rest of the bits on the right can be anything: 2^i.
    // For the current bit as 1, we move that calculation to the next bit as we need to exclude larger numbers.
  // If the bit is 0, do not count any combinations and move on to the next bit.

// e.g. 101101
  // _1_01101: Even though bit is 1, we cannot add any combinations as there cannot be leading zeros.
  // 1_0_1101: Do not add any combinations.
  // 10_1_101: Add 2^3 combinations for the case where the bit is 0, remaining can be anything.
    // Combinations (prefix remains the same, combinations are only for the remaining part).
      // 100_000
      // 100_001
      // 100_010
      // 100_011
      // 100_100
      // 100_101
      // 100_110
      // 100_111
  // 1011_0_1: Do not add any combinations.
  // 10110_1_: Add 2^0 combinations (101100).

// Lastly, we need to account for the last case where the first half of n becomes symmetrical with the second half.
// Iterate over n bit-by-bit and check if the symmetrical palindrome will be greater or less than n, which determines whether we have one more palindrome or not.

// Time Complexity: O(log(n)) 6ms
// Space Complexity: O(1) 57MB
function countBinaryPalindromes(n) {
  if (n === 0) {
    return 1;
  }
  const d = n.toString(2).length;
  let palindromes = 1; // "0"
  for (let i = 1; i <= Math.floor(d / 2); i++) {
    palindromes += 2 ** (i - 1); // odd lengthed, excluding those with leading zeros
    // at exactly half length, only add if n has an odd number of digits
    if (i < Math.floor(d / 2) || d % 2 === 1) {
      palindromes += 2 ** (i - 1); // even lengthed, excluding those with leading zeros
    }
  }  
  const half = Math.floor(d / 2);
  n = BigInt(n);
  for (let i = d - 1; i >= half; i--) {
    if (((n >> BigInt(i)) & 1n) && i !== d - 1) {
      palindromes += 2 ** (i - half);
    }
  }
  // for the last palindrome (with same first half as n), we need to check if the second half is smaller when the first half is flipped
  for (let i = half - 1; i >= 0; i--) {
    const currentBit = (n >> BigInt(i)) & 1n;
    const symmetricalBit = (n >> BigInt(d - i - 1)) & 1n;
    if (symmetricalBit > currentBit) {
      return palindromes; // 1100 -> 111_ > 1100
    } else if (symmetricalBit < currentBit) {
      return palindromes + 1; // 1010 -> 100_ < 1010
    }
  }
  // equal to n
  return palindromes + 1;
};

// Two test cases
console.log(countBinaryPalindromes(9)) // 6
console.log(countBinaryPalindromes(0)) // 1