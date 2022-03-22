// 1663. Smallest String With A Given Numeric Value
// The numeric value of a lowercase character is defined as its position (1-indexed) in the alphabet, so the numeric value of a is 1, the numeric value of b is 2, the numeric value of c is 3, and so on.
// The numeric value of a string consisting of lowercase characters is defined as the sum of its characters' numeric values. For example, the numeric value of the string "abe" is equal to 1 + 2 + 5 = 8.
// You are given two integers n and k. Return the lexicographically smallest string with length equal to n and numeric value equal to k.
// Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.


// Solution: Greedy Approach

// 1. Start with n a's. e.g: if n = 3, start with "aaa"
// 2. Subtract n from k (since we use n a's)
// 3. From back to front, make up for any gap in k.
  // Take the minimum of 
    // k and 
    // 26 - res[i] (to ensure we don't go past z)
  // as the extra char code to add on to res[i].
  // Repeat this until k is 0.

// e.g: n = 3, k = 27
// res[i] = [1, 1, 1] (all a's)
// subtract 3 from k: k = 24

// i = n - 1: 
  // value to add = Math.min(k, 26 - res[i]) = Math.min(24, 25) = 24. 
  // 1 + 24 = 25 (y)
  // subtract 24 off k: k = 0

// k is 0 so we break out of the loop.
// The result is [1, 1, 25] -> "aay"

// Time Complexity: O(n) 237ms
// Space Complexity: O(1) (not including output) 67.6MB
var getSmallestString = function(n, k) {
  let res = Array(n).fill(1); // res[i] = char code of character at index i
  k -= n;
  for (let i = n - 1; i >= 0 && k > 0; i--) {
    let extra = Math.min(k, 26 - res[i]);
    res[i] += extra;
    k -= extra;
  }

  return res.map(charcode => String.fromCharCode(charcode + 96)).join("");
};

// Two test cases to run function on
console.log(getSmallestString(3, 27)) // "aay"
console.log(getSmallestString(5, 73)) // "aaszz"