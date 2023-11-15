// 2840. Check if Strings Can be Made Equal With Operations II
// You are given two strings s1 and s2, both of length n, consisting of lowercase English letters.
// You can apply the following operation on any of the two strings any number of times:
  // Choose any two indices i and j such that i < j and the difference j - i is even, then swap the two characters at those indices in the string.
// Return true if you can make the strings s1 and s2 equal, and false otherwise.


// Solution: Counting

// Among odd indices, we can sort characters however we like, the same for even indices.
// Count the occurances of characters in odd and even indices in s1 and s2.
// As long as the count of each character is the same for both s1 and s2, then it's possible to make them equal.

// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 47.5MB
var checkStrings = function(s1, s2) {
  let n = s1.length, oddCount1 = Array(26).fill(0), oddCount2 = Array(26).fill(0);
  let evenCount1 = Array(26).fill(0), evenCount2 = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      evenCount1[s1.charCodeAt(i) - 97]++;
      evenCount2[s2.charCodeAt(i) - 97]++;
    } else {
      oddCount1[s1.charCodeAt(i) - 97]++;
      oddCount2[s2.charCodeAt(i) - 97]++;
    }
  }
  for (let i = 0; i < 26; i++) {
    if (evenCount1[i] !== evenCount2[i] || oddCount1[i] !== oddCount2[i]) return false;
  }
  return true;
};

// Two test cases
console.log(checkStrings("abcdba", "cabdab")) // true
console.log(checkStrings("abe", "bea")) // false