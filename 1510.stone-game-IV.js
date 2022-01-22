// 1510. Stone Game IV
// Alice and Bob take turns playing a game, with Alice starting first.
// Initially, there are n stones in a pile. On each player's turn, that player makes a move consisting of removing any non-zero square number of stones in the pile.
// Also, if a player cannot make a move, he/she loses the game.
// Given a positive integer n, return true if and only if Alice wins the game otherwise return false, assuming both players play optimally.


// Solution: Recursion w/ Memoization

// Keep track of amount of stones left and whose turn it is.
// Turn: 1 = alice, 0 = bob.

// Note: turn ^ 1 flips 1 to 0 and 0 to 1.

// Time Complexity: O(n * sqrt(n)) 200ms
// Space Complexity: O(n) 59.1MB
var winnerSquareGame = function(n) {
  let memo = Array(n + 1);
  for (var i = 0; i <= n; i++) memo[i] = Array(2);
  return dfs(n, 1);
  
  function dfs(n, turn) {
    if (n === 0) return turn === 0; // if it is bob's turn, return true.
    if (memo[n][turn] !== undefined) return memo[n][turn]; 
    
    for (var i = Math.floor(Math.sqrt(n)); i >= 1; i--) { // it is more time efficient to reach 0 faster
      let square = i * i;

      // both players play optimally
      if (turn === 1) {
        if (dfs(n - square, turn ^ 1)) return memo[n][turn] = true; // if even one combination for alice returns true, alice wins in this state.
      } else {
        if (!dfs(n - square, turn ^ 1)) return memo[n][turn] = false; // if even one combination for bob returns false, bob wins in this state.
      }
    }
    return turn === 1 ? false : true; // the default is the opposite result for both players.
  }  
};

// Two test cases to run function on
console.log(winnerSquareGame(1)) // true
console.log(winnerSquareGame(5)) // false