// 3211. Generate Binary Strings Without Adjacent Zeros
// You are given a positive integer n.
// A binary string x is valid if all substrings of x of length 2 contain at least one "1".
// Return all valid strings with length n, in any order.


// Solution: Enumeration

// Use enumeration to generate all strings of length n, level by level from length 1 to length n.
// For each round, 
  // Keep track of the strings with length i - 1.
  // Go through every string with length i - 1 and generate up to two new strings appending either 0 or 1. 
  // Note: We can only append 0 if the last character of the string is not 0, since there can't be two consecutive 0s.

// Time Complexity: O(n * 2^n) 68ms
// Space Complexity: O(2^n) 54.5MB
function validStrings(n) {
  let prev = ["0", "1"];
  for (let i = 2; i <= n; i++) {
    let curr = [];
    for (let prevStr of prev) {
      if (prevStr[prevStr.length - 1] !== '0') {
        curr.push(prevStr + '0');
      }
      curr.push(prevStr + '1');
    }
    prev = curr;
  }
  return prev;
};

// Two test cases
console.log(validStrings(3)) // ["010","011","101","110","111"]
console.log(validStrings(1)) // ["0","1"]