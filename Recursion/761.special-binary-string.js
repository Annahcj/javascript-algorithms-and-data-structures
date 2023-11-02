// 761. Special Binary String
// Special binary strings are binary strings with the following two properties:
  // The number of 0's is equal to the number of 1's.
  // Every prefix of the binary string has at least as many 1's as 0's.
// You are given a special binary string s.
// A move consists of choosing two consecutive, non-empty, special substrings of s, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.
// Return the lexicographically largest resulting string possible after applying the mentioned operations on the string.


// Solution: Recursion

// The rules of a special binary string actually are identical to a valid parenthesis.
// We can approach this problem as if we are looking at valid parenthesis.

// We can use recursion to group the valid parenthesis and sort them in descending order.
// Since two strings must be consecutive to swap them, that means that any special substrings in the same level can be swapped into descending order.

// Time Complexity: O(n^2) 61ms
// Space Complexity: O(n) 45.4MB
var makeLargestSpecial = function(s) {
  return recurse(s);
  
  function recurse(s) {
    let i = 0, res = [], bal = 0;
    for (let j = 0; j < s.length; j++) {
      if (s[j] === '1') bal++;
      else bal--;
      if (bal === 0) { // found a balanced special substring
        res.push('1' + recurse(s.slice(i + 1, j)) + '0'); // s[i] must be 1 and s[j] must be 0, if 1...1, it would be invalid.
        i = j + 1; // go to next start position
      }
    }
    res.sort((a, b) => b.localeCompare(a)); // sort in desc order
    return res.join(""); 
  }
};

// Two test cases to run function on
console.log(makeLargestSpecial("11011000")) // "11100100"
console.log(makeLargestSpecial("10")) // "10"