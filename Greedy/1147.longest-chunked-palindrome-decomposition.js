// 1147. Longest Chunked Palindrome Decomposition
// You are given a string text. You should split it to k substrings (subtext1, subtext2, ..., subtext_k) such that:
  // subtext_i is a non-empty string.
  // The concatenation of all the substrings is equal to text (i.e., subtext1 + subtext2 + ... + subtext_k == text).
  // subtext_i == subtext_k - i + 1 for all valid values of i (i.e., 1 <= i <= k).
// Return the largest possible value of k.


// Solution 1: Greedy & Recursion 

// e.g: text = "abcazabca"
// Let's focus on "abca_abca"
  // We can match "abca" and "abca", leaving text with "z".
  // However, we can also take "a" and "a", leaving text with "bca_abc".
  // We can then match take "bc" and "bc", leaving text with "a_a" (we take the outer prefix/suffix, then the two middle substrings, then the inner suffix/prefix).
  // If a prefix of part1 = a suffix of part2 (text.slice(0, i) === text.slice(n - i - 1)), that means the suffix of part1 = the prefix of part2.

// The greedy proof is that if text.slice(0, i) === text.slice(n - i - 1), then the remaining substring can also be matched, with even more k.

// Time Complexity: O(n^2) 67ms
// Space Complexity: O(n) 42.1MB
var longestDecomposition = function(text) {
  let n = text.length;
  if (n === 0) return 0;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    let prefix = text.slice(0, i + 1), suffix = text.slice(n - i - 1);
    if (prefix === suffix) {
      return 2 + longestDecomposition(text.slice(i + 1, n - i - 1));
    }
  }
  return 1; // middle of palindrome
};


// Solution 2: Greedy & Iteration

// The same concept as solution 1, except we use iteration using two pointers instead of recursion.
// Using the iterative way will save us from using the space in the recursive call stack and we avoid doing unnecessary slice operations.

// Time Complexity: O(n^2) 97ms
// Space Complexity: O(n) 42.5MB
var longestDecomposition = function(text) {
  let l = 0, r = text.length - 1, ans = 0;
  while (l <= r) {
    let n = r - l + 1;
    if (n === 0) return ans;
    if (l === r) return ans + 1;
    for (let i = 1; i <= Math.floor(n / 2); i++) {
      let prefix = text.slice(l, l + i);
      let suffix = text.slice(r - i + 1, r + 1);
      if (prefix === suffix) {
        l += i;
        r -= i;
        ans += 2;
        break;
      }
    }
    let hasMatch = r - l + 1 !== n;
    if (!hasMatch) return 1 + ans; // no matching prefix/suffix, take middle of palindrome
  }
  return ans;
};

// Three test cases
console.log(longestDecomposition("ghiabcdefhelloadamhelloabcdefghi")) // 7
console.log(longestDecomposition("merchant")) // 1
console.log(longestDecomposition("antaprezatepzapreanta")) // 11