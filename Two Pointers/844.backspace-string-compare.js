// 844. Backspace String Compare
// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
// Note that after backspacing an empty text, the text will continue empty.


// Solution 1: Stack

// Use a stack to keep the characters, when we get a '#', pop off the last character.
// Compare the final states of the stacks for s and t.

// Time Complexity: O(n + m) 111ms
// Space Complexity: O(n + m) 42.8MB
var backspaceCompare = function(s, t) {
  return build(s) === build(t);
};

function build(str) {
  let stack = [];
  for (let char of str) {
    if (char === '#') stack.pop();
    else stack.push(char);
  }
  return stack.join("");
}


// Solution 2: Two Pointers Backwards

// Let's walk through an example: "abc#d##"
// From the front, we can't tell which characters we will be keeping, so we have to start from the end.

// index 6 (#): increment skip count (1), decrement index (5)
// index 5 (#): increment skip count (2), decrement index (4)
// index 4 (d): decrement skip count (1), decrement index (3)
// index 3 (#): increment skip count (2), decrement index (2)
// index 2 (c): decrement skip count (1), decrement index (1)
// index 1 (b): decrement skip count (0), decrement index (0)
// index 0 (a): skip count is 0 and s[index] is not "#", so compare s[index] to whatever character we are up to in the other string.

// Always skip all characters that need to be skipped first, for both s and t.
// Then, compare the characters which we will be keeping.

// Time Complexity: O(n + m) 90ms
// Space Complexity: O(1) 42.7MB
var backspaceCompare = function(s, t) {
  let n = s.length, m = t.length;
  let i = n - 1, j = m - 1;
  let skipS = 0, skipT = 0;
  while (i >= 0 || j >= 0) {
    while (i >= 0 && (s[i] === '#' || skipS > 0)) {
      if (s[i] === '#') skipS++, i--;
      else skipS--, i--;
    }
    while (j >= 0 && (t[j] === '#' || skipT > 0)) {
      if (t[j] === '#') skipT++, j--;
      else skipT--, j--;
    }

    if (s[i] !== t[j]) return false;
    i--, j--;
  }
  return true;
};

// Three test cases 
console.log(backspaceCompare("ab#c", "ad#c")) // true
console.log(backspaceCompare("ab##", "c#d#")) // true
console.log(backspaceCompare("a#c", "b")) // false