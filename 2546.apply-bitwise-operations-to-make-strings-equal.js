// 2546. Apply Bitwise Operations to Make Strings Equal
// You are given two 0-indexed binary strings s and target of the same length n. You can do the following operation on s any number of times:
  // Choose two different indices i and j where 0 <= i, j < n.
  // Simultaneously, replace s[i] with (s[i] OR s[j]) and s[j] with (s[i] XOR s[j]).
// For example, if s = "0110", you can choose i = 0 and j = 2, then simultaneously replace s[0] with (s[0] OR s[2] = 0 OR 1 = 1), and s[2] with (s[0] XOR s[2] = 0 XOR 1 = 1), so we will have s = "1110".
// Return true if you can make the string s equal to target, or false otherwise.


// Solution: 4 Observations

// Outcomes of the 4 different situations:
  // 11 -> 10
  // 10 -> 11
  // 01 -> 11
  // 00 -> 00

// Observations:
// 1. If s only has "0"s and target has a "1", it is impossible because we can never get a "1" from "0"s.
// 2. No matter how many "1"s we try to remove, there will always be one left because 11 -> 10. Therefore if s has "1"s and target has only "0"s, it is impossible.
// 3. As long as we have at least one "1", we can produce as many or at little "1"s as we like (must be more than 0).
  // Getting more "1"s: 01 -> 11, 10 -> 11.
  // Getting less "1"s: 11 -> 10, and 11 -> 01 if we flip the order of (i, j).
// 4. Notice there is a cycle (11 -> 10, 10 -> 11). Because the order of (i, j) doesn't matter, this cycle applies for the opposite direction also. This means we can swap the order of 10 -> 01, 01 -> 10 however we want. Swapping means we can order in any way possible.

// To summarize the last two observations, as long as we have at least one "1" in s, we can produce as many "1"s as we need and order s in any way.

// Time Complexity: O(n) 103ms
// Space Complexity: O(1) 45.8MB
var makeStringsEqual = function(s, target) {
  if (!s.includes("1") && target.includes("1")) return false; 
  if (s.includes("1") && !target.includes("1")) return false; 
  return true;
};

// Three test cases
console.log(makeStringsEqual("1010", "0110")) // true
console.log(makeStringsEqual("11", "00")) // false
console.log(makeStringsEqual("00", "11")) // false