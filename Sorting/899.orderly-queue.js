// 899. Orderly Queue
// Frequency: 15.63%
// You are given a string s and an integer k. You can choose one of the first k letters of s and append it at the end of the string..
// Return the lexicographically smallest string you could have after applying the mentioned step any number of moves.


// Solution: Sorting or Rotating

// Thoughts:
// If k is 2 or more, any combination of string can be made.
// In this case, we can simply sort the string and return it.

// However, if k is 1, we would need to rotate the string by s.length times, 
// by rotating, I mean taking the first letter of the string at putting it at the end.

// Time Complexity: 72ms
  // k === 1: O(n log(n))
  // k > 1: O(n^2)

// Space Complexity: O(n) 40.4MB
var orderlyQueue = function(s, k) {
  if (k === 1) {
    let min = s;
    for (var i = 0; i < s.length - 1; i++) {
      s = s.substr(1) + s[0];
      if (min > s) min = s;
    }
    return min;
  } else {
    return s.split("").sort().join("");
  } 
};

// Two test cases
console.log(orderlyQueue("cba", 1)) // "acb"
console.log(orderlyQueue("baaca", 3)) // "aaabc"