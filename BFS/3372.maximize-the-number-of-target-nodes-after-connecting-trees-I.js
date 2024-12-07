// 3372. Maximize the Number of Target Nodes After Connecting Trees I
// There exist two undirected trees with n and m nodes, with distinct labels in ranges [0, n - 1] and [0, m - 1], respectively.
// You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the first tree and edges2[i] = [u[i], v[i]] indicates that there is an edge between nodes u[i] and v[i] in the second tree. You are also given an integer k.
// Node u is target to node v if the number of edges on the path from u to v is less than or equal to k. Note that a node is always target to itself.
// Return an array of n integers answer, where answer[i] is the maximum possible number of nodes target to node i of the first tree if you have to connect one node from the first tree to another node in the second tree.
// Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.


// Solution: BFS

// 1. It's always optimal to connect the current node i with a node in the second tree. Because we are starting from node i, this is as close as we can get to the nodes in the second tree.
// 2. The node we connect with in the second tree will always be the same one. 

// Precompute the best root in the second tree where the number of nodes with distance <= k - 1 is maximized. We can use BFS for this.
// From every node i, use BFS to find the number of nodes with distance <= k.
// Add the count from the second tree to the count from the first tree.

// Time Complexity: O(n^2 + m^2) 393ms
// Space Complexity: O(n + m) 62.5MB
function maxTargetNodes(edges1, edges2, k) {
  const n = edges1.length + 1, m = edges2.length + 1;
  const graph1 = Array(n).fill(0).map(() => []);
  const graph2 = Array(m).fill(0).map(() => []);
  for (let [a, b] of edges1) {
    graph1[a].push(b);
    graph1[b].push(a);
  }
  for (let [u, v] of edges2) {
    graph2[u].push(v);
    graph2[v].push(u);
  }
  
  let tree2MaxCount = 0;
  if (k > 0) {
    for (let j = 0; j < m; j++) {
      tree2MaxCount = Math.max(tree2MaxCount, countNodesAtMaxDist(graph2, j, k - 1));
    } 
  }
  let maxTargetNodes = Array(n);
  for (let i = 0; i < n; i++) {
    maxTargetNodes[i] = tree2MaxCount + countNodesAtMaxDist(graph1, i, k);
  }
  return maxTargetNodes;
};

function countNodesAtMaxDist(graph, root, maxDist) {
  let queue = [root], moves = 0;
  const visited = Array(graph.length).fill(false);
  visited[root] = true;
  while (queue.length && moves < maxDist) {
    const next = [];
    while (queue.length) {
      const node = queue.pop();
      for (let nei of graph[node]) {
        if (visited[nei]) continue;
        next.push(nei);
        visited[nei] = true;
      }
    }
    queue = next;
    moves++;
  }
  return visited.reduce((sum, haveVisited) => sum + (haveVisited ? 1 : 0), 0);
}

// Two test cases
console.log(maxTargetNodes([[0,1],[0,2],[2,3],[2,4]], [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]], 2)) // [9,7,9,8,8]
console.log(maxTargetNodes([[0,1],[0,2],[0,3],[0,4]], [[0,1],[1,2],[2,3]], 1)) // [6,3,3,3,3]