// 1192. Critical Connections in a Network
// There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network.
// A critical connection is a connection that, if removed, will make some servers unable to reach some other server.
// Return all critical connections in the network in any order.


// Solution: Tarjan's Bridge Finding Algorithm

// For each node, keep track of its discovery time and it's low value (discovery time of the lowest node it's connected to)

// Time Complexity: O(V + E) 818ms
// Space Complexity: O(V + E) 164.4MB
var criticalConnections = function(n, connections) {
  let disc = Array(n), low = Array(n);
  let graph = {};
  for (let i = 0; i < n; i++) graph[i] = [];
  for (let [x, y] of connections) {
    graph[x].push(y);
    graph[y].push(x);
  } 
  let time = 0, res = [];
  dfs(0, -1);
  return res;

  function dfs(node, parent) {
    disc[node] = low[node] = time++;
    for (let neighbor of graph[node]) {
      if (neighbor === parent) continue; // don't go back on the path we just came from
      if (disc[neighbor] === undefined) { // use the disc array as a visited set, if we have been to neighbor before, disc would be populated with a number already.
        dfs(neighbor, node);
        low[node] = Math.min(low[node], low[neighbor]); // after the dfs is finished, set the low value of the node
        if (disc[node] < low[neighbor]) res.push([node, neighbor]); // if the discovery time of node is less than the low value of its neighbor, that means they are not in a cycle.
      } else {
        low[node] = Math.min(low[node], disc[neighbor]); // if we have visited neighbor before, set the low value of node
      } 
    }
  }
};

// Two test cases 
console.log(criticalConnections(4, [[0,1],[1,2],[2,0],[1,3]])) // [[1,3]]
console.log(criticalConnections(2, [[0,1]])) // [[0,1]]