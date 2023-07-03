// 859. Buddy Strings
// Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.
// Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].
  // For example, swapping at indices 0 and 2 in "abcd" results in "cbad".


// Solution: 

// Keep track of how many characters are different: s[i] !== goal[i].
// Additionally, count the occurances of each character.

// There are two valid cases:
  // 1. There are exactly two different characters, and s[prevIndex] === goal[i] and s[i] === goal[prevIndex].
  // 2. There are no different characters, and at least one character has more than one occurance.

// If any other number of characters are different, it is valid.

// Time Complexity: O(n) 56ms
// Space Complexity: O(1) 42MB
var buddyStrings = function(s, goal) {
  if (s.length !== goal.length) return false;
  let n = s.length, count = 0, prevIndex = -1, charCount = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    if (s[i] !== goal[i]) {
      count++;
      if (count > 2) return false; // there cannot be more than 2 different characters
      if (prevIndex > -1 && (s[prevIndex] !== goal[i] || s[i] !== goal[prevIndex])) return false; // the two characters can't be swapped
      prevIndex = i;
    }
    charCount[goal.charCodeAt(i) - 97]++;
  }
  return count === 0 ? charCount.some((cnt) => cnt >= 2) : count === 2;
};

// Three test cases
console.log(buddyStrings("ab", "ba")) // true
console.log(buddyStrings("ab", "ab")) // false
console.log(buddyStrings("aa", "aa")) // true