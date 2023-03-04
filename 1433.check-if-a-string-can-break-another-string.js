// 1433. Check If a String Can Break Another String
// Given two strings: s1 and s2 with the same size, check if some permutation of string s1 can break some permutation of string s2 or vice-versa. In other words s2 can break s1 or vice-versa.
// A string x can break string y (both of size n) if x[i] >= y[i] (in alphabetical order) for all i between 0 and n-1.


// Solution 1: Greedy w/ Sorting

// Sort both s1 and s2 in lexiographical order.
// Check if either of the sorted s1 and s2 is consistently bigger/equal or smaller/equal than the other.

// Time Complexity: O(n log(n)) 923ms
// Space Complexity: O(n) 59.9MB
var checkIfCanBreak = function(s1, s2) {
  s1 = s1.split("").sort((a, b) => a.localeCompare(b));
  s2 = s2.split("").sort((a, b) => a.localeCompare(b));
  let s1Bigger = 0; // -1 = s1 bigger, 0 = neutral, 1 = s2 bigger
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] > s2[i]) {
      if (s1Bigger === 1) return false;
      s1Bigger = -1;
    } else if (s1[i] < s2[i]) {
      if (s1Bigger === -1) return false;
      s1Bigger = 1;
    } 
  }
  return true;
};

// Solution 2: Counting

// Instead of sorting, we can use counting to bring the time complexity down to O(n) and space complexity to O(1).
// Count the occurances of each character in s1 and s2.
// Check whether the occurances of characters in one string always comes before the other.
  // The balance is always negative/equal or positive/equal.

// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 45.4MB
var checkIfCanBreak = function(s1, s2) {
  let count1 = Array(26).fill(0), count2 = Array(26).fill(0);
  let n = s1.length;
  for (let i = 0; i < n; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }
  let currBalance = 0, balance = 0;
  for (let i = 0; i < 26; i++) {
    currBalance += count1[i] - count2[i];
    if (currBalance !== 0) {
      if ((balance > 0 && currBalance < 0) || (balance < 0 && currBalance > 0)) return false;
      balance = currBalance;
    }
  }
  return true;
};

// Three test cases
console.log(checkIfCanBreak("abc", "xya")) // true
console.log(checkIfCanBreak("abe", "acd")) // false
console.log(checkIfCanBreak("leetcodee", "interview")) // true