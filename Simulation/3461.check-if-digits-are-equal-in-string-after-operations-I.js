// 3461. Check If Digits Are Equal in String After Operations I
// You are given a string s consisting of digits. Perform the following operation repeatedly until the string has exactly two digits:
  // For each pair of consecutive digits in s, starting from the first digit, calculate a new digit as the sum of the two digits modulo 10.
  // Replace s with the sequence of newly calculated digits, maintaining the order in which they are computed.
// Return true if the final two digits in s are the same; otherwise, return false.


// Solution: Simulation

// n = length of s
// Time Complexity: O(n^2) 9ms
// Space Complexity: O(n) 56MB
function hasSameDigits(s) {
  s = s.split("").map(Number);
  while (s.length > 2) {
    for (let i = 0; i < s.length - 1; i++) {
      s[i] = (s[i] + s[i + 1]) % 10;
    }
    s.pop();
  }
  return s[0] === s[1];
};

// Two test cases
console.log(hasSameDigits("3902")) // true
console.log(hasSameDigits("34789")) // false