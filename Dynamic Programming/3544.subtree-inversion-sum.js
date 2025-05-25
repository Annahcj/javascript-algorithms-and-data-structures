// 3544. Subtree Inversion Sum
// You are given an undirected tree rooted at node 0, with n nodes numbered from 0 to n - 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates an edge between nodes ui and vi.
// You are also given an integer array nums of length n, where nums[i] represents the value at node i, and an integer k.
// You may perform inversion operations on a subset of nodes subject to the following rules:
  // Subtree Inversion Operation:
    // When you invert a node, every value in the subtree rooted at that node is multiplied by -1.
  // Distance Constraint on Inversions:
    // You may only invert a node if it is "sufficiently far" from any other inverted node.
    // Specifically, if you invert two nodes a and b such that one is an ancestor of the other (i.e., if LCA(a, b) = a or LCA(a, b) = b), then the distance (the number of edges on the unique path between them) must be at least k.
// Return the maximum possible sum of the tree's node values after applying inversion operations.


// Solution: DP

// Memoize each dp(node, lastInversed, inversed), where
  // node = the current node
  // lastInversed = distance from the last inversed ancestor
  // inversed = whether the current subtree is inversed

// For each dp(node, lastInversed, inversed), we have two choices:
  // 1. If lastInversed >= k, we can invert the subtree rooted at the current node.
  // 2. Or not invert and take the current value as it is.

// Return the maximum sum out of the two choices.

// n = number of nodes
// Time Complexity: O(nk) 1398ms
// Space Complexity: O(nk) 172MB
function subtreeInversionSum(edges, nums, k) {
  const n = nums.length, graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const memo = Array(n).fill(0).map(() => Array(2).fill(0).map(() => Array(k + 1).fill(null)));
  return dp(0, -1, k, 0);

  function dp(node, parent, lastInverseDist, inversed) {
    if (memo[node][inversed][lastInverseDist] !== null) return memo[node][inversed][lastInverseDist];

    let notInverse = nums[node] * (inversed ? -1 : 1);
    let inverse = nums[node] * -1 * (inversed ? -1 : 1);
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      notInverse += dp(nei, node, Math.min(k, lastInverseDist + 1), inversed);
      if (lastInverseDist === k) {
        inverse += dp(nei, node, 1, 1 ^ inversed);
      }
    }
    return memo[node][inversed][lastInverseDist] = Math.max(notInverse, lastInverseDist === k ? inverse : -Infinity);
  }
};

// Two test cases
console.log(subtreeInversionSum([[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], [4,-8,-6,3,7,-2,5], 2)) // 27
console.log(subtreeInversionSum([[0,1],[1,2],[2,3],[3,4]], [-1,3,-2,4,-5], 2)) // 9