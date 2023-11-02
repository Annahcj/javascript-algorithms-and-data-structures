// 2716. Minimize String Length
// Given a 0-indexed string s, repeatedly perform the following operation any number of times:
  // Choose an index i in the string, and let c be the character in position i. Delete the closest occurrence of c to the left of i (if any) and the closest occurrence of c to the right of i (if any).
// Your task is to minimize the length of s by performing the above operation any number of times.
// Return an integer denoting the length of the minimized string.


// Solution: Count Distinct Chars

// We will always one occurrance of a character left in the final string.
// Count the number of distinct characters by storing the characters in a hashset.

// Time Complexity: O(n) 139ms
// Space Complexity: O(1) 59.6MB (there are at most 26 distinct characters)
var minimizedStringLength = function(s) {
  let unique = new Set();  
  for (let char of s) {
    unique.add(char);
  }
  return unique.size;
};

// Three test cases
console.log(minimizedStringLength("aaabc")) // 3
console.log(minimizedStringLength("cbbd")) // 3
console.log(minimizedStringLength("dddaaa")) // 2