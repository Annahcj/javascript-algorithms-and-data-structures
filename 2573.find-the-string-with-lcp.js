// 2573. Find the String with LCP
// We define the lcp matrix of any 0-indexed string word of n lowercase English letters as an n x n grid such that:
  // lcp[i][j] is equal to the length of the longest common prefix between the substrings word[i,n-1] and word[j,n-1].
// Given an n x n matrix lcp, return the alphabetically smallest string word that corresponds to lcp. If there is no such string, return an empty string.
// A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b. For example, "aabd" is lexicographically smaller than "aaca" because the first position they differ is at the third letter, and 'b' comes before 'c'.


// Solution 1: Generate Str & Regenerate LCP

// 1. Generate the string based on lcp.
  // Build each character i from left to right.
  // If any lcp[i][j] (where j < i) is greater than 0, that means str[i] === str[j].
  // Otherwise, we need to take the maximum previous character + 1 (max charcodes[j] where j < i, since if none of lcp[i][j] > 0, that means str[i] is not equal to any str[j], so we take the smallest next character).
// 2. Regenerate lcp based on the generated string.
// 3. Compare if the two matrixes are equal.

// n = length of lcp
// Time Complexity: O(n^2) 155ms
// Space Complexity: O(n^2) 70.5MB
var findTheString = function(lcp) {
  let n = lcp.length, charcodes = Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    let maxCharcode = 0, foundMatch = false;
    for (let j = 0; j < i; j++) {
      maxCharcode = Math.max(maxCharcode, charcodes[j]);
      if (lcp[i][j] > 0) {
        charcodes[i] = charcodes[j];
        foundMatch = true;
        break;
      } 
    }
    if (!foundMatch && maxCharcode === 25) return "";
    if (!foundMatch) charcodes[i] = maxCharcode + 1;
  }

  let str = charcodes.map((charcode) => String.fromCharCode(charcode + 97)).join("");
  let lcp2 = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (str[i] === str[j]) {
        lcp2[i][j] = 1 + lcp2[i + 1][j + 1];
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (lcp[i][j] !== lcp2[i][j]) {
        return "";
      }
    }
  }
  return str;
};


// Solution 2: Generate Str & Compare

// Instead of regenerating the lcp matrix, we can compare each lcp[i][j] on the fly.
// This will bring the space complexity down to O(n).

// n = length of lcp
// Time Complexity: O(n^2) 127ms
// Space Complexity: O(n) 58.8MB
var findTheString = function(lcp) {
  let n = lcp.length, charcodes = Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    let maxCharcode = 0, foundMatch = false;
    for (let j = 0; j < i; j++) {
      maxCharcode = Math.max(maxCharcode, charcodes[j]);
      if (lcp[i][j] > 0) {
        charcodes[i] = charcodes[j];
        foundMatch = true;
        break;
      } 
    }
    if (!foundMatch && maxCharcode === 25) return "";
    if (!foundMatch) charcodes[i] = maxCharcode + 1;
  }
  
  let str = charcodes.map((charcode) => String.fromCharCode(charcode + 97)).join("");
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (str[i] === str[j]) {
        if (lcp[i][j] !== 1 + (i === n - 1 || j === n - 1 ? 0 : lcp[i + 1][j + 1])) return "";
      } else {
        if (lcp[i][j] !== 0) return "";
      }
    }
  }
  return str;
};
 
// Three test cases
console.log(findTheString([[4,0,2,0],[0,3,0,1],[2,0,2,0],[0,1,0,1]])) // "abab"
console.log(findTheString([[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]])) // "aaaa"
console.log(findTheString([[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,3]])) // ""