// 834. Sum of Distances in Tree
// Frequency: 42.90%
// There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.
// You are given the integer n and the array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// Return an array answer of length n where answer[i] is the sum of the distances between the ith node in the tree and all other nodes.


// Solution: Two DFS calls

// Logic:
// Create two seperate dfs functions, 
  // 1. Post-order Traversal, counting number of nodes for each subtree and distances to each node in each subtree.
  // 2. Pre-order Traversal, making use of arrays res and count to calculate distances for every other node apart from root (0).

// Create two arrays count and res both with a size of n, filled with 0's.

// DFS: (root, parent)
  // Loop through each neighbor in graph[root] *
    // If neighbor is equal to parent, continue. (skip it since we don't want to go backwards)
    // call dfs(neighbor, root)
    // increment count[root] by count[i] 
    // increment res[root] by res[i] + count[i] 
  // *
  // increment count[root] by one (count itself)


// After dfs is called, the values in res are the sum of the distances of each subtree. 
// What I mean by subtree is each node as if it's separated from its parent.
// The root (0) will already have a correct answer.

// The values in count are the number of nodes in each subtree.


// DFS2: (root, parent)
  // Loop through each neighbor in graph[root] *
    // If neighbor is equal to parent, continue.
    // set res[neighbor] to res[root] - res[neighbor] + n - res[neighbor]
    // (explaination of ^^: we have to calculate this value first before calling dfs2 since we need the correct sum of distance for the root)
    // (for any node, going to a neighbor means getting 1 step closer to ALL nodes in the subtree of neighbor, and 1 step further from ALL nodes NOT in the subtree of neighbor)
    // then, call dfs2(neighbor, root)

// call dfs(0, -1)
// call dfs2(0, -1)
// return res.

// Time Complexity: O(n) 396ms
// Space Complexity: O(n) 70.6MB
var sumOfDistancesInTree = function(n, edges) {
  let graph = {};
  for (var i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (var [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let count = Array(n).fill(0), res = Array(n).fill(0);
  dfs(0, -1);
  dfs2(0, -1);
  function dfs(root, parent) {
    for (var i of graph[root]) {
      if (i === parent) continue;
      dfs(i, root);
      count[root] += count[i];
      res[root] += res[i] + count[i];
    }
    count[root]++;
  }
  function dfs2(root, parent) {
    for (var i of graph[root]) {
      if (i === parent) continue;
      res[i] = res[root] - count[i] + n - count[i];
      dfs2(i, root);
    }
  }
  return res;
};

// Three test cases to run function on
console.log(sumOfDistancesInTree(6, [[0,1],[0,2],[2,3],[2,4],[2,5]])) // [8,12,6,10,10,10]
console.log(sumOfDistancesInTree(1, [])) // [0]
console.log(sumOfDistancesInTree(2, [[1,0]])) // [1,1]