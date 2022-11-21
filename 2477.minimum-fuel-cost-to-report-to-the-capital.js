// 2477. Minimum Fuel Cost to Report to the Capital
// There is a tree (i.e., a connected, undirected graph with no cycles) structure country network consisting of n cities numbered from 0 to n - 1 and exactly n - 1 roads. The capital city is city 0. You are given a 2D integer array roads where roads[i] = [a[i], b[i]] denotes that there exists a bidirectional road connecting cities ai and bi.
// There is a meeting for the representatives of each city. The meeting is in the capital city.
// There is a car in each city. You are given an integer seats that indicates the number of seats in each car.
// A representative can use the car in their city to travel or change the car and ride with another representative. The cost of traveling between two cities is one liter of fuel.
// Return the minimum number of liters of fuel to reach the capital city.


// Solution: Post Order DFS

// Count the number of representatives passing through each node i.
// The number of cars needed at node i = Math.ceil(number of representatives at node i / seats).
// Use post order DFS to find the number of representatives at each node.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 760ms
// Space Complexity: O(n + m) 161.2MB
var minimumFuelCost = function(roads, seats) {
  let n = roads.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of roads) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let ans = 0;
  dfs(0, -1);
  return ans;
  
  function dfs(node, prev) {
    let pplCount = 1;
    for (let nei of graph[node]) {
      if (nei === prev) continue;
      pplCount += dfs(nei, node);
    }
    let cost = Math.ceil(pplCount / seats);
    if (node !== 0) ans += cost;
    return pplCount;
  }
};

// Two test cases
console.log(minimumFuelCost([[3,1],[3,2],[1,0],[0,4],[0,5],[4,6]], 2)) // 7
console.log(minimumFuelCost([], 0)) // 0