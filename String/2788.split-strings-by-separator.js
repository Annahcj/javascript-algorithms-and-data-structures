// 2788. Split Strings by Separator
// Given an array of strings words and a character separator, split each string in words by separator.
// Return an array of strings containing the new strings formed after the splits, excluding empty strings.
// Notes
  // separator is used to determine where the split should occur, but it is not included as part of the resulting strings.
  // A split may result in more than two strings.
  // The resulting strings must maintain the same order as they were initially given.


// Solution: Splitting

// Go through each word and split it by the separator.
// Return the array of each non-empty word after splitting.

// Time Complexity: O(n) 99ms
// Space Complexity: O(n) 48.3MB
var splitWordsBySeparator = function(words, separator) {
  let res = [];
  for (let word of words) {
    let split = word.split(separator);
    for (let w of split) {
      if (w.length > 0) res.push(w);
    }
  }  
  return res;
};

// Two test cases
console.log(splitWordsBySeparator(["one.two.three","four.five","six"], ".")) // ["one","two","three","four","five","six"]
console.log(splitWordsBySeparator(["$easy$","$problem$"], "$")) // ["easy","problem"]