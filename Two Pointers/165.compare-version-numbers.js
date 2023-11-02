// 165. Compare Version Numbers
// Given two version numbers, version1 and version2, compare them.
// Version numbers consist of one or more revisions joined by a dot '.'. Each revision consists of digits and may contain leading zeros. Every revision contains at least one character. Revisions are 0-indexed from left to right, with the leftmost revision being revision 0, the next revision being revision 1, and so on. For example 2.5.33 and 0.1 are valid version numbers.
// To compare version numbers, compare their revisions in left-to-right order. Revisions are compared using their integer value ignoring any leading zeros. This means that revisions 1 and 001 are considered equal. If a version number does not specify a revision at an index, then treat the revision as 0. For example, version 1.0 is less than version 1.1 because their revision 0s are the same, but their revision 1s are 0 and 1 respectively, and 0 < 1.
// Return the following:
  // If version1 < version2, return -1.
  // If version1 > version2, return 1.
  // Otherwise, return 0.


// Solution 1: Built-in Functions

// 1. Split version1 & version2 by '.'
// 2. Compare the integer values of each revision.

// n = version1.length, m = version2.length
// Time Complexity: O(n + m) 82ms
// Space Complexity: O(n + m) 41.4MB
var compareVersion = function(version1, version2) {
  let v1 = version1.split("."), v2 = version2.split(".");
  let n = Math.max(v1.length, v2.length);
  for (let i = 0; i < n; i++) {
    let r1 = i >= v1.length ? 0 : +v1[i];
    let r2 = i >= v2.length ? 0 : +v2[i];
    if (r1 < r2) return -1;
    else if (r1 > r2) return 1;
  }
  return 0;
};

// Solution 2: Two Pointers 

// Without using any built-in functions.
// Set two pointers: i for version1, j for version2.

// Leading zeros case: 
  // e.g: 001
  // r1 = 0
  // 0: r1 * 10 + 0 = 0
  // 0: r1 * 10 + 0 = 0
  // 1: r1 * 10 + 1 = 1
  // r1 = 1
// Multiplying 0 with anything results in 0, so the leading zeros are disregarded.

// Time Complexity: O(max(n, m)) 86ms
// Space Complexity: O(1) 41.7MB
var compareVersion = function(version1, version2) {
  let n = version1.length, m = version2.length;
  let i = 0, j = 0;
  while (i < n || j < m) {
    let r1 = 0, r2 = 0;
    while (i < n && version1[i] !== '.') { // get the integer from version1
      r1 = r1 * 10 + +version1[i++];
    }
    while (j < m && version2[j] !== '.') { // get the integer from version2
      r2 = r2 * 10 + +version2[j++];
    }
    if (r1 < r2) return -1;
    else if (r1 > r2) return 1;
    i++, j++; // pass the '.'
  }
  return 0;
};

// Three test cases to run function on
console.log(compareVersion("1.01", "1.001")) // 0
console.log(compareVersion("1.0", "1.0.0")) // 0
console.log(compareVersion("0.1", "1.0")) // -1