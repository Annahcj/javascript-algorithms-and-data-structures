// 675. Cut Off Trees for Golf Event
// You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an m x n matrix. In this matrix:
  // 0 means the cell cannot be walked through.
  // 1 represents an empty cell that can be walked through.
  // A number greater than 1 represents a tree in a cell that can be walked through, and this number is the tree's height.
// In one step, you can walk in any of the four directions: north, east, south, and west. If you are standing in a cell with a tree, you can choose whether to cut it off.
// You must cut off the trees in order from shortest to tallest. When you cut off a tree, the value at its cell becomes 1 (an empty cell).
// Starting from the point (0, 0), return the minimum steps you need to walk to cut off all the trees. If you cannot cut off all the trees, return -1.
// Note: The input is generated such that no two trees have the same height, and there is at least one tree needs to be cut off.


// Solution: Sorting & BFS

// 1. Get all the trees heights and row and column ([tree height, row, column])
// 2. Sort this array by tree height
// 3. Use BFS to find the shortest distance between each pair of adjacent trees
// The answer is the sum of these distances.

// Time Complexity: O(m^2 * n^2 + mn * log(mn)) 1533ms
  // time for BFS and sorting
// Space Complexity: O(mn) 59.2MB
var cutOffTree = function(forest) {
  let trees = [], m = forest.length, n = forest[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (forest[i][j] > 1) trees.push([forest[i][j], i, j]);
    }
  }
  trees.sort((a, b) => a[0] - b[0]);
  trees.unshift([forest[0][0], 0, 0]);
  
  let ans = 0;
  for (let i = 1; i < trees.length; i++) {
    let dist = getShortestPath([trees[i - 1][1], trees[i - 1][2]], [trees[i][1], trees[i][2]]);
    if (dist === -1) return -1;
    ans += dist;
  }
  return ans;
  
  function getShortestPath(cell1, cell2) {
    let [targetRow, targetCol] = cell2;
    // bfs or dfs to get the shortest path between cell1 and cell2
    let queue = [cell1], moves = 0, seen = Array(m).fill(0).map(() => Array(n).fill(0));
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    seen[cell1[0]][cell1[1]] = 1;
    
    while (queue.length) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let [row, col] = queue.shift();
        if (row === targetRow && col === targetCol) return moves;
        for (let [x, y] of directions) {
          let newX = row + x, newY = col + y;
          if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
          if (forest[newX][newY] === 0 || seen[newX][newY]) continue;
          queue.push([newX, newY]);
          seen[newX][newY] = 1;
        }
      }
      moves++;
    }
    return -1;
  }
};

// Three test cases to run function on
console.log(cutOffTree([[1,2,3],[0,0,4],[7,6,5]])) // 6
console.log(cutOffTree([[1,2,3],[0,0,0],[7,6,5]])) // -1
console.log(cutOffTree([[2,3,4],[0,0,5],[8,7,6]])) // 6