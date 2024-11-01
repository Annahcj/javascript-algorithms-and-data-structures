// 1957. Delete Characters to Make Fancy String
// A fancy string is a string where no three consecutive characters are equal.
// Given a string s, delete the minimum possible number of characters from s to make it fancy.
// Return the final string after the deletion. It can be shown that the answer will always be unique.


// Solution: Array

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 73.6MB
function makeFancyString(s) {
  let n = s.length, fancy = [];
  for (let i = 0; i < n; i++) {
    if (fancy.length < 2 || s[i] !== fancy[fancy.length - 1] || fancy[fancy.length - 1] !== fancy[fancy.length - 2]) {
      fancy.push(s[i]);
    }
  }
  return fancy.join("");
};

// Two test cases
console.log(makeFancyString("leeetcode")) // "leetcode"
console.log(makeFancyString("aaabaaaa")) // "aabaa"