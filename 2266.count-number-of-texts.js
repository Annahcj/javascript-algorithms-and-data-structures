// 2266. Count Number of Texts
// Alice is texting Bob using her phone. The mapping of digits to letters is shown in the figure below.
// In order to add a letter, Alice has to press the key of the corresponding digit i times, where i is the position of the letter in the key.
  // For example, to add the letter 's', Alice has to press '7' four times. Similarly, to add the letter 'k', Alice has to press '5' twice.
  // Note that the digits '0' and '1' do not map to any letters, so Alice does not use them.
// However, due to an error in transmission, Bob did not receive Alice's text message but received a string of pressed keys instead.
  // For example, when Alice sent the message "bob", Bob received the string "2266622".
// Given a string pressedKeys representing the string received by Bob, return the total number of possible text messages Alice could have sent.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution 1: Dynamic Programming - Recursion w/ Memoization

// dp(index) returns number of ways from index to the end of pressedKeys
// For index,
  // Try every substring from lengths 1 to 4 starting from index.
  // If the substring only contains one unique character, add dp(index + i) to the answer.
  // The base case is when index === n, we return 1.

// Time Complexity: O(n) 473ms
// Space Complexity: O(n) 81.7MB
var countTexts = function(pressedKeys) {
  let n = pressedKeys.length, memo = Array(n).fill(-1);
  let four = new Set(['7', '9']), mod = 10 ** 9 + 7;
  return dp(0);

  function dp(index) {
    if (index === n) return 1; // base case
    if (memo[index] !== -1) return memo[index];

    let ans = 0;
    for (let i = 1; i < 4; i++) {
      if (index + i > n) break; // out of bounds
      let substr = pressedKeys.slice(index, index + i);
      if (hasOneUnique(substr)) {
        ans = (ans + dp(index + i)) % mod;
      }
    }

    // 7 and 9 have four characters
    if (index + 4 <= n) { // check index + 4 is within bounds
      let substr = pressedKeys.slice(index, index + 4);
      if (hasOneUnique(substr) && four.has(pressedKeys[index])) ans = (ans + dp(index + 4)) % mod;
    }
    return memo[index] = ans;
  }

  function hasOneUnique(str) {
    let unique = str[0];
    for (let char of str) {
      if (char !== unique) return false;
    }
    return true;
  }
};


// Solution 2: Dynamic Programming - Tabulation

// Non-recursive version.
// The base case is dp[n] = 1.
// dp[i] means the number of ways from i to n - 1.

// Time Complexity: O(n) 266ms
// Space Complexity: O(n) 63.2MB
var countTexts = function(pressedKeys) {
  let n = pressedKeys.length, dp = Array(n + 1).fill(0);
  let four = new Set(['7', '9']), mod = 10 ** 9 + 7;
  dp[n] = 1; // base case
  
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j <= Math.min(n, i + 3); j++) {
      let substr = pressedKeys.slice(i, j);
      if (!hasOneUnique(substr)) break; // substring doesn't contain 1 unique digit
      dp[i] = (dp[i] + dp[j]) % mod;
    }
    
    if (i + 4 > n || !four.has(pressedKeys[i])) continue; // out of bounds or digit doesn't have four characters
    let substr = pressedKeys.slice(i, i + 4);
    if (hasOneUnique(substr)) { // substring contains 1 unique digit
      dp[i] = (dp[i] + dp[i + 4]) % mod;
    }
  }
  return dp[0];
  
  function hasOneUnique(str) {
    let unique = str[0];
    for (let char of str) {
      if (char !== unique) return false;
    }
    return true;
  }
};

// Three test cases to run function on
console.log(countTexts("77669")) // 4
console.log(countTexts("22233")) // 8
console.log(countTexts("222222222222222222222222222222222222")) // 82876089