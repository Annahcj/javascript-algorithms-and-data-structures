// 1406. Stone Game III
// Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.
// Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take 1, 2, or 3 stones from the first remaining stones in the row.
// The score of each player is the sum of the values of the stones taken. The score of each player is 0 initially.
// The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.
// Assume Alice and Bob play optimally.
// Return "Alice" if Alice will win, "Bob" if Bob will win, or "Tie" if they will end the game with the same score.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, turn), where 
  // i = index in stoneValue
  // turn = 0 or 1 (0 = Alice, 1 = Bob)

// For Alice, try to maximize the result.
// For Bob, try to minimize the result.

// At the end, if the result < 0, return Bob. If the result > 0, return Alice.

// Time Complexity: O(n) 610ms
// Space Complexity: O(n) 124.8MB
var stoneGameIII = function(stoneValue) {
  let n = stoneValue.length, memo = Array(n).fill(0).map(() => Array(2).fill(null));
  let res = dp(0, 0);
  if (res === 0) return "Tie";
  return res < 0 ? "Bob" : "Alice";
  
  function dp(i, turn) { // i = index in stoneValue, turn (0 or 1)
    if (i === n) return 0;
    if (memo[i][turn] !== null) return memo[i][turn];
    
    let ans = turn === 0 ? -Infinity : Infinity, score = 0;
    for (let j = 0; j < 3; j++) {
      if (i >= n - j) break;
      if (turn === 0) {
        score += stoneValue[i + j];
        ans = Math.max(ans, dp(i + j + 1, 1) + score);
      } else {
        score -= stoneValue[i + j];
        ans = Math.min(ans, dp(i + j + 1, 0) + score);
      }
    }
    return memo[i][turn] = ans;
  }  
};

// Three test cases
console.log(stoneGameIII([1,2,3,7])) // "Bob"
console.log(stoneGameIII([1,2,3,-9])) // "Alice"
console.log(stoneGameIII([1,2,3,6])) // "Tie"