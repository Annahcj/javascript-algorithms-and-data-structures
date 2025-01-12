// 2116. Check if a Parentheses String Can Be Valid
// A parentheses string is a non-empty string consisting only of '(' and ')'. It is valid if any of the following conditions is true:
  // It is ().
  // It can be written as AB (A concatenated with B), where A and B are valid parentheses strings.
  // It can be written as (A), where A is a valid parentheses string.
// You are given a parentheses string s and a string locked, both of length n. locked is a binary string consisting only of '0's and '1's. For each index i of locked,
  // If locked[i] is '1', you cannot change s[i].
  // But if locked[i] is '0', you can change s[i] to either '(' or ')'.
// Return true if you can make s a valid parentheses string. Otherwise, return false.


// Solution: Counting

// Traverse s from left-to-right, keeping track of:
  // The current balance: ) = -1, ( = +1
  // The number of unlocked '(' so far.
  // The number of unlocked ')' so far.

// If the balance becomes negative, check whether we have enough unlocked ')' to turn into '('. If we don't, return false.
// At the end, if the balance is positive, check whether we have enough unlocked '(' to turn into ')'.
// However, this doesn't account for the case where we have '(' at the end of the string, it will be too late to recover.
// Hence, we also need to perform this check from right-to-left.

// Time Complexity: O(n) 29ms
// Space Complexity: O(1) 61.42MB
function canBeValid(s, locked) {
  const n = s.length;
  if (n % 2 === 1) return false;
  let unlockedOpen = 0, unlockedClosed = 0;
  let balance = 0;
  for (let i = 0; i < n; i++) {
    if (locked[i] === '0') {
      s[i] === '(' ? unlockedOpen++ : unlockedClosed++;
    }
    if (s[i] === '(') {
      balance++;
    } else {
      balance--;
      if (balance < 0) {
        if (unlockedClosed === 0) return false;
        unlockedClosed--;
        balance += 2;
      }
    }
  }
  if (balance > 0 && unlockedOpen < balance / 2) {
    return false;
  }

  unlockedOpen = 0, unlockedClosed = 0;
  balance = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (locked[i] === '0') {
      s[i] === '(' ? unlockedOpen++ : unlockedClosed++;
    }
    if (s[i] === '(') {
      balance--;
      if (balance < 0) {
        if (unlockedOpen === 0) return false;
        unlockedOpen--;
        balance += 2;
      }
    } else {
      balance++;
    }
  }
  return balance === 0 || unlockedClosed >= balance / 2;
};

// Three test cases
console.log(canBeValid("))()))", "010100")) // true
console.log(canBeValid("()()", "0000")) // true
console.log(canBeValid(")", "0")) // false