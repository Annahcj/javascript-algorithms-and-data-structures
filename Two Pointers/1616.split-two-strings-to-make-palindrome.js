// 1616. Split Two Strings to Make Palindrome
// You are given two strings a and b of the same length. Choose an index and split both strings at the same index, splitting a into two strings: aprefix and asuffix where a = aprefix + asuffix, and splitting b into two strings: bprefix and bsuffix where b = bprefix + bsuffix. Check if aprefix + bsuffix or bprefix + asuffix forms a palindrome.
// When you split a string s into sprefix and ssuffix, either ssuffix or sprefix is allowed to be empty. For example, if s = "abc", then "" + "abc", "a" + "bc", "ab" + "c" , and "abc" + "" are valid splits.
// Return true if it is possible to form a palindrome string, otherwise return false.
// Notice that x + y denotes the concatenation of strings x and y.


// Solution: Greedy & Two Pointers

// Greedily match the characters in the prefix of a with the characters in the suffix of b until they don't match.
// Two pointers:
  // i = index in a (start from 0)
  // j = index in b (start from b.length - 1)

// When a[i] !== b[j], we can either take the remaining string from a or b.
  // The number of characters left are n - i.
  // From a: Check if the substring from index i to index i + remainingLen - 1 is a palindrome.
  // From b: Check if the substring from index j - remaining length + 1 to index j is a palindrome.

// We also need to check the same thing on the flipped ordering (b, a).

// n = length of a and b
// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 49.8MB
var checkPalindromeFormation = function(a, b) {
  return isPalindromeFormation(a, b) || isPalindromeFormation(b, a);
};

function isPalindromeFormation(a, b) {
  let n = a.length;
  for (let i = 0, j = n - 1; i < n; i++, j--) {
    let remainingLen = n - (i * 2);
    if (remainingLen <= 0) return true;
    if (a[i] !== b[j]) {
      return isPalindrome(a, i, i + remainingLen - 1) || isPalindrome(b, j - remainingLen + 1, j);
    }
  }
  return true;
}

function isPalindrome(str, i, j) {
  let start = i, end = j;
  while (start < end) {
    if (str[start] !== str[end]) return false;
    start++, end--;
  }
  return true;
}

// Three test cases
console.log(checkPalindromeFormation("x", "y")) // true
console.log(checkPalindromeFormation("xbdef", "xecab")) // false
console.log(checkPalindromeFormation("ulacfd", "jizalu")) // true