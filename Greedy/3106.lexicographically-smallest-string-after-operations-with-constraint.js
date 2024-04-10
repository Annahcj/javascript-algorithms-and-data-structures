// 3106. Lexicographically Smallest String After Operations With Constraint
// You are given a string s and an integer k.
// Define a function distance(s1, s2) between two strings s1 and s2 of the same length n as:
  // The sum of the minimum distance between s1[i] and s2[i] when the characters from 'a' to 'z' are placed in a cyclic order, for all i in the range [0, n - 1].
// For example, distance("ab", "cd") == 4, and distance("a", "z") == 1.
// You can change any letter of s to any other lowercase English letter, any number of times.
// Return a string denoting the lexicographically smallest string t you can get after some changes, such that distance(s, t) <= k.


// Solution: Greedy

// For each character in s, get the lexicographically smallest character for the operations we have left.
// We can take characters in two directions due to the cyclic order.
  // Taking a character on the right: 'z' -> 'a' = 1 operation
  // Taking a character on the left: 'c' -> 'b' = 1 operation 
// Using less operations can result in a smaller character, so if this is the case, take the smaller character.

// Time Complexity: O(n) 63ms
// Space Complexity: O(1) (excluding output) 51.1MB
var getSmallestString = function(s, k) {
  let n = s.length, ans = "";
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 97;
    let plus = charcode + k >= 26 ? 0 : charcode + k;
    let minus = charcode - k < 0 ? 0 : charcode - k;
    if (plus < minus) {
      ans += String.fromCharCode(plus + 97);
      k -= getDist(charcode, plus);
    } else {
      ans += String.fromCharCode(minus + 97);
      k -= getDist(charcode, minus);
    }
  }
  return ans;
};
  
function getDist(code1, code2) {
  if (code2 < code1) return getDist(code2, code1);
  return Math.min(code1 + 26 - code2, code2 - code1);
}

// Three test cases
console.log(getSmallestString("zbbz", 3)) // "aaaz"
console.log(getSmallestString("xaxcd", 4)) // "aawcd"
console.log(getSmallestString("lol", 0)) // "lol"