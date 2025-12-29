// 3786. Total Sum of Interaction Cost in Tree Groups
// You are given an integer n and an undirected tree with n nodes numbered from 0 to n - 1. This is represented by a 2D array edges of length n - 1, where edges[i] = [ui, vi] indicates an undirected edge between nodes ui and vi.
// You are also given an integer array group of length n, where group[i] denotes the group label assigned to node i.
  // Two nodes u and v are considered part of the same group if group[u] == group[v].
  // The interaction cost between u and v is defined as the number of edges on the unique path connecting them in the tree.
// Return an integer denoting the sum of interaction costs over all unordered pairs (u, v) with u != v such that group[u] == group[v].


// Solution: DFS w/ Rerooting

// 1. DFS from node 0 and calculate distances from 0 to every other node.
  // subtreeDist[i][j] = sum of distances from node i to every other descendent in the subtree, in the group j.
  // For every group, set subtreeDist[i][j] using the sum of child results.
// 2. Reroot, try every other node as the new root.
  // dist[i][j] = total distance from node i to every other node in group j.
  // To reroot from parent to the current node, 
    // Parent total sum - current node's subtree sum + number of nodes not in the current node's subtree (+1 distance for rerooting)
    // + subtree distance for current node's subtree.

// n = number of nodes, k = max(group[i])
// Time Complexity: O(nk) 2781ms
// Space Complexity: O(nk) 255MB
function interactionCosts(n, edges, group) {
  const graph = Array(n).fill(0).map(() => []);
  const k = Math.max(...group);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const subtreeDist = Array(n).fill(0).map(() => Array(k + 1).fill(0));
  const nodeCount = Array(n).fill(0).map(() => Array(k + 1).fill(0));
  for (let i = 0; i < n; i++) {
    nodeCount[i][group[i]] = 1;
  }
  dfsFrom0(0, -1);
  const dist = Array(n).fill(0).map(() => Array(k + 1).fill(0));
  dist[0] = subtreeDist[0];
  reroot(0, -1);
  return dist.reduce((acc, d, i) => acc + d[group[i]], 0) / 2;

  function reroot(node, parent) {
    for (let i = 1; i <= k; i++) {
      for (let nei of graph[node]) {
        if (nei === parent) continue;
        // parent total - current subtree's total + 1 distance away switching to new root
        const parentDistWithoutCurrent = dist[node][i] - (subtreeDist[nei][i] + nodeCount[nei][i]) + (nodeCount[0][i] - nodeCount[nei][i]);
        dist[nei][i] = parentDistWithoutCurrent + subtreeDist[nei][i];
      }
    }
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      reroot(nei, node);
    }
  }

  function dfsFrom0(node, parent) {
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      dfsFrom0(nei, node);
    }
    for (let i = 1; i <= k; i++) {
      for (let nei of graph[node]) {
        if (nei === parent) continue;
        subtreeDist[node][i] += subtreeDist[nei][i] + nodeCount[nei][i];
        nodeCount[node][i] += nodeCount[nei][i];
      }
    }
  }
};

// Three test cases
console.log(interactionCosts(3, [[0,1],[1,2]], [1,1,1])) // 4
console.log(interactionCosts(3, [[0,1],[1,2]], [3,2,3])) // 2
console.log(interactionCosts(4, [[0,1],[0,2],[0,3]], [1,1,4,4])) // 3