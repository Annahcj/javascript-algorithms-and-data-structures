// 3425. Longest Special Path
// You are given an undirected tree rooted at node 0 with n nodes numbered from 0 to n - 1, represented by a 2D array edges of length n - 1, where edges[i] = [u[i], v[i], length[i]] indicates an edge between nodes u[i] and v[i] with length length[i]. You are also given an integer array nums, where nums[i] represents the value at node i.
// A special path is defined as a downward path from an ancestor node to a descendant node such that all the values of the nodes in that path are unique.
// Note that a path may start and end at the same node.
// Return an array result of size 2, where result[0] is the length of the longest special path, and result[1] is the minimum number of nodes in all possible longest special paths.


// Solution: DFS & Sliding Window w/ Prefix Sum

// DFS starting from node 0, and use a hashmap to store an array of nodes for every distinct node value. As we backtrack, pop the nodes off the arrays.
// Maintain a sliding window of unique node values.
// Keep track of the lowest ancestor in the window, which we update whenever we find a duplicate node value in the path.

// Store the prefix path length and the depth of each node.
// To find the path length of the window: prefixPathLength[current node] - prefixPathLength[immediate neighbor of lowest valid ancestor]
// To find the number of nodes in the window: levelMap[current node] - levelMap[lowest valid ancestor]

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 538ms
// Space Complexity: O(n + m) 129.37MB
function longestSpecialPath(edges, nums) {
  const n = nums.length, graph = Array(n).fill(0).map(() => []);
  for (let [u, v, length] of edges) {
    graph[u].push([v, length]);
    graph[v].push([u, length]);
  }
  const nodesMap = {};
  const prefixPathLength = Array(n + 1).fill(0); // prefixPathLength[i] = prefix sum of path lengths from node 0 to node i
  const optimisticPrefixPathLength = Array(n + 1).fill(0); // prefix path length but including the immediate neighbor path length, needed for sliding window calculation
  const levelMap = Array(n + 1);
  levelMap[n] = -1; // for complete paths starting from node 0
  let longestPath = 0, minNodesInLongestPath = Infinity;
  dfs(0, -1, n, 0);
  return [longestPath, minNodesInLongestPath];

  function dfs(node, parent, lastValidAncestor, currLevel) {
    levelMap[node] = currLevel;
    if (!nodesMap[nums[node]]) nodesMap[nums[node]] = [];
    if (nodesMap[nums[node]].length) {
      const latestDupNode = nodesMap[nums[node]][nodesMap[nums[node]].length - 1];
      // the last valid ancestor should be the lowest possible ancestor in terms of depth
      lastValidAncestor = levelMap[latestDupNode] > levelMap[lastValidAncestor] ? latestDupNode : lastValidAncestor;
    }
    const pathLength = prefixPathLength[node] - optimisticPrefixPathLength[lastValidAncestor];
    const nodesInPath = levelMap[node] - levelMap[lastValidAncestor];
    if (pathLength > longestPath) {
      longestPath = pathLength;
      minNodesInLongestPath = nodesInPath;
    } else if (pathLength === longestPath) {
      minNodesInLongestPath = Math.min(minNodesInLongestPath, nodesInPath);
    }

    nodesMap[nums[node]].push(node);
    for (let [nei, length] of graph[node]) {
      if (nei === parent) continue;
      prefixPathLength[nei] = prefixPathLength[node] + length;
      optimisticPrefixPathLength[node] = prefixPathLength[nei];
      dfs(nei, node, lastValidAncestor, currLevel + 1);
    }
    nodesMap[nums[node]].pop(); // backtrack
  }
};

// Two test cases
console.log(longestSpecialPath([[0,1,2],[1,2,3],[1,3,5],[1,4,4],[2,5,6]], [2,1,2,1,3,1])) // [6,2]
console.log(longestSpecialPath([[1,0,8]], [2,2])) // [0,1]