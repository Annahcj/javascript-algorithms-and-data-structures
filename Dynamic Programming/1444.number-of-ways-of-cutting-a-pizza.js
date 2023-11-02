// 1444. Number of Ways of Cutting a Pizza
// Given a rectangular pizza represented as a rows x cols matrix containing the following characters: 'A' (an apple) and '.' (empty cell) and given the integer k. You have to cut the pizza into k pieces using k-1 cuts. 
// For each cut you choose the direction: vertical or horizontal, then you choose a cut position at the cell boundary and cut the pizza into two pieces. If you cut the pizza vertically, give the left part of the pizza to a person. If you cut the pizza horizontally, give the upper part of the pizza to a person. Give the last piece of pizza to the last person.
// Return the number of ways of cutting the pizza such that each piece contains at least one apple. Since the answer can be a huge number, return this modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization & Prefix Sum

// Populate appleCount using prefix sum, where appleCount[i][j] = the number of apples in the piece with top left corner (i, j) and bottom right corner (n - 1, m - 1).
// The formula appleCount[i][j] = appleCount[i][j + 1] + appleCount[i + 1][j] - appleCount[i + 1][j + 1] + curr means:
  // count = right count + bottom count - bottom right count.
  // we add the right count and bottom count because we want to take the full sum.
  // we subtract the bottom right count because in the right count and bottom count, the bottom right count is added on twice.

// Memoize each dp(i, j, k), where dp(i, j, k) = the number of ways to cut piece with top left corner (i, j) and bottom right corner (n - 1, m - 1) with k cuts left.
  // i = the row number
  // j = the column number
  // k = the amount of cuts we have left

// For each dp(i, j, k), count the number of ways after cutting at each row and column.
// Make sure the piece we are cutting contains at least one apple. 
  // We can check this by checking whether the appleCount[newRow][newColumn] > appleCount[row][column].
  // If appleCount[newRow][newColumn] is equal to appleCount[row][column], we know the piece we are taking has no apples.

// m = number of rows, n = number of columns
// Time Complexity: O(mnk * (m + n)) 146ms
// Space Complexity: O(mnk) 44.5MB
var ways = function(pizza, k) {
  let m = pizza.length, n = pizza[0].length, mod = 10 ** 9 + 7; 
  let appleCount = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  let memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(k + 1).fill(-1)));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      let curr = pizza[i][j] === 'A' ? 1 : 0;
      appleCount[i][j] = appleCount[i][j + 1] + appleCount[i + 1][j] - appleCount[i + 1][j + 1] + curr;
    }
  }
  return dp(0, 0, k);
  
  function dp(i, j, k) {
    if (k === 1) return appleCount[i][j] > 0 ? 1 : 0;
    if (appleCount[i][j] === 0) return 0;
    if (memo[i][j][k] !== -1) return memo[i][j][k];
    
    let ans = 0;
    for (let newRow = i; newRow < m - 1; newRow++) {
      if (appleCount[newRow + 1][j] === appleCount[i][j]) continue; // top piece has no apples 
      ans = (ans + dp(newRow + 1, j, k - 1)) % mod;
    }
    for (let newCol = j; newCol < n - 1; newCol++) {
      if (appleCount[i][newCol + 1] === appleCount[i][j]) continue; // left piece has no apples
      ans = (ans + dp(i, newCol + 1, k - 1)) % mod;
    }
    return memo[i][j][k] = ans;
  }
};

// Three test cases 
console.log(ways(["A..","AAA","..."], 3)) // 3
console.log(ways(["A..","AA.","..."], 3)) // 1
console.log(ways(["A..","A..","..."], 1)) // 1