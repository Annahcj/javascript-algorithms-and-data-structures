// 5. Longest Palindromic Substring
// Given a string s, return the longest palindromic substring in s.


// Solution 1: Expand Around Centers

// Take each index i as the center of a palindrome.
// To check the length of the palindrome, expand outwards from the center using two pointers.

// Time Complexity: O(n^2) 77ms
// Space Complexity: O(n) 43.9MB
var longestPalindrome = function(s) {
  let start = 0, end = 0;
  for (let i = 1; i < s.length; i++) {
    let lengthEven = maxPalindromeLength(i - 1, i);
    if (lengthEven > end - start + 1) {
      let halfLen = lengthEven / 2;
      start = i - halfLen, end = i + halfLen - 1;
    }

    let lengthOdd = maxPalindromeLength(i, i);
    if (lengthOdd > end - start + 1) {
      let halfLen = Math.floor(lengthOdd / 2);
      start = i - halfLen, end = i + halfLen;
    }
  }
  return s.slice(start, end + 1);
  
  function maxPalindromeLength(start, end) {
    if (s[start] !== s[end]) return 0;
    while (start > 0 && end < s.length - 1 && s[start - 1] === s[end + 1]) {
      start--, end++;
    }
    return end - start + 1;
  }  
};


// Solution 2: Manacher's Algorithm

// Use Manacher's algorithm to find the length of each odd and even-lengthed palindrome. m[i] = the length of the palindrome centered at index i.

// For even-lengthed palindromes, add a '#' at the start and end of the string and in between every character.
// Then, perform the same algorithm for an odd-lengthed palindrome.
// e.g: "abacaba" -> "#a#b#a#c#a#b#a#", m = [1,2,1,4,1,2,1,8,1,2,1,4,1,2,1]
// Even lengthed:
  // The palindrome length with centers (i, i + 1) = m[(i + 1) * 2] - 1
// Odd lengthed:
  // The palindrome length with center at index i = m[i * 2 + 1] - 1

// Time Complexity: O(n) 85ms 
// Space Complexity: O(n) 48.7MB
var longestPalindrome = function(s) {
  let m = manacher(s), start = 0, end = 0, n = s.length;
  for (let i = 0; i < n; i++) {
    // palindrome center: (i, i + 1)
    let evenLen = i < n - 1 ? m[(i + 1) * 2] - 1 : 0;
    let halfLen = evenLen / 2;
    if (evenLen > end - start + 1) start = i - halfLen + 1, end = i + halfLen;

    // palindrome center: (i)
    let oddLen = m[i * 2 + 1] - 1;
    halfLen = Math.floor(oddLen / 2);
    if (oddLen > end - start + 1) start = i - halfLen, end = i + halfLen;
  }
  return s.slice(start, end + 1);
};

function manacher(s) {
  s = addCharsInBetween(s);
  let n = s.length, m = Array(n).fill(1);
  for (let i = 1, l = 1, r = 1; i < n; i++) {
    if (i > r) {
      while (i - m[i] >= 0 && i + m[i] < n && s[i - m[i]] === s[i + m[i]]) m[i]++;
      l = i - m[i] + 1, r = i + m[i] - 1;
    } else {
      if (i + m[l + (r - i)] > r) {
        m[i] = r - i;
        while (i - m[i] >= 0 && i + m[i] < n && s[i - m[i]] === s[i + m[i]]) m[i]++;
        l = i - m[i] + 1, r = i + m[i] - 1;
      } else {
        m[i] = m[l + (r - i)];
        l = i - m[i] + 1, r = i + m[i] - 1;
      }
    }
  }
  return m;
}

function addCharsInBetween(s) {
  let processedS = "#";
  for (let i = 0; i < s.length; i++) processedS += s[i] + '#';
  return processedS;
}

// Two test cases
console.log(longestPalindrome("babad")) // "bab"
console.log(longestPalindrome("cbbd")) // "bb"