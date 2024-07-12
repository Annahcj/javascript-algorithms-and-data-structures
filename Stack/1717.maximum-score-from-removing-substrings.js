// 1717. Maximum Score From Removing Substrings
// You are given a string s and two integers x and y. You can perform two types of operations any number of times.
  // Remove substring "ab" and gain x points.
    // For example, when removing "ab" from "cabxbae" it becomes "cxbae".
  // Remove substring "ba" and gain y points.
    // For example, when removing "ba" from "cabxbae" it becomes "cabxe".
// Return the maximum points you can gain after applying the above operations on s.


// Solution: Stack - Two Passes

// It is always optimal to remove the substring with the most points first before removing the other substring.
// Removing one substring will not affect the chances of getting more substrings.
// In other words, the amount of substrings removed are the same.

// Use a stack to remove the substrings.
// We need two passes - first pass to remove the desired substrings (ones with more points), the second pass to remove the other substrings.
// If x > y, always try to remove "ab"s on the first pass, and then remove "ba"s on the second pass.
// Otherwise, try to remove "ba"s on the first pass and "ab"s on the second pass.

// n = length of s
// Time Complexity: O(n) 139ms
// Space Complexity: O(n) 69.5MB
function maximumGain(s, x, y) {
  const firstChoice = x > y ? 'ab' : 'ba';
  const secondChoice = firstChoice[1] + firstChoice[0];
  const [points1, remaining] = pointsRemovingSubstring(s, firstChoice, Math.max(x, y));
  const [points2] = pointsRemovingSubstring(remaining, secondChoice, Math.min(x, y));
  return points1 + points2;
};

function pointsRemovingSubstring(chars, substring, score) {
  let stack = [], points = 0;
  for (let char of chars) {
    if (char === substring[1]) {
      if (stack.length && stack[stack.length - 1] === substring[0]) {
        points += score;
        stack.pop();
      } else {
        stack.push(char);
      }
    } else {
      stack.push(char);
    }
  }
  return [points, stack];
}

// Two test cases
console.log(maximumGain("cdbcbbaaabab", 4, 5)) // 19
console.log(maximumGain("aabbaaxybbaabb", 5, 4)) // 20