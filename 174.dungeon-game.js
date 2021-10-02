// 174. Dungeon Game
// The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned in the top-left room and must fight his way through dungeon to rescue the princess.
// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.
// Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight's health (represented by positive integers).
// To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.
// Return the knight's minimum initial health so that he can rescue the princess.
// Note that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.


// Solution: Bottom-up Dynamic Programming

// Create an empty n + 1 by m + 1 matrix
// Fill the last extra row with Infinity
// Fill the last extra column with Infinity
// Set the two neighboring cells of the princess to 1's, since that is the minimum health requirement
// It will look like this, but initially the main dungeon will be empty

// -2  -3   3  ~      ~ = Infinity
// -5  10   1  ~
// 10  30  -5  1   
//  ~   ~   1  ~

// -2  -3   3  
// -5  10   1  
// 10  30  -5    <-  At the princess cell, our health will be reduced by 5.
				           // So we need a minimum health of 6 to survive when we reach here. val = 1- (-5) = 6
                   // If the total health is negative (meaning more than enough), then our health will become 1 (Math.max(minHP, 1)) 


// We loop through backwards from bottom up,
  // (we set dp[i][j] to the minimum hp we would need for this position. (right or down) - dungeon[i][j], if we have more than enough, set it to 1, since that is the minimum we would need)
  // choosing the best option 'minHP' (minimum of either right -> dp[i][j + 1], or down -> dp[i + 1][j])
  // subtract this best option with the current cell's value, dungeon[i][j]
  // set dp[i][j] to Math.max(minHP, 1)

// The final answer will be dp[0][0], the start cell

// Time Complexity: O(nm) 84ms
// Space Complexity: O(nm) 41.1MB
var calculateMinimumHP = function(dungeon) {
  let n = dungeon.length, m = dungeon[0].length;
  let dp = Array(n + 1);
  for (var i = 0; i <= n; i++) {
    dp[i] = Array(m + 1);
  }
  dp[n].fill(Infinity);
  for (i = 0; i < n; i++) dp[i][m] = Infinity;
  dp[n - 1][m] = 1;
  dp[n][m - 1] = 1;
  
  for (i = n - 1; i >= 0; i--) {
    for (var j = m - 1; j >= 0; j--) {
      let right = dp[i][j + 1];
      let down = dp[i + 1][j];
      let minHP = Math.min(right, down) - dungeon[i][j];
      dp[i][j] = Math.max(minHP, 1);
    }
  }
  return dp[0][0];
};

// Three test cases to run function on
console.log(calculateMinimumHP([[1,-3,3],[0,-2,0],[-3,-3,-3]])) // 3
console.log(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]])) // 7
console.log(calculateMinimumHP([[0]])) // 1