// 1857. Largest Color Value in a Directed Graph
// There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.
// You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.
// A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.
// Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.


// Solution: Topological Sort & Dynamic Programming

// Reasons for using topological sort:
  // 1. We need topological sort to process each node in a order such that all paths to get to a certain node have been used.
    // We need to use up all paths leading to a node because we need the correct color frequency information to pass to the next nodes
    // After all paths to a node has been fully processed, we can use the color frequencies of that node to update the max frequency of each color for paths leading to neighboring nodes.
  // 2. It can be used to detect cycles (if not all nodes end up having an indegree of 0, we know there is a cycle)

// Keep track of count, where count[i][j] = maximum count of color j for all paths from ancestor nodes to node i.

// Time Complexity: O(n + 26m) = O(n + m) 1179ms
// Space Complexity: O(26n) = O(n) 178.5MB
var largestPathValue = function(colors, edges) {
  if (!edges.length) return 1;
  let n = colors.length, graph = Array(n).fill(0).map(() => []);
  let count = Array(n).fill(0).map(() => Array(26).fill(0)), indegrees = Array(n).fill(0);
  for (let [x, y] of edges) {
    indegrees[y]++;
    graph[x].push(y);
  }
  
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
      count[i][colors.charCodeAt(i) - 97] = 1; 
    }
  }
  
  let ans = 0;
  while (queue.length) {
    let node = queue.shift();
    n--;
    let maxVal = Math.max(...count[node]); // maximum color frequency for all paths to this node
    ans = Math.max(ans, maxVal);
    
    for (let nei of graph[node]) {
      // update max value for each color for neighbor node
      for (let i = 0; i < 26; i++) {
        let neiCharCode = colors.charCodeAt(nei) - 97;
        let neiVal = neiCharCode === i ? 1 : 0;
        count[nei][i] = Math.max(count[nei][i], count[node][i] + neiVal);
      }
      indegrees[nei]--;
      if (indegrees[nei] === 0) queue.push(nei);
    }
    graph[node] = [];
  }
  return n === 0 ? ans : -1;
};

// Two test cases
console.log(largestPathValue("abaca", [[0,1],[0,2],[2,3],[3,4]])) // 3
console.log(largestPathValue("a", [[0,0]])) // -1