// 2509. Cycle Length Queries in a Tree
// You are given an integer n. There is a complete binary tree with 2n - 1 nodes. The root of that tree is the node with the value 1, and every node with a value val in the range [1, 2n - 1 - 1] has two children where:
  // The left node has the value 2 * val, and
  // The right node has the value 2 * val + 1.
// You are also given a 2D integer array queries of length m, where queries[i] = [a[i], b[i]]. For each query, solve the following problem:
  // 1. Add an edge between the nodes with values a[i] and b[i].
  // 2. Find the length of the cycle in the graph.
  // 3. Remove the added edge between nodes with values a[i] and b[i].
// Note that:
  // A cycle is a path that starts and ends at the same node, and each edge in the path is visited only once.
  // The length of a cycle is the number of edges visited in the cycle.
  // There could be multiple edges between two nodes in the tree after adding the edge of the query.
// Return an array answer of length m where answer[i] is the answer to the ith query.


// Solution: Lowest Common Ancestor

// For each [a, b] in queries,
  // Find the distance between node a and b.
  // To find the distance between node a and b, we need to find the distance of each node from the lowest common ancestor of (a, b).
  // The length of the cycle = 1 + (distance of node a from LCA) + (distance of node b from LCA).

// To find the length of the cycle:
  // We know that if a > b, a is on a deeper level than b (because all nodes at level x will be smaller than nodes at level x + 1).
  // If a > b, move a up to the parent node. Otherwise move b up to the parent node.
  // To find the parent node: Math.floor(x / 2)
  // Traverse to the parents of each node until both a and b are equal (find the lowest common ancestor).
  // Keep track of the number of times we traversed a parent node.
  // Return the count + 1.

// m = number of queries, n = height of the tree
// Time Complexity: O(mn) 342ms
// Space Complexity: O(m) 73.5MB
var cycleLengthQueries = function(n, queries) {
  let m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [a, b] = queries[i];
    ans[i] = findCycleLen(a, b);
  }
  return ans;
};

function findCycleLen(a, b) {
  let len = 0;
  while (a !== b) {
    if (a > b) {
      a = Math.floor(a / 2);
    } else {
      b = Math.floor(b / 2);
    }
    len++;
  }
  return len + 1;
}

// Two test cases
console.log(cycleLengthQueries(3, [[5,3],[4,7],[2,3]])) // [4,5,3]
console.log(cycleLengthQueries(2, [[1,2]])) // [2]