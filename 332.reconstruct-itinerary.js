// 332. Reconstruct Itinerary
// You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.
// All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.
// For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.


// Solution 1: Backtracking & Greedy Approach

// 1. Construct graph (src: [dest, dest, ...], src: [dest, ...])
  // Also keep an id for each ticket/edge so that we know whether we've used it or not
// 2. Sort destinations of each source in ascending order (greedy: looking for lowest possible path first)
// 3. Backtrack to find the first viable path (path that has exactly tickets.length + 1 vertices)

// d = number of destinations from each source, E = number of edges, V = number of vertices
// Time Complexity: O(d^E) 104ms
// Space Complexity: O(V + E) 47.1MB
var findItinerary = function(tickets) {
  // backtracking
  let graph = {};
  for (var i = 0; i < tickets.length; i++) {
    let [src, dest] = tickets[i];
    if (!graph[src]) graph[src] = [];
    graph[src].push({dest, i});
  } 
  for (var src in graph) {
    graph[src].sort((a, b) => {
      return a.dest.localeCompare(b.dest);
    });
  } 

  let res = [], visited = new Set();
  backtrack('JFK', ['JFK']);
  return res;

  function backtrack(src, path) {
    if (path.length === tickets.length + 1) {
      res = [...path];
      return true;
    }
    if (!graph[src]) return false;
    for (var {dest, i} of graph[src]) {
      if (!visited.has(i)) {
        visited.add(i);
        path.push(dest);
        if (backtrack(dest, path)) return true;
        visited.delete(i);
        path.pop();
      }
    }
  }
};


// Solution 2: Hierholzer's Algorithm

// Find the last node in the itinerary, then work backwards: the first node that has no more outgoing edges
// When a node has no more outgoing edges, we push that node to our path, and go back to the last state.
// Since the answer will be constructed in reverse order, reverse it before returning it.

// Time Complexity: O(E log(E)) 84ms
// Space Complexity: O(V + E) 42.4MB
var findItinerary = function(tickets) {
  let graph = {};
  for (var i = 0; i < tickets.length; i++) {
    let [src, dest] = tickets[i];
    if (!graph[src]) graph[src] = [];
    if (!graph[dest]) graph[dest] = [];
    graph[src].push(dest);
  } 
  for (var src in graph) {
    graph[src].sort();
  } 

  let res = [];
  dfs('JFK');
  return res.reverse();

  function dfs(src) {
    while (graph[src].length) {
      let dest = graph[src].shift();
      dfs(dest);
    }
    res.push(src);
  }
};

// Four test cases to run function on
console.log(findItinerary([["EZE","AXA"],["TIA","ANU"],["ANU","JFK"],["JFK","ANU"],["ANU","EZE"],["TIA","ANU"],["AXA","TIA"],["TIA","JFK"],["ANU","TIA"],["JFK","TIA"]])) // ["JFK","ANU","EZE","AXA","TIA","ANU","JFK","TIA","ANU","TIA","JFK"]
console.log(findItinerary([["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]])) // ["JFK","NRT","JFK","KUL"]
console.log(findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]])) // ["JFK","MUC","LHR","SFO","SJC"]
console.log(findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]])) // ["JFK","ATL","JFK","SFO","ATL","SFO"]