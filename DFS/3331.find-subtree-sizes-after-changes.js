// 3331. Find Subtree Sizes After Changes
// You are given a tree rooted at node 0 that consists of n nodes numbered from 0 to n - 1. The tree is represented by an array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.
// You are also given a string s of length n, where s[i] is the character assigned to node i.
// We make the following changes on the tree one time simultaneously for all nodes x from 1 to n - 1:
  // Find the closest node y to node x such that y is an ancestor of x, and s[x] == s[y].
  // If node y does not exist, do nothing.
  // Otherwise, remove the edge between x and its current parent and make node y the new parent of x by adding an edge between them.
// Return an array answer of size n where answer[i] is the size of the subtree rooted at node i in the final tree.


// Solution: DFS

// DFS over the tree, keeping track of the current node, and the closest ancestor for every character.
// ancestor[char] = closest ancestor y of the current node, where s[y] = char.

// For every dfs(node, ancestor),
  // If there is an ancestor with the same character as the current s[node], add the subtree size of s[node] to the ancestor node.
  // Otherwise, add the subtree size of s[node] to the immediate parent node.
// Update the ancestor node for the current character: ancestor[s.charCodeAt(node) - 97] = node

// n = number of nodes in the tree
// Time Complexity: O(n) 529ms
// Space Complexity: O(n) 137.08MB
function findSubtreeSizes(p, s) {
  const n = p.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 1; i < n; i++) {
    graph[p[i]].push(i);
  }
  const subtreeSize = Array(n).fill(1);
  dfs(0, Array(26).fill(-1));
  return subtreeSize;

  function dfs(node, ancestor) {
    const prevAncestor = ancestor[s.charCodeAt(node) - 97];
    ancestor[s.charCodeAt(node) - 97] = node;
    for (let nei of graph[node]) {
      dfs(nei, ancestor);
      if (ancestor[s.charCodeAt(nei) - 97] !== -1) {
        subtreeSize[ancestor[s.charCodeAt(nei) - 97]] += subtreeSize[nei];
      } else {
        subtreeSize[node] += subtreeSize[nei];
      }
    }
    ancestor[s.charCodeAt(node) - 97] = prevAncestor;
  }
};

// Two test cases
console.log(findSubtreeSizes([-1,0,0,1,1,1], "abaabc")) // [6,3,1,1,1,1]
console.log(findSubtreeSizes([-1,0,4,0,1], "abbba")) // [5,2,1,1,1]