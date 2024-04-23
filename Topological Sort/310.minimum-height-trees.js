// 310. Minimum Height Trees
// A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
// Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).
// Return a list of all MHTs' root labels. You can return the answer in any order.


// Solution: Topological Sort

// Use topological sort to traverse the tree starting from leaf nodes, and work our way in level-by-level until we reach at most 2 middle nodes.
// Topological sort traverses nodes in a breadth-first manner, meaning that by the time we reach the inner middle nodes, the leaf nodes will be the furthest away.
// The inner nodes are always guaranteed to be the minimum height roots, because it's in the middle and not skewed such that one side is longer than the other.

// Explanation of why there can be at most 2 root nodes:
  // There can be at most 2 nodes in the middle.
  // Because the tree cannot have cycles, the only situation with three nodes leftover is:
    //   1
    //  / \
    // 2   3
  // When there are three middle nodes, the root will ultimately be 1 middle node, as node 1 is the only node still with 2 dependencies, and nodes 2 and 3 are the leaf nodes here.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 158ms
// Space Complexity: O(n + m) 71MB
var findMinHeightTrees = function(n, edges) {
  let graph = Array(n).fill(0).map(() => []);
  let indegrees = Array(n).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    indegrees[a]++;
    indegrees[b]++;
  }
  let queue = [];
  for (let node = 0; node < n; node++) {
    if (indegrees[node] <= 1) {
      queue.push(node);
    }
  }
  let remaining = n;
  while (remaining > 2) {
    let next = [];
    while (queue.length) {
      let node = queue.pop();
      remaining--;
      while (graph[node].length > 0) {
        let nei = graph[node].pop();
        indegrees[nei]--;
        if (indegrees[nei] === 1) {
          next.push(nei);
        }
      }
    }
    queue = next;
  }
  return queue;
};

// Five test cases
console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]])) // [1]
console.log(findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]])) // [3,4]
console.log(findMinHeightTrees(1, [])) // [0]
console.log(findMinHeightTrees(2, [[0,1]])) // [0,1]
console.log(findMinHeightTrees(3, [[0,1],[0,2]])) // [0]