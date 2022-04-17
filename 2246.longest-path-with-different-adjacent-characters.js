// 2246. Longest Path With Different Adjacent Characters
// You are given a tree (i.e. a connected, undirected graph that has no cycles) rooted at node 0 consisting of n nodes numbered from 0 to n - 1. The tree is represented by a 0-indexed array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.
// You are also given a string s of length n, where s[i] is the character assigned to node i.
// Return the length of the longest path in the tree such that no pair of adjacent nodes on the path have the same character assigned to them.


// Solution: DFS

// The longest path can consist of the the two maximum lengthed children paths + the current node.
// Use recursive DFS to find the depths/lengths of each path.
// Keep track of a global maximum path length: max path length + second max path length + 1 for each node
// Return the maximum path length for earlier calls.

// Time Complexity: O(n) 812ms
// Space Complexity: O(n) 107.3MB
var longestPath = function(parent, s) {
  let n = parent.length, graph = Array(n);
  for (let i = 0; i < n; i++) graph[i] = [];
  for (let i = 1; i < n; i++) {
    graph[parent[i]].push(i);
  }

  let ans = 1;
  dfs(0);
  return ans;

  function dfs(node) {
    let max = 0, secondMax = 0, res = 1;
    for (let child of graph[node]) {
      if (s[node] !== s[child]) {
        let depth = dfs(child);
        res = Math.max(res, depth + 1);

        if (depth > max) {
          secondMax = max;
          max = depth;
        } else if (depth > secondMax) secondMax = depth;
      } else {
        dfs(child);
      }
    }
    ans = Math.max(ans, max + secondMax + 1);
    return res;
  }
};

// Three test cases to run function on
console.log(longestPath([-1,0,0,1,1,2], "abacbe")) // 3
console.log(longestPath([-1,0,0,0], "aabc")) // 3
console.log(longestPath([-1], "z")) // 3