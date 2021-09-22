// 28. Implement strStr()
// Implement strStr().
// Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
// Clarification:
// What should we return when needle is an empty string? This is a great question to ask during an interview.
// For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().


// Solution: Brute Force

// Try to find needle from every position in haystack
// Optimization: change outer loop to i < haystack.length - needle.length + 1, so that we don't loop unnecessarily when needle.length is longer than the remaining haystack.length

// m = length of haystack, n = length of needle
// Time Complexity: O(nm) 1108ms
// Space Complexity: O(1) 40.5MB
var strStr = function(haystack, needle) {
  if (!needle.length) return 0;
  for (var i = 0; i < haystack.length - needle.length + 1; i++) {
    for (var j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) break;
      if (j === needle.length - 1) return i;
    }
  }
  return -1;
};

// Four test cases to run function on
console.log(strStr("aaa", "aaaa")) // -1
console.log(strStr("hello", "ll")) // 2
console.log(strStr("aaaaa", "bba")) // -1
console.log(strStr("", "")) // 0