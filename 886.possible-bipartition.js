// 886. Possible Bipartition
// We want to split a group of n people (labeled from 1 to n) into two groups of any size. Each person may dislike some other people, and they should not go into the same group.
// Given the integer n and the array dislikes where dislikes[i] = [ai, bi] indicates that the person labeled ai does not like the person labeled bi, return true if it is possible to split everyone into two groups in this way.


// Solution 1: Recursive DFS

// For each node, its neighbors must be in a different group. 
// Traverse every node from 1 to n, if there are conflicts (neighbors belonging to the same group), return false.

// map[i] = the group which node i belongs to. 
  // -1: not visited
  // 0: belonging to group A
  // 1: belonging to group B

// Time Complexity: O(V + E) 104ms
// Space Complexity: O(V + E) 52.1MB
var possibleBipartition = function(n, dislikes) {
  let map = Array(n + 1).fill(-1);
  let graph = {};
  for (let i = 1; i <= n; i++) graph[i] = [];
  for (let [x, y] of dislikes) {
    graph[x].push(y);
    graph[y].push(x);
  }
  for (let i = 1; i <= n; i++) {
    if (map[i] > -1) continue;
    map[i] = 0;
    if (!dfs(i)) return false;
  }
  return true;
  
  function dfs(node) {
    let group = map[node];
    for (let nei of graph[node]) {
      if (map[nei] === -1) {
        map[nei] = group ^ 1; // 1 to 0, 0 to 1.
        dfs(nei);
      } else if (map[nei] === group) {
        return false;
      }
    }
    return true;
  }
};

// Solution 2: BFS

// The same idea as solution 1, but bfs may save a little space.

// Time Complexity: O(V + E) 96ms
// Space Complexity: O(V + E) 52MB
var possibleBipartition = function(n, dislikes) {
  let map = Array(n + 1).fill(-1);
  let graph = {};
  for (let i = 1; i <= n; i++) graph[i] = [];
  for (let [x, y] of dislikes) {
    graph[x].push(y);
    graph[y].push(x);
  }
  for (let i = 1; i <= n; i++) {
    let queue = [i];
    if (map[i] > -1) continue;
    map[i] = 0;
    while (queue.length) {
      let node = queue.shift();
      let group = map[node];
      for (let nei of graph[node]) {
        if (map[nei] === -1) {
          map[nei] = group ^ 1;
          queue.push(nei);
        } else if (map[nei] === group) {
          return false;
        }
      }
    }
  }
  return true;
};

// Two test cases to run function on
console.log(possibleBipartition(4, [[1,2],[1,3],[2,4]])) // true
console.log(possibleBipartition(3, [[1,2],[1,3],[2,3]])) // false