// 1758. Minimum Changes To Make Alternating Binary String
// You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.
// The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.
// Return the minimum number of operations needed to make s alternating.


// Solution 1: Counting

// There are two choices for an alternating binary string:
  // Starting with a '0': '010101...'
    // Even indices must have '0', odd indices must have '1'.
  // Starting with a '1': '101010...'
    // Even indices must have '1', odd indices must have '0'.

// Count the number of moves to turn s into the two different choices.
// Return the minimum operations out of the two choices.

// Time Complexity: O(n) 60ms
// Space Complexity: O(1) 42.6MB
var minOperations = function(s) {
  let startWith0 = 0, startWith1 = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] != i % 2) startWith0++;
    if (s[i] == i % 2) startWith1++;
  }
  return Math.min(startWith0, startWith1);
};


// Solution 2: Counting - Simplified

// It can be observed that the number of moves to change into the other alternating binary string is the exact inverse.
// e.g: If it costs 2 moves to change into '010101', then it takes n - 2 moves to change into '101010'. Whichever s[i] didn't need to be changed in the other string, will need to be changed in this string to be flipped.

// Only keep track of the number of moves to turn s into '010101...'.
// Even indices must be 0, odd indices must be 1.

// Time Complexity: O(n) 61ms
// Space Complexity: O(1) 42.7MB
var minOperations = function(s) {
  let startWith0 = 0, n = s.length;
  for (let i = 0; i < n; i++) {
    if (s[i] != i % 2) startWith0++;
  }
  return Math.min(startWith0, n - startWith0);
};

// Three test cases
console.log(minOperations("0100")) // 1
console.log(minOperations("10")) // 0
console.log(minOperations("1111")) // 2