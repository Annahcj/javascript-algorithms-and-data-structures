// 2109. Adding Spaces to a String
// You are given a 0-indexed string s and a 0-indexed integer array spaces that describes the indices in the original string where spaces will be added. Each space should be inserted before the character at the given index.
// For example, given s = "EnjoyYourCoffee" and spaces = [5, 9], we place spaces before 'Y' and 'C', which are at indices 5 and 9 respectively. Thus, we obtain "Enjoy Your Coffee".
// Return the modified string after the spaces have been added.


// Solution: Two Pointers

// Set two pointers for s and spaces.
// When the pointer for s matches the pointer for spaces, add a space to the result, and increment the pointer for spaces.

// n = length of s
// Time Complexity: O(n) 311ms
// Space Complexity: O(1) (not including output) 95.6MB
var addSpaces = function(s, spaces) {
  let res = "", idx = 0;
  for (var i = 0; i < s.length; i++) {
    if (spaces[idx] === i) {
      res += ' ' + s[i];
      idx++;
    } else {
      res += s[i];
    }
  }  
  return res;
};

// Two test cases to run function on
console.log(addSpaces("LeetcodeHelpsMeLearn", [8,13,15])) // "Leetcode Helps Me Learn"
console.log(addSpaces("icodeinpython", [1,5,7,9])) // "i code in py thon"