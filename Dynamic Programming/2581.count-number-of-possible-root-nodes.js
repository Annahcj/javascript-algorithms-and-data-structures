// 2581. Count Number of Possible Root Nodes
// Alice has an undirected tree with n nodes labeled from 0 to n - 1. The tree is represented as a 2D integer array edges of length n - 1 where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree.
// Alice wants Bob to find the root of the tree. She allows Bob to make several guesses about her tree. In one guess, he does the following:
  // Chooses two distinct integers u and v such that there exists an edge [u, v] in the tree.
  // He tells Alice that u is the parent of v in the tree.
// Bob's guesses are represented by a 2D integer array guesses where guesses[j] = [u[j], v[j]] indicates Bob guessed uj to be the parent of v[j].
// Alice being lazy, does not reply to each of Bob's guesses, but just says that at least k of his guesses are true.
// Given the 2D integer arrays edges, guesses and the integer k, return the number of possible nodes that can be the root of Alice's tree. If there is no such tree, return 0.


// Solution: DP - Recursion w/ Memoization

// Try to take each node as the root of the tree and count the number of correct guesses. If there are at least k correct guesses, add to the count.
// Memoize each dfs(parent, node).
// Since each (parent, node) represents an edge, the number of states will be at most 2 * number of edges.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 1276ms
// Space Complexity: O(n + m) 173.7MB
var rootCount = function(edges, guesses, k) {
  let n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let guessesSet = new Set(guesses.map(([u, v]) => `${u},${v}`));
  let memo = new Map(), ans = 0;
  for (let i = 0; i < n; i++) {
    ans += dfs(-1, i) >= k ? 1 : 0;
  }
  return ans;
  
  function dfs(parent, node) {
    let key = `${parent},${node}`;
    if (memo.has(key)) return memo.get(key);
    let correctGuesses = guessesSet.has(key) ? 1 : 0;
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      correctGuesses += dfs(node, nei);
    }
    memo.set(key, correctGuesses);
    return correctGuesses;
  }  
};

// Two test cases
console.log(rootCount([[0,1],[1,2],[1,3],[4,2]], [[1,3],[0,1],[1,0],[2,4]], 3)) // 3
console.log(rootCount([[0,1],[1,2],[2,3],[3,4]], [[1,0],[3,4],[2,1],[3,2]], 1)) // 5