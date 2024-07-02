// 3203. Find Minimum Diameter After Merging Two Trees
// There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the first tree and edges2[i] = [u[i], v[i]] indicates that there is an edge between nodes u[i] and v[i] in the second tree.
// You must connect one node from the first tree with another node from the second tree with an edge.
// Return the minimum possible diameter of the resulting tree.
// The diameter of a tree is the length of the longest path between any two nodes in the tree.


// Solution: Topological Sort

// For each tree, we want to pick the root with the minimum maximum path length.
// Once we find those two roots, connecting those two nodes with an edge gives us the minimum possible diameter after merging.
// Note: It's possible that the longest path comes from the path within the tree from a leaf node to another leaf node (not through the root).

// Use topological sort to find the minimum maximum height and diameter of each tree.
// Topogical sort finds the minimum maximum height by starting from the leaves and going inwards until reaching the middle nodes.
// Note: Indegrees is usually enough to determine whether we've visited each node, but in the case of 1 <-> 2, both nodes will be initially in the queue and won't meet the --indegrees[nei] === 1 condition, so we need an additional array `seen` to keep track of the true visited state in order to get the correct depths.

// Time Complexity: O(n + m) 1003ms
// Space Complexity: O(n + m) 129.9MB
function minimumDiameterAfterMerge(edges1, edges2) {
  let [maxHeight1, diameter1] = getDiameterAndMaxHeight(edges1);
  let [maxHeight2, diameter2] = getDiameterAndMaxHeight(edges2);
  return Math.max(diameter1, diameter2, maxHeight1 + maxHeight2 + 1);
};

function getDiameterAndMaxHeight(edges) {
  let n = edges.length + 1;
  let graph = Array(n).fill(0).map(() => []);
  let indegrees = Array(n).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    indegrees[b]++;
    indegrees[a]++;
  }
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 1) {
      queue.push(i);
    }
  }
  let depth = Array(n).fill(0), seen = Array(n).fill(false);
  let maxDepth = 0, diameter = 0;
  while (queue.length) {
    let node = queue.shift();
    seen[node] = true;
    maxDepth = Math.max(maxDepth, depth[node]);
    for (let nei of graph[node]) {
      if (--indegrees[nei] === 1) {
        queue.push(nei);
      }
      if (!seen[nei]) {
        diameter = Math.max(diameter, depth[node] + depth[nei] + 1);
        depth[nei] = Math.max(depth[nei], depth[node] + 1);
      }
    }
  }
  return [maxDepth, diameter];
}

// Two test cases
console.log(minimumDiameterAfterMerge([[0,1],[0,2],[0,3]], [[0,1]])) // 3
console.log(minimumDiameterAfterMerge([[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]])) // 5