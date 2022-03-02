// 214. Shortest Palindrome
// You are given a string s. You can convert s to a palindrome by adding characters in front of it.
// Return the shortest palindrome you can find by performing this transformation.


// Solution 1: Brute Force w/ Two Pointers

// Find the longest existing palindrome which starts at index 0. 
  // Try each index as the center of a palindrome and expand outwards using two pointers.
  // When a valid palindrome is found, reverse the remaining part of s and add it as the front substring.

// Time Complexity: O(n^2) 592ms
// Space Complexity: O(1) 45MB
var shortestPalindrome = function(s) {
  let n = s.length;
  if (n <= 1) return s;
  let mid = Math.floor((n - 1) / 2);
  for (let i = mid; i >= 0; i--) {
    let left = i, right = i + 1;
    // palindrome can have 1 middle or 2 middles.
    let best = Math.max(isPalindrome(left, left), isPalindrome(left, right));
    if (best === -1) continue;
    // build the front substring when the longest existing palindrome is found
    let front = "";
    for (let j = n - 1; j >= best; j--) front += s[j];
    return front + s;
  }
  
  function isPalindrome(left, right) {
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--, right++; // expand from middle
    }
    return left === -1 ? right : -1; // return the start index of the remaining substring
  }
};


// Solution 2: KMP Algorithm

// Use the LPS table from the KMP algorithm.
// Since the problem is to find the longest palindrome starting from index 0, we can turn the string into s#reverse(s).
// In other words, 'aaab' becomes 'aaab#baaa'.
// Since the LPS is finding suffixes equal to the prefix, it is a perfect match for this problem.

// LPS table for 'aaab#baaa': [0,1,2,0,0,0,1,2,3].
// Since the longest palindrome must start from index 0, the length of the longest match would be at lps[lps.length - 1], which is 3.
// Knowing this, we can construct the answer as reverse(substring starting at 3) + s -> 'baaab'

// Time Complexity: O(n) 113ms
// Space Complexity: O(n) 45.2MB
var shortestPalindrome = function(s) {
  let lps = getLPS(s + '#' + getReverse(s));
  let front = getReverse(s.slice(lps[lps.length - 1]));
  return front + s;
  
  function getLPS(str) {
    let n = str.length, lps = Array(n).fill(0);
    let i = 0;
    for (let j = 1; j < n; j++) {
      while (i > 0 && str[i] !== str[j]) i = lps[i - 1]; // rollback
      if (str[i] === str[j]) {
        i++;
        lps[j] = i;
      }
    }
    return lps;
  }
  
  function getReverse(s) {
    let res = "";
    for (let i = s.length - 1; i >= 0; i--) res += s[i];
    return res;
  }
};

// Two test cases to run function on
console.log(shortestPalindrome("aacecaaa")) // "aaacecaaa"
console.log(shortestPalindrome("abcd")) // "dcbabcd"