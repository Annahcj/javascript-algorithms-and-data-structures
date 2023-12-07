// 1903. Largest Odd Number in String
// You are given a string num, representing a large integer. Return the largest-valued odd integer (as a string) that is a non-empty substring of num, or an empty string "" if no odd integer exists.
// A substring is a contiguous sequence of characters within a string.


// Solution: Greedy

// Find the last odd digit and take the entire prefix substring until that digit.

// Time Complexity: O(n) 65ms
// Space Complexity: O(1) (not including output) 45.8MB
var largestOddNumber = function(num) {
  for (let i = num.length - 1; i >= 0; i--) {
    if (Number(num[i]) % 2 === 1) {
      return num.slice(0, i + 1);
    }
  }  
  return "";
};

// Three test cases
console.log(largestOddNumber("52")) // "5"
console.log(largestOddNumber("4206")) // ""
console.log(largestOddNumber("35427")) // "35427"