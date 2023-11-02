// 1443. Minimum Time to Collect All Apples in a Tree
// Given an undirected tree consisting of n vertices numbered from 0 to n-1, which has some apples in their vertices. You spend 1 second to walk over one edge of the tree. Return the minimum time in seconds you have to spend to collect all apples in the tree, starting at vertex 0 and coming back to this vertex.
// The edges of the undirected tree are given in the array edges, where edges[i] = [ai, bi] means that exists an edge connecting the vertices ai and bi. Additionally, there is a boolean array hasApple, where hasApple[i] = true means that vertex i has an apple; otherwise, it does not have any apple.


// Solution: DFS 

// Each edge in the path of an apple can be traversed 2 times to get the minimum time.
// This is because if there are apples along the same path, we still only traverse an edge once when going down and once when going back up, since the edge can be shared.
// Use recursive DFS to check whether an edge leads to an apple.
  // dfs(node) returns whether the subtree with root of node contains an apple.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 313ms
// Space Complexity: O(n + m) 103.7MB
var minTime = function(n, edges, apple) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let count = 0, seen = Array(n).fill(0);
  dfs(0);
  return count;
  
  function dfs(node) { // returns true if the tree with root of node contains an apple
    seen[node] = 1;
    let hasApple = apple[node];
    for (let child of graph[node]) {
      if (seen[child]) continue;
      let subtree = dfs(child);
      hasApple = hasApple || subtree;
      if (subtree) count += 2;
    }
    return hasApple;
  }
};

// Two test cases
console.log(minTime(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], [false,false,true,false,true,true,false])) // 8
console.log(minTime(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], [false,false,true,false,false,true,false])) // 6