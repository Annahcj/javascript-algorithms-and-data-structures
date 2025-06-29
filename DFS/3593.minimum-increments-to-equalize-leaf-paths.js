// 3593. Minimum Increments to Equalize Leaf Paths
// You are given an integer n and an undirected tree rooted at node 0 with n nodes numbered from 0 to n - 1. This is represented by a 2D array edges of length n - 1, where edges[i] = [ui, vi] indicates an edge from node ui to vi .
// Each node i has an associated cost given by cost[i], representing the cost to traverse that node.
// The score of a path is defined as the sum of the costs of all nodes along the path.
// Your goal is to make the scores of all root-to-leaf paths equal by increasing the cost of any number of nodes by any non-negative amount.
// Return the minimum number of nodes whose cost must be increased to make all root-to-leaf path scores equal.


// Solution: Post-Order DFS

// Post-order DFS starting from the root.
// For each node, find the cost for each child route.
// We must make all child routes have the same cost, meaning we need to make every path equal to the maximum path cost.

// Time Complexity: O(n) 310ms
// Space Complexity: O(n) 127MB
function minIncrease(n, edges, cost) {
  const graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  let nodesToIncrease = 0;
  dfs(0, -1);
  return nodesToIncrease;

  function dfs(node, parent) {
    let maxScore = 0, nodesWithMaxScore = 0;
    let children = 0;
    for (let child of graph[node]) {
      if (child === parent) continue;
      const childScore = dfs(child, node);
      if (childScore > maxScore) {
        nodesWithMaxScore = 1;
        maxScore = childScore;
      } else if (childScore === maxScore) {
        nodesWithMaxScore++;
      }
      children++;
    }
    nodesToIncrease += (children - nodesWithMaxScore);
    return maxScore + cost[node]; 
  }
};

// Two test cases
console.log(minIncrease(3, [[0,1],[0,2]], [2,1,3])) // 1
console.log(minIncrease(3, [[0,1],[1,2]], [5,1,4])) // 0