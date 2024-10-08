// 3310. Remove Methods From Project
// You are maintaining a project that has n methods numbered from 0 to n - 1.
// You are given two integers n and k, and a 2D integer array invocations, where invocations[i] = [ai, bi] indicates that method ai invokes method bi.
// There is a known bug in method k. Method k, along with any method invoked by it, either directly or indirectly, are considered suspicious and we aim to remove them.
// A group of methods can only be removed if no method outside the group invokes any methods within it.
// Return an array containing all the remaining methods after removing all the suspicious methods. You may return the answer in any order. If it is not possible to remove all the suspicious methods, none should be removed.

 
// Solution: DFS / Graph Logic

// Traverse the graph starting from k and mark nodes connected to k as visited.
// If there exists any invocation that points to the group connected to k, but is not visited, that node is outside of the group.

// This logic covers the following scenarios:
  // 1. If no nodes directly invoke k, all methods in the group can be removed.
  // 2. If k is part of a cycle and all connected nodes are part of the cycle, all methods in the group can be removed.
  // 3. If k is part of a cycle and there are connected nodes that are NOT part of the cycle, all methods in the group can be removed.

// n = number of nodes, m = number of invocations
// Time Complexity: O(n + m) 806ms
// Space Complexity: O(n + m) 138.8MB
function remainingMethods(n, k, invocations) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of invocations) {
    graph[a].push(b);
  }
  let visited = Array(n).fill(false);
  dfs(k);
  for (let [a, b] of invocations) {
    // outside node connected to the group with k
    if (visited[b] && !visited[a]) {
      return Array(n).fill(0).map((_, i) => i);
    }
  }
  let methods = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      methods.push(i);
    }
  }
  return methods;
  
  function dfs(node) {
    visited[node] = true;
    for (let nei of graph[node]) {
      if (!visited[nei]) {
        dfs(nei);
      }
    }
  }
};

// Three test cases
console.log(remainingMethods(4, 1, [[1,2],[0,1],[3,2]])) // [0,1,2,3]
console.log(remainingMethods(5, 0, [[1,2],[0,2],[0,1],[3,4]])) // [3,4]
console.log(remainingMethods(3, 2, [[1,2],[0,1],[2,0]])) // []