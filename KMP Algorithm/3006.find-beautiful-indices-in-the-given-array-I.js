// 3006. Find Beautiful Indices in the Given Array I
// You are given a 0-indexed string s, a string a, a string b, and an integer k.
// An index i is beautiful if:
  // 0 <= i <= s.length - a.length
  // s[i..(i + a.length - 1)] == a
  // There exists an index j such that:
    // 0 <= j <= s.length - b.length
    // s[j..(j + b.length - 1)] == b
    // |j - i| <= k
// Return the array that contains beautiful indices in sorted order from smallest to largest.


// Solution: KMP Algorithm & Two Pointers

// Use a modified KMP algorithm to find all matches of `a` in `s`, and the same for `b`.
// Use two pointers to find the number of indices from a and b that are at most k distance apart.
  // Anchor the pointer i going through indices from a.
  // Move up the pointer j (for indices in b) while greater than k distance before i.

// n = length of s, m = length of a and b
// Time Complexity: O(n + m) 118ms
// Space Complexity: O(n + m) 51.1MB
var beautifulIndices = function(s, a, b, k) {
  let aIndices = kmp(s, a), bIndices = kmp(s, b);
  let ans = [];
  for (let i = 0, j = 0; i < aIndices.length && j < bIndices.length; i++) {
    while (j < bIndices.length && aIndices[i] - bIndices[j] > k) j++;
    if (j < bIndices.length && Math.abs(bIndices[j] - aIndices[i]) <= k) ans.push(aIndices[i]);
  }
  return ans;
};

function kmp(str, substr) {
  let lps = getLPS(substr);
  let n = str.length, m = substr.length;
  let i = 0, j = 0;
  let matches = [];
  while (j < n) {
    if (str[j] === substr[i]) { 
      i++, j++; 
      if (i === m) matches.push(j - m);
    } else if (i > 0) {
      i = lps[i - 1]; // rollback
    } else j++; // i is 0, so we move j forward
  }
  return matches;
}

function getLPS(str) {
  let n = str.length, lps = Array(n).fill(0);
  let i = 0, j = 1;
  while (j < n) {
    if (str[i] === str[j]) {
      lps[j++] = ++i;
    } else if (i > 0) {
      i = lps[i - 1];
    } else j++;
  }
  return lps;
}

// Two test cases
console.log(beautifulIndices("isawsquirrelnearmysquirrelhouseohmy", "my", "squirrel", 15)) // [16,33]
console.log(beautifulIndices("abcd", "a", "a", 4)) // [0]