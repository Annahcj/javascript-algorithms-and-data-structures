// 1641. Count Sorted Vowel Strings
// Given an integer n, return the number of strings of length n that consist only of vowels (a, e, i, o, u) and are lexicographically sorted.
// A string s is lexicographically sorted if for all valid i, s[i] is the same as or comes before s[i+1] in the alphabet.


// Solution: Dynamic Programming - Tabulation

// The base case is when n = 1, where we will have 5 strings (a, e, i, o, u)
// We only need to keep an array of length 5, where arr[i] = the number of lexographically sorted vowel strings that end with character i.
// Each new vowel must follow a vowel smaller than or equal to itself to satisfy the sorted requirement.

// Time Complexity: O(25n) = O(n) 92ms
// Space Complexity: O(1) 42.5MB
var countVowelStrings = function(n) {
  let prev = Array(5).fill(1);
  for (let i = 0; i < n - 1; i++) {
    let curr = Array(5).fill(0);
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k <= j; k++) { // j must follow vowels smaller than or equal to it
        curr[j] += prev[k];
      }
    }
    prev = curr;
  }
  return prev.reduce((acc, val) => acc + val);
};

// Three test cases
console.log(countVowelStrings(1)) // 5
console.log(countVowelStrings(2)) // 15
console.log(countVowelStrings(33)) // 66045