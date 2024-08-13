// 3249. Count the Number of Good Nodes
// There is an undirected tree with n nodes labeled from 0 to n - 1, and rooted at node 0. You are given a 2D integer array edges of length n - 1, where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree.
// A node is good if all the subtrees rooted at its children have the same size.
// Return the number of good nodes in the given tree.
// A subtree of treeName is a tree consisting of a node in treeName and all of its descendants.


// Solution: Post-Order DFS

// Post-order DFS to get the size of each child subtree.
// Use a hashset to keep track of how many different subtree sizes there are, if the hashset has more than one element, then the tree is not good.

// Time Complexity: O(n) 1021ms
// Space Complexity: O(n) 147.1MB
function countGoodNodes(edges) {
  let n = edges.length + 1;
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let good = 0;
  dfs(0, -1);
  return good;
  
  function dfs(node, parent) {
    let sizes = new Set(), size = 1;
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      let neiSize = dfs(nei, node);
      sizes.add(neiSize);
      size += neiSize;
    }
    if (sizes.size <= 1) good++;
    return size;
  }  
};

// Three test cases
console.log(countGoodNodes([[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]])) // 7
console.log(countGoodNodes([[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,8]])) // 6
console.log(countGoodNodes([[0,1],[1,2],[1,3],[1,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[9,12],[10,11]])) // 12