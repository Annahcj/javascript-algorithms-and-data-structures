// 686. Repeated String Match
// Given two strings a and b, return the minimum number of times you should repeat string a so that string b is a substring of it. If it is impossible for b​​​​​​ to be a substring of a after repeating it, return -1.


// Solution 1: Built-in Function Includes

// 1. Make a the same length or greater length than b
// 2. Check whether b is a substring in a, if it is, return the repeat count.
// 3. Otherwise, add a to the string 1 more time and check again.

// Proof that two times is enough:
  // The worst case scenario: a = "abcde", b = "eabcdeab"
  // Make a the same length or greater length than b: "abcdeabcde"
  // b is not a substring of a, so we add a 1 more time: "abcdeabcdeabcde"
  // now b is a substring of a, because all starting positions will be covered.

// n = length of a, m = length of b
// Time Complexity: O(nm) 68ms
// Space Complexity: O(n) 44.2MB 
var repeatedStringMatch = function(a, b) {
  let repeat = 1, str = a;
  while (str.length < b.length) {
    str += a;
    repeat++;
  }
  if (str.includes(b)) return repeat;
  str += a;
  return str.includes(b) ? repeat + 1 : -1;
};


// Solution 2: KMP Algorithm

// The same approach as solution 1, except we use the KMP algorithm instead of the built-in includes method.
// The includes method takes O(nm), whereas the KMP algorithm takes O(n + m) time.

// Time Complexity: O(n + m) 115ms
// Space Complexity: O(m) 46.4MB
var repeatedStringMatch = function(a, b) {
  let lps = getLPS(b), repeat = 1, str = a;
  while (str.length < b.length) {
    str += a;
    repeat++;
  }
  if (kmp(str, b)) return repeat;
  str += a;
  return kmp(str, b) ? repeat + 1 : -1;
  
  function kmp(str, pattern) {
    let n = str.length, m = pattern.length;
    let j = 0;
    for (let i = 0; i < n; i++) {
      while (j > 0 && str[i] !== pattern[j]) j = lps[j - 1];
      if (str[i] === pattern[j]) j++;
      if (j === m) return true;
    }
    return false;
  }
  
  function getLPS(str) {
    let n = str.length, lps = Array(n).fill(0);
    let i = 0;
    for (let j = 1; j < n; j++) {
      while (i > 0 && str[i] !== str[j]) i = lps[i - 1];
      if (str[i] === str[j]) lps[j] = ++i;
    }
    return lps;
  }
};

// Three test cases to run function on
console.log(repeatedStringMatch("abcd", "cdabcdab")) // 3
console.log(repeatedStringMatch("aaaaaaaaaaaaaaaaaaaaaab", "ba")) // 2
console.log(repeatedStringMatch("baaabbbaba", "baaabbbababaaabbbababaaabbbababaaabbbababaaabbbababaaabbbababaaabbbababaaabbbababaaabbbababaaabbbaba")) // 10