// 399. Evaluate Division
// You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.
// You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.
// Return the answers to all queries. If a single answer cannot be determined, return -1.0.
// Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.


// Solution: DFS

// For each query [a, b], find a path between a and b using dfs.
// Each [x, y] in equations have a two-way relationship:
  // x -> y : values[i]
  // y -> x : 1 / values[i]

// m = number of queries, n = equations.length
// Time Complexity: O(mn) 117ms
// Space Complexity: O(n) 38.7MB 
var calcEquation = function(equations, values, queries) {
  let graph = {};
  for (var i = 0; i < equations.length; i++) {
    let [x, y] = equations[i];
    if (!graph[x]) graph[x] = [];
    if (!graph[y]) graph[y] = [];
    graph[x].push([y, values[i]]);
    graph[y].push([x, 1 / values[i]]);
  }
  
  let res = [];
  for (var [x, y] of queries) {
    if (!graph[x] || !graph[y]) res.push(-1); // x or y doesn't exist in graph.
    else res.push(dfs(x, y, new Set(), 1));
  }
  return res;
  
  function dfs(curr, target, seen, ans) {
    seen.add(curr);
    if (curr === target) return ans;
    for (var [next, val] of graph[curr]) {
      if (!seen.has(next)) {
        let res = dfs(next, target, seen, ans * val);
        if (res !== -1) return res;
      }
    }
    return -1;
  }
};

// Two test cases to run function on
console.log(calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]])) // [6.00000,0.50000,-1.00000,1.00000,-1.00000]
console.log(calcEquation([["a","b"],["b","c"],["bc","cd"]], [1.5,2.5,5.0], [["a","c"],["c","b"],["bc","cd"],["cd","bc"]])) // [3.75000,0.40000,5.00000,0.20000]