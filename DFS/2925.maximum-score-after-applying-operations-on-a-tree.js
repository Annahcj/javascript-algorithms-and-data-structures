// 2925. Maximum Score After Applying Operations on a Tree
// There is an undirected tree with n nodes labeled from 0 to n - 1, and rooted at node 0. You are given a 2D integer array edges of length n - 1, where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree.
// You are also given a 0-indexed integer array values of length n, where values[i] is the value associated with the ith node.
// You start with a score of 0. In one operation, you can:
  // Pick any node i.
  // Add values[i] to your score.
  // Set values[i] to 0.
// A tree is healthy if the sum of values on the path from the root to any leaf node is different than zero.
// Return the maximum score you can obtain after performing these operations on the tree any number of times so that it remains healthy.


// Solution: Post-order DFS

// Choose one node value to keep per leaf node path.
// Use post-order DFS to find the minimum sum of node values taking one node per path (at the end, the result is total sum - dfs(0, -1))
// For each dfs(node), we have two choices:
  // 1. Take the node: This means we can keep all the subtree values except the current node.
  // 2. Skip the node: This means each child subtree needs to choose one value to keep.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 182ms
// Space Complexity: O(n + m) 84.8MB
var maximumScoreAfterOperations = function(edges, values) {
  let n = values.length, graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let totalSum = values.reduce((sum, value) => sum + value);
  return totalSum - dfs(0, -1);
  
  function dfs(node, parent) { 
    if (graph[node].length === 1 && graph[node][0] === parent) {
      return values[node]; 
    }
    let sum = 0;
    for (let child of graph[node]) {
      if (child === parent) continue;
      sum += dfs(child, node);
    }
    return Math.min(values[node], sum);
  }
};

// Two test cases
console.log(maximumScoreAfterOperations([[0,1],[0,2],[0,3],[2,4],[4,5]], [5,2,5,2,1,1])) // 11
console.log(maximumScoreAfterOperations([[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], [20,10,9,7,4,3,5])) // 40