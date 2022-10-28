// 1377. Frog Position After T Seconds
// Given an undirected tree consisting of n vertices numbered from 1 to n. A frog starts jumping from vertex 1. In one second, the frog jumps from its current vertex to another unvisited vertex if they are directly connected. The frog can not jump back to a visited vertex. In case the frog can jump to several vertices, it jumps randomly to one of them with the same probability. Otherwise, when the frog can not jump to any unvisited vertex, it jumps forever on the same vertex.
// The edges of the undirected tree are given in the array edges, where edges[i] = [ai, bi] means that exists an edge connecting the vertices ai and bi.
// Return the probability that after t seconds the frog is on the vertex target. Answers within 10^-5 of the actual answer will be accepted.


// Solution 1: DFS

// DFS starting from node 1.
// Keep track of the probability of reaching every node from node 1.

// We only care about the probability for the path from node 1 to target.
// At node 1, we have a probability of 1.
// From there, every neighbor node we go to will have a probability of: probability[neighbor] = probability[node] / number of valid neighbor nodes.

// If we can't reach the target, the probability will be 0.
// When we reach the target, there can be two valid cases:
  // 1. The current time is equal to t.
  // 2. The current time is smaller than or equal to t and we are on a leaf node (no unvisited children). (When we reach a leaf node, the frog will jump in place)
// When neither of the above two cases are true after reaching the target, set the probability to 0.

// Time Complexity: O(n + m) 152ms
// Space Complexity: O(n + m) 50MB
var frogPosition = function(n, edges, t, target) {
  let graph = Array(n + 1).fill(0).map(() => []);
  let probability = Array(n + 1).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let seen = Array(n + 1).fill(0);
  probability[1] = 1;
  dfs(1, 0);
  return probability[target];
  
  function dfs(node, time) {
    seen[node] = 1;
    let validNextNodes = 0;
    for (let nei of graph[node]) {
      if (!seen[nei]) validNextNodes++;
    }
    if (node === target) {
      let isLeafNode = validNextNodes === 0;
      if ((isLeafNode && time > t) || (!isLeafNode && time !== t)) {
        probability[node] = 0;
      }
      return;
    }
    for (let nei of graph[node]) {
      if (seen[nei]) continue;
      probability[nei] = probability[node] / validNextNodes;
      dfs(nei, time + 1);
    }
  }  
};


// Solution 2: BFS

// Level by level BFS starting from node 1.
// Keep track of the probability of reaching every node from node 1.
// The logic is the same as solution 1, except we use BFS instead of DFS.

// Time Complexity: O(n + m) 126ms
// Space Complexity: O(n + m) 52.3MB
var frogPosition = function(n, edges, t, target) {
  let graph = Array(n + 1).fill(0).map(() => []);
  let probability = Array(n + 1).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  
  let queue = [1], seen = Array(n + 1).fill(0), time = 0;
  probability[1] = 1, seen[1] = 1;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let node = queue.shift();
      let validNextNodes = 0;
      for (let nei of graph[node]) {
        if (seen[nei]) continue;
        validNextNodes++;
      }
      
      if (node === target) {
        let isLeafNode = validNextNodes === 0;
        if ((isLeafNode && time > t) || (!isLeafNode && time !== t)) {
          probability[node] = 0;
        }
        return probability[node];
      }
      
      for (let nei of graph[node]) {
        if (seen[nei]) continue;
        probability[nei] = probability[node] / validNextNodes;
        seen[nei] = 1;
        queue.push(nei);
      }
    }
    time++;
  }
  return 0;
};

// Two test cases
console.log(frogPosition(7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 2, 4)) // 0.16666666666666666 
console.log(frogPosition(7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 1, 7)) // 0.3333333333333333