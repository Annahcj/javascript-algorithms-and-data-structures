// 2839. Check if Strings Can be Made Equal With Operations I
// You are given two strings s1 and s2, both of length 4, consisting of lowercase English letters.
// You can apply the following operation on any of the two strings any number of times:
  // Choose any two indices i and j such that j - i = 2, then swap the two characters at those indices in the string.
// Return true if you can make the strings s1 and s2 equal, and false otherwise.


// Solution: Logic

// Being able to swap indices where j - i = 2 means we can sort all the characters at even indices, and we can sort all the characters at odd indices.
// Compare the character counts of the even indices in s1 and s2.
// Compare the character counts of the odd indices in s1 and s2.

// Follow up: If the length of the strings are longer, then we can store and compare the character counts at even and odd indices between s1 and s2.

// Time Complexity: O(1) 66ms
// Space Complexity: O(1) 43.4MB
var canBeEqual = function(s1, s2) {
  let evenIndicesEqual = (s1[0] === s2[0] && s1[2] === s2[2]) || (s1[0] === s2[2] && s1[2] === s2[0]);
  let oddIndicesEqual = (s1[1] === s2[1] && s1[3] === s2[3]) || (s1[1] === s2[3] && s1[3] === s2[1]);
  return evenIndicesEqual && oddIndicesEqual;
};

// Two test cases
console.log(canBeEqual("abcd", "cdab")) // true
console.log(canBeEqual("abcd", "dacb")) // false