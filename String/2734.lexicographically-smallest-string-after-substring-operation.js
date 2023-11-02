// 2734. Lexicographically Smallest String After Substring Operation
// You are given a string s consisting of only lowercase English letters. In one operation, you can do the following:
  // Select any non-empty substring of s, possibly the entire string, then replace each one of its characters with the previous character of the English alphabet. For example, 'b' is converted to 'a', and 'a' is converted to 'z'.
// Return the lexicographically smallest string you can obtain after performing the above operation exactly once.
// A substring is a contiguous sequence of characters in a string.
// A string x is lexicographically smaller than a string y of the same length if x[i] comes before y[i] in alphabetic order for the first position i such that x[i] != y[i].


// Solution: Find First Substring Without 'a'

// Find the first substring with no 'a's.
// Convert each character in the substring to the previous character
// Edge case: If all characters are 'a', it is optimal to convert the last character to 'z'.

// Time Complexity: O(n) 274ms
// Space Complexity: O(n) 92.4MB
var smallestString = function(s) {
  let n = s.length, arr = s.split("");
  for (let i = 0; i < n; i++) {
    if (s[i] !== 'a') {
      let start = i, end = i;
      while (end < n && s[end] !== 'a') end++;
      return convert(arr, start, end)
    }
  }
  arr[n - 1] = 'z';
  return arr.join("");
};

function convert(arr, start, end) {
  for (let i = start; i < end; i++) {
    let prev = String.fromCharCode(arr[i].charCodeAt() - 1);
    arr[i] = prev;
  }
  return arr.join("");
}

// Three test cases
console.log(smallestString("cbabc")) // "baabc"
console.log(smallestString("acbbc")) // "abaab"
console.log(smallestString("leetcode")) // "kddsbncd"