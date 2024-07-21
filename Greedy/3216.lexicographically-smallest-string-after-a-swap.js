// 3216. Lexicographically Smallest String After a Swap
// Given a string s containing only digits, return the lexicographically smallest string that can be obtained after swapping adjacent digits in s with the same parity at most once.
// Digits have the same parity if both are odd or both are even. For example, 5 and 9, as well as 2 and 4, have the same parity, while 6 and 9 do not.


// Solution: Greedy

// It's optimal to swap the first pair of adjacent characters where s[i] > s[i + 1], and the parity is equal.
// This is because digits on the left have the most significance.

// Time Complexity: O(n) 59ms
// Space Complexity: O(n) 50.8MB
function getSmallestString(s) {
  for (let i = 0; i < s.length - 1; i++) {
    let a = Number(s[i]);
    let b = Number(s[i + 1]);
    if (a % 2 === b % 2 && a > b) {
      return `${s.slice(0, i)}${b}${a}${s.slice(i + 2)}`;
    }
  }
  return s;
};

// Two test cases
console.log(getSmallestString("45320")) // "43520"
console.log(getSmallestString("001")) // "001"