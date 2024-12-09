// 3373. Maximize the Number of Target Nodes After Connecting Trees II
// There exist two undirected trees with n and m nodes, labeled from [0, n - 1] and [0, m - 1], respectively.
// You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the first tree and edges2[i] = [u[i], v[i]] indicates that there is an edge between nodes u[i] and v[i] in the second tree.
// Node u is target to node v if the number of edges on the path from u to v is even. Note that a node is always target to itself.
// Return an array of n integers answer, where answer[i] is the maximum possible number of nodes that are target to node i of the first tree if you had to connect one node from the first tree to another node in the second tree.
// Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.


// Solution: DFS w/ Rerooting

// The node to connect to in the second tree should always be the same - the one with the maximum amount of odd-lengthed paths.

// In the first tree, DFS w/ rerooting to find the number of even paths from every node i as the root.
// Do the same for the second tree, but count odd paths instead of even.

// Rerooting:
  // 1. First DFS from any arbitrary node (let's pick 0) and find the count of even and odd paths for every subtree.
    // subtreePaths[i][even/odd] = even or odd paths with node i as the root, starting from node 0.
    // Post order DFS to return the sum of even/odd paths from the children, flip the results since the path lengths change by 1 when adding the current node.

  // 2. DFS and try to assign every node i as the new root, using the parent's results and subtree results to infer the path count.
    // paths[i][even/odd] = even of odd paths with node i as the root.
    // To assign j as the new root, flip the parent's odd/even counts and j's children's odd/even counts.
    // parent's odd/even counts not including j in children: paths[i][even/odd] - subtreePaths[j][even/odd].
    // Total odd paths: parent's even paths + j's odd paths.
    // Total even paths: parent's odd paths + j's even paths.

// Time Complexity: O(n + m) 1385ms
// Space Complexity: O(n + m) 191.3MB
function maxTargetNodes(edges1, edges2) {
  let n = edges1.length + 1, m = edges2.length + 1;
  let graph1 = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges1) {
    graph1[a].push(b);
    graph1[b].push(a);
  }
  let graph2 = Array(m).fill(0).map(() => []);
  for (let [u, v] of edges2) {
    graph2[u].push(v);
    graph2[v].push(u);
  }
  
  const subtreePaths2 = evenOddPathsFrom0(graph2);
  const evenOddPaths2 = evenOddPaths(graph2, subtreePaths2);
  let maxOddPath2 = 0;
  for (let i = 0; i < m; i++) {
    maxOddPath2 = Math.max(maxOddPath2, evenOddPaths2[i][1]);
  }
  
  const subtreePaths1 = evenOddPathsFrom0(graph1);
  const evenOddPaths1 = evenOddPaths(graph1, subtreePaths1);
  const evenPaths = Array(n);
  for (let i = 0; i < n; i++) {
    evenPaths[i] = evenOddPaths1[i][0] + maxOddPath2;
  }
  return evenPaths;
  
  function evenOddPathsFrom0(graph) {
    let n = graph.length;
    const subtreePaths = Array(n).fill(0).map(() => Array(2).fill(0));
    dfs(0, -1);
    return subtreePaths;
    
    function dfs(node, parent) {
      let evenPaths = 1, oddPaths = 0;
      for (let nei of graph[node]) {
        if (nei === parent) continue;
        const [neiEvenPaths, neiOddPaths] = dfs(nei, node);
        evenPaths += neiOddPaths;
        oddPaths += neiEvenPaths;
      }
      subtreePaths[node] = [evenPaths, oddPaths];
      return [evenPaths, oddPaths];
    }
  }
  
  function evenOddPaths(graph, subtreePaths) {
    let n = graph.length;
    const paths = Array(n).fill(0).map(() => Array(2).fill(0));
    paths[0] = subtreePaths[0];
    dfs(0, -1);
    return paths;
    
    function dfs(node, parent) {
      for (let nei of graph[node]) {
        if (nei === parent) continue;
        // make nei the new root
        const parentEvenPaths = paths[node][0] - subtreePaths[nei][1];
        const parentOddPaths = paths[node][1] - subtreePaths[nei][0];
        paths[nei][0] = parentOddPaths + subtreePaths[nei][0];
        paths[nei][1] = parentEvenPaths + subtreePaths[nei][1];
        dfs(nei, node);
      }
    }
  }
};

// Two test cases
console.log(maxTargetNodes([[0,1],[0,2],[2,3],[2,4]], [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]])) // [8,7,7,8,8]
console.log(maxTargetNodes([[0,1],[0,2],[0,3],[0,4]], [[0,1],[1,2],[2,3]])) // [3,6,6,6,6]