// 3311. Construct 2D Grid Matching Graph Layout
// You are given a 2D integer array edges representing an undirected graph having n nodes, where edges[i] = [ui, vi] denotes an edge between nodes ui and vi.
// Construct a 2D grid that satisfies these conditions:
  // The grid contains all nodes from 0 to n - 1 in its cells, with each node appearing exactly once.
  // Two nodes should be in adjacent grid cells (horizontally or vertically) if and only if there is an edge between them in edges.
// It is guaranteed that edges can form a 2D grid that satisfies the conditions.
// Return a 2D integer array satisfying the conditions above. If there are multiple solutions, return any of them.


// Solution: Logic

// Each node can have minimum one edge and maximum four edges depending on its position in the grid.
  // If the grid has only one row or column, corner cells have 1 edge and other nodes have 2 edges.
  // Otherwise,
    // Corner cells have 2 edges.
    // Edge cells have 3 edges.
    // Middle cells have 4 edges.

// 1. Get the count of edges for each node - this will determine where each node goes in the grid.
// 2. Find the first row of the grid by picking any one corner piece and following the neighbors until we reach the other corner piece.
// 3. Once we have the first row, build the remaining grid by using each cell directly above the new cells. 
  // The cell directly above will only have one more neighbor node left.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 647ms
// Space Complexity: O(n + m) 95.7MB
function constructGridLayout(n, edges) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  let edgesCount = Array(5).fill(0);
  let edgesByCount = Array(5).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    let nodeEdges = graph[i].length;
    edgesCount[nodeEdges]++;
    edgesByCount[nodeEdges].push(i);
  }
  let seen = Array(n).fill(false);
  let firstRow = getFirstRow(graph, edgesByCount, seen);
  let cols = firstRow.length, rows = n / cols;
  let grid = [firstRow];
  for (let i = 1; i < rows; i++) {
    let row = Array(cols);
    for (let j = 0; j < cols; j++) {
      let prevRowNode = grid[i - 1][j];
      for (let nei of graph[prevRowNode]) {
        if (seen[nei]) continue;
        seen[nei] = true;
        row[j] = nei;
        break;
      }
    }
    grid.push(row);
  }
  return grid;
};

function getFirstRow(graph, edgesByCount, seen) {
  let minEdges = edgesByCount[1].length > 0 ? 1 : 2;
  let firstCorner = edgesByCount[minEdges][0];
  let firstRow = [];
  seen[firstCorner] = true;
  let node = firstCorner;
  while (true) {
    firstRow.push(node);
    let nextEdge = null;
    for (let nei of graph[node]) {
      if (seen[nei]) continue;
      // if there is a corner, we take it as the first priority
      if (graph[nei].length === minEdges) {
        firstRow.push(nei);
        seen[nei] = true;
        return firstRow;
      }
      // if there is an edge node, we take it only if there is no available corner among all neighbors
      // edge nodes will have exactly one more edge than the corner nodes
      // the next node is the one with `minEdges` unvisited edges left
      if (graph[nei].length === minEdges + 1 && countUnseenEdges(graph[nei], seen) === minEdges) {
        nextEdge = nei;
      }
    }
    seen[nextEdge] = true;
    node = nextEdge;
  }
}

function countUnseenEdges(edges, seen) {
  return edges.reduce((count, edge) => seen[edge] ? count : count + 1, 0);
}

// Three test cases
console.log(constructGridLayout(4, [[0,1],[0,2],[1,3],[2,3]])) // [[3,1],[2,0]]
console.log(constructGridLayout(5, [[0,1],[1,3],[2,3],[2,4]])) // [[4,2,3,1,0]]
console.log(constructGridLayout(9, [[0,1],[0,4],[0,5],[1,7],[2,3],[2,4],[2,5],[3,6],[4,6],[4,7],[6,8],[7,8]])) // [[8,6,3],[7,4,2],[1,0,5]]