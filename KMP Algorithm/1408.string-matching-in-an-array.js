// 1408. String Matching in an Array
// Given an array of string words, return all strings in words that is a substring of another word. You can return the answer in any order.
// A substring is a contiguous sequence of characters within a string


// Solution: KMP

// Go through every pair of numbers and use KMP to check whether one is a substring of the other in O(m) TC.

// n = length of words, m = max(words[i].length)
// Time Complexity: O(n^2 * m) 21ms
// Space Complexity: O(nm) 56.23MB
function stringMatching(words) {
  words.sort((a, b) => b.length - a.length);
  const substrs = new Set(), n = words.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (kmp(words[i], words[j]) !== -1) {
        substrs.add(words[j]);
      }
    }
  }
  return [...substrs];
};

function kmp(str, substr) {
  let lps = getLPS(substr);
  let n = str.length, m = substr.length;
  let i = 0, j = 0;
  while (j < n) {
    if (str[j] === substr[i]) { 
      i++, j++; 
      if (i === m) return j - m;
    } else if (i > 0) {
      i = lps[i - 1]; // rollback
    } else j++; // i is 0, so we move j forward
  }
  return -1;
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

// Three test cases
console.log(stringMatching(["mass","as","hero","superhero"])) // ["as","hero"]
console.log(stringMatching(["leetcode","et","code"])) // ["et","code"]
console.log(stringMatching(["blue","green","bu"])) // []