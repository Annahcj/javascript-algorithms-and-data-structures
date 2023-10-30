// 2606. Find the Substring With Maximum Cost
// You are given a string s, a string chars of distinct characters and an integer array vals of the same length as chars.
// The cost of the substring is the sum of the values of each character in the substring. The cost of an empty string is considered 0.
// The value of the character is defined in the following way:
  // If the character is not in the string chars, then its value is its corresponding position (1-indexed) in the alphabet.
    // For example, the value of 'a' is 1, the value of 'b' is 2, and so on. The value of 'z' is 26.
  // Otherwise, assuming i is the index where the character occurs in the string chars, then its value is vals[i].
// Return the maximum cost among all substrings of the string s.


// Solution: Kadane's Algorithm

// Use Kadane's Algorithm to find the maximum cost at any point in time.
// Once the current value sum goes below 0, we restart the substring.

// n = length of s
// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 45.6MB
var maximumCostSubstring = function(s, chars, vals) {
  let values = Array(26).fill(0).map((_, i) => i + 1);
  for (let i = 0; i < chars.length; i++) {
    let charcode = chars.charCodeAt(i) - 97;
    values[charcode] = vals[i];
  }
  let maxCost = 0, currCost = 0;
  for (let i = 0; i < s.length; i++) {
    let value = values[s.charCodeAt(i) - 97];
    currCost = Math.max(currCost + value, value);
    maxCost = Math.max(maxCost, currCost);
  }
  return maxCost;
};

// Two test cases
console.log(maximumCostSubstring("adaa", "d", [-1000])) // 2
console.log(maximumCostSubstring("abc", "abc", [-1,-1,-1])) // 2