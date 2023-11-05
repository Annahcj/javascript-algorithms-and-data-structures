// 2923. Find Champion I
// There are n teams numbered from 0 to n - 1 in a tournament.
// Given a 0-indexed 2D boolean matrix grid of size n * n. For all i, j that 0 <= i, j <= n - 1 and i != j team i is stronger than team j if grid[i][j] == 1, otherwise, team j is stronger than team i.
// Team a will be the champion of the tournament if there is no team b that is stronger than team a.
// Return the team that will be the champion of the tournament.

 
// Solution: 

// Find the row i where each grid[i][j] is 1 except for itself (grid[i][i]).

// n = number of teams
// Time Complexity: O(n^2) 73ms
// Space Complexity: O(1) 47.2MB
var findChampion = function(grid) {
  let n = grid.length;
  for (let i = 0; i < n; i++) {
    let isChampion = true;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0 && j !== i) {
        isChampion = false;
        break;
      } 
    }
    if (isChampion) return i;
  }
};

// Two test cases
console.log(findChampion([[0,1],[0,0]])) // 0
console.log(findChampion([[0,0,1],[1,0,1],[0,0,0]])) // 1