// 791. Custom Sort String
// order and str are strings composed of lowercase letters. In order, no letter occurs more than once.
// order was sorted in some custom order previously. We want to permute the characters of str so that they match the order that order was sorted. More specifically, if x occurs before y in order, then x should occur before y in the returned string.
// Return any permutation of str (as a string) that satisfies this property.


// Solution: Assign Order Index & Sort

// 1. Assign an index for each lowercase character based on the order it appears in `order`. 
  // Characters that don't appear in `order` will be given an index of -1.
// 2. Sort s based on the order indexes.

// n = length of s
// Time Complexity: O(n log(n)) 50ms
// Space Complexity: O(n) 48.7MB
var customSortString = function(order, s) {
  let indexes = Array(26).fill(-1);
  for (let i = 0; i < order.length; i++) {
    indexes[order.charCodeAt(i) - 97] = i;
  }
  return s.split("").sort((a, b) => indexes[a.charCodeAt() - 97] - indexes[b.charCodeAt() - 97]).join("");
};

// Three test cases 
console.log(customSortString("cba", "abcd")) // "cbad"
console.log(customSortString("acb", "ccaabb")) // "aaccbb"
console.log(customSortString("zyxwvutsrqponmlkjihgfedcba", "abcdefghijklmnopqrstuvwxyz")) // "zyxwvutsrqponmlkjihgfedcba"