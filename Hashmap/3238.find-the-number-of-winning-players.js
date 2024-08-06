// 3238. Find the Number of Winning Players
// You are given an integer n representing the number of players in a game and a 2D array pick where pick[i] = [x[i], y[i]] represents that the player x[i] picked a ball of color y[i].
// Player i wins the game if they pick strictly more than i balls of the same color. In other words,
  // Player 0 wins if they pick any ball.
  // Player 1 wins if they pick at least two balls of the same color.
  // ...
  // Player i wins if they pick at least i + 1 balls of the same color.
// Return the number of players who win the game.
// Note that multiple players can win the game.


// Solution: Array of Hashmaps

// Find the count of each color for each player.
// Store these counts in an array of hashmaps: counts[i] = color counts for the player i.
// Return the count of players x who have a color count exceeding x.

// m = length of pick, k = distinct y per player
// Time Complexity: O(m) 64ms
// Space Complexity: O(nk) 55.2MB
function winningPlayerCount(n, pick) {
  let counts = Array(n).fill(0).map(() => ({}));  
  let isWinning = Array(n).fill(false);
  let winning = 0;
  for (let [x, y] of pick) {
    counts[x][y] = (counts[x][y] || 0) + 1;
    if (counts[x][y] === x + 1 && !isWinning[x]) { // so that each player is counted at most once
      isWinning[x] = true;
      winning++;
    }
  }
  return winning;
};

// Three test cases
console.log(winningPlayerCount(4, [[0,0],[1,0],[1,0],[2,1],[2,1],[2,0]])) // 2
console.log(winningPlayerCount(5, [[1,1],[1,2],[1,3],[1,4]])) // 0
console.log(winningPlayerCount(5, [[1,1],[2,4],[2,4],[2,4]])) // 1