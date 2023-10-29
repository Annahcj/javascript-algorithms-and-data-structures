// 1320. Minimum Distance to Type a Word Using Two Fingers
// You have a keyboard layout as shown above in the X-Y plane, where each English uppercase letter is located at some coordinate.
  // For example, the letter 'A' is located at coordinate (0, 0), the letter 'B' is located at coordinate (0, 1), the letter 'P' is located at coordinate (2, 3) and the letter 'Z' is located at coordinate (4, 1).
// Given the string word, return the minimum total distance to type such string using only two fingers.
// The distance between coordinates (x1, y1) and (x2, y2) is |x1 - x2| + |y1 - y2|.
// Note that the initial positions of your two fingers are considered free so do not count towards your total distance, also your two fingers do not have to start at the first letter or the first two letters.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, pos1, pos2), where 
  // i = index in word
  // c1 = the previous charcode of the left finger
  // c2 = the previous charcode of the right finger

// For each word[i], get the minimum distance out of typing it with the left finger or right finger.

// To get the row and column given a charcode (0 - 26):
  // row: Math.floor(charcode / 6)
  // column: charcode % 6
// We divide and mod by 6 since each row contains 6 columns.

// Time Complexity: O(n * 27^2) 188ms
// Space Complexity: O(n * 27^2) 57.8MB
var minimumDistance = function(word) {
  let n = word.length, memo = Array(n).fill(0).map(() => Array(27).fill(0).map(() => Array(27).fill(-1)));
  return dp(0, 26, 26);
  
  function dp(i, c1, c2) {
    if (i === n) return 0;
    if (memo[i][c1][c2] !== -1) return memo[i][c1][c2];
    
    let charcode = word.charCodeAt(i) - 65;
    return memo[i][c1][c2] = Math.min(dp(i + 1, charcode, c2) + getDist(c1, charcode), dp(i + 1, c1, charcode) + getDist(c2, charcode));
  }
  
  function getDist(c1, c2) {
    if (c1 === 26) return 0;
    let row1 = Math.floor(c1 / 6), col1 = c1 % 6;
    let row2 = Math.floor(c2 / 6), col2 = c2 % 6;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  }
};

// Two test cases 
console.log(minimumDistance("CAKE")) // 3
console.log(minimumDistance("HAPPY")) // 6