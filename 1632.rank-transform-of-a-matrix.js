// 1632. Rank Transform of a Matrix
// Given an m x n matrix, return a new matrix answer where answer[row][col] is the rank of matrix[row][col].
// The rank is an integer that represents how large an element is compared to other elements. It is calculated using the following rules:
  // The rank is an integer starting from 1.
  // If two elements p and q are in the same row or column, then:
    // If p < q then rank(p) < rank(q)
    // If p == q then rank(p) == rank(q)
    // If p > q then rank(p) > rank(q)
  // The rank should be as small as possible.
// The test cases are generated so that answer is unique under the given rules.


// Solution: Union Find

// Cells with equal values connected by the same row or column must have the same rank.
// For this reason, equal values that are connected should be processed as a group.

// Process values from smallest to largest.
// The rank of a group of cells can be calculated as: the maximum rank out of all rows and columns of these cells + 1
  // Store the current maximum rank of each row/column in two arrays: maxRankRow and maxRankCol

// 1. Map cell coordinates to each value {value: [[row, col], [row, col], ...], ...}

// 2. Extract out every [value, coordinates] into an array valueGroups.

// 3. Sort valueGroups by value.

// 4. Process each group of nodes in order from smallest to largest value.
  // a. Separate each group into groups that are connected by row or column:
    // - Group cells by row and column
    // - Loop through each adjacent pair of cells in each row and column
    // - Connect adjacent cells using union find.
    // - Extract out the groups based on the root in the union find.
  // b. For each group:
    // - Find the maximum current rank in each row/column which the cells are in.
    // - Set the new ranks for each cell in this group.
    // - Update the maxRankRow and maxRankCol for each row/column which the cells are in.

// Time Complexity: O(mn log(mn) + mn*(m + n)) 1326ms
// Space Complexity: O(mn) 136.9MB
var matrixRankTransform = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let valueMap = {};
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let val = matrix[i][j];
      if (!valueMap[val]) valueMap[val] = [];
      valueMap[val].push([i, j]); // 1. Map cell coordinates to each value
    }
  }
  
  let valueGroups = [];
  for (let value in valueMap) {
    valueGroups.push([Number(value), valueMap[value]]); // 2. Extract out into an array
  }
  valueGroups.sort((a, b) => a[0] - b[0]); // 3. Sort by value 
  
  let maxRankRow = Array(m).fill(0);
  let maxRankCol = Array(n).fill(0);
  for (let [_value, cells] of valueGroups) { // 4. Process cells grouped by same value
    let k = cells.length;
    let uf = new UnionFind(k);
    connectCellsByRowOrColumn(uf, cells); // Connect cells that share the same row or column 
    
    // Extract out connected groups
    let groups = {};
    for (let i = 0; i < k; i++) {
      let root = uf.find(i);
      if (!groups[root]) groups[root] = [];
      groups[root].push(i);
    }
    
    // Process each connected group
    for (let root in groups) {
      let indexes = groups[root]; // indexes[i] = index in cells
      let maxRank = 0;
      for (let i = 0; i < indexes.length; i++) {
        let index = indexes[i];
        let [row, col] = cells[index];
        maxRank = Math.max(maxRank, maxRankRow[row], maxRankCol[col]); // Get max rank for each row and column that the cells are in
      }
      
      // Populate the new rank
      let newRank = maxRank + 1;
      for (let i = 0; i < indexes.length; i++) {
        let index = indexes[i];
        let [row, col] = cells[index];
        maxRankRow[row] = newRank;
        maxRankCol[col] = newRank;
        matrix[row][col] = newRank;
      }
    }
  }
  return matrix;
  
  function connectCellsByRowOrColumn(uf, cells) {
    let rows = {}, cols = {};
    for (let i = 0; i < cells.length; i++) {
      let [row, col] = cells[i];
      if (!rows[row]) rows[row] = [];
      if (!cols[col]) cols[col] = [];
      rows[row].push(i);
      cols[col].push(i);
    }
    for (let row in rows) {
      for (let i = 1; i < rows[row].length; i++) {
        uf.union(rows[row][i - 1], rows[row][i]);
      }
    }
    for (let col in cols) {
      for (let i = 1; i < cols[col].length; i++) {
        uf.union(cols[col][i - 1], cols[col][i]);
      }
    }
  }
};

class UnionFind {
  constructor(n) {
    this.root = Array(n);
    this.rank = Array(n);
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Three test cases
console.log(matrixRankTransform([[1,2],[3,4]])) // [[1,2],[2,3]]
console.log(matrixRankTransform([[7,7],[7,7]])) // [[1,1],[1,1]]
console.log(matrixRankTransform([[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]])) // [[4,2,3],[1,3,4],[5,1,6],[1,3,4]]