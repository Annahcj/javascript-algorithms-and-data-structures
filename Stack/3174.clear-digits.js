// 3174. Clear Digits
// You are given a string s.
// Your task is to remove all digits by doing this operation repeatedly:
  // Delete the first digit and the closest non-digit character to its left.
// Return the resulting string after removing all digits.


// Solution: Stack

// Use a stack to store the characters.
// Whenever we come across a digit, pop off the last character in the stack.
// At the end, return the stack joined into a string.

// Time Complexity: O(n) 4ms
// Space Complexity: O(n) 51.91MB
function clearDigits(s) {
  const stack = [];
  for (let char of s) {
    if (isNaN(char)) {
      stack.push(char);
    } else if (stack.length > 0) {
      stack.pop();
    }
  }
  return stack.join("");
};

// Two test cases
console.log(clearDigits("abc")) // "abc"
console.log(clearDigits("cb34")) // ""