// 3019. Number of Changing Keys
// You are given a 0-indexed string s typed by a user. Changing a key is defined as using a key different from the last used key. For example, s = "ab" has a change of a key while s = "bBBb" does not have any.
// Return the number of times the user had to change the key.
// Note: Modifiers like shift or caps lock won't be counted in changing the key that is if a user typed the letter 'a' and then the letter 'A' then it will not be considered as a changing of key.


// Solution: Compare Adjacent

// Compare each adjacent pair of characters.
// If they are different after converting to lowercase, the user changed the key.

// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 51.8MB
var countKeyChanges = function(s) {
  let n = s.length, changes = 0;
  for (let i = 1; i < n; i++) {
    if (s[i].toLowerCase() !== s[i - 1].toLowerCase()) changes++;
  }
  return changes;
};

// Two test cases
console.log(countKeyChanges("aAbBcC")) // 2
console.log(countKeyChanges("AaAaAaaA")) // 0