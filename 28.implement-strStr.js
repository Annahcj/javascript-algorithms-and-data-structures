// 28. Implement strStr()
// Implement strStr().
// Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
// Clarification:
// What should we return when needle is an empty string? This is a great question to ask during an interview.
// For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().


// Solution 1: Brute Force

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

// Solution 2: KMP Algorithm

// Time Complexity: O(n + m) 72ms
// Space Complexity: O(m) 40.3MB
var strStr = function(haystack, needle) {
  let n = haystack.length, m = needle.length;
  if (m === 0) return 0;
  // lps[i] = last best index at which to start matching again
  let lps = computeLPS(needle);
  let i = 0, j = 0;
  while (i < n) {
    if (haystack[i] === needle[j]) {
      // if they match, move both pointers forward
      i++, j++;
      if (j === m) return i - m;
    } else {
      // if j is not 0, set j to the last best index -> lps[j - 1]
      if (j > 0) j = lps[j - 1];
      // otherwise move i forward
      else i++;
    }
  }
  return -1;

  function computeLPS(str) {
    // initiate lps (longest prefix substring) with 0's 
    let lps = Array(str.length).fill(0);
    let pre = 0, suff = 1;
    while (suff < str.length) {
      if (str[pre] === str[suff]) {
        // if they match, set lps[suff] to pre (will always be one more than pre since that is the index at which we start to match again)
        // move both pointers forward
        pre++;
        lps[suff] = pre;
        suff++;
      } else {
        if (pre !== 0) {
          // try to match at the last best, viable position
          pre = lps[pre - 1];
        } else {
          // otherwise both suff forward
          suff++;
        }
      }
    }
    return lps;
  }
};

// Four test cases to run function on
console.log(strStr("aaa", "aaaa")) // -1
console.log(strStr("hello", "ll")) // 2
console.log(strStr("aaaaa", "bba")) // -1
console.log(strStr("", "")) // 0