// 2065. Maximum Path Quality of a Graph
// There is an undirected graph with n nodes numbered from 0 to n - 1 (inclusive). You are given a 0-indexed integer array values where values[i] is the value of the ith node. You are also given a 0-indexed 2D integer array edges, where each edges[j] = [uj, vj, timej] indicates that there is an undirected edge between the nodes uj and vj, and it takes timej seconds to travel between the two nodes. Finally, you are given an integer maxTime.
// A valid path in the graph is any path that starts at node 0, ends at node 0, and takes at most maxTime seconds to complete. You may visit the same node multiple times. The quality of a valid path is the sum of the values of the unique nodes visited in the path (each node's value is added at most once to the sum).
// Return the maximum quality of a valid path.
// Note: There are at most four edges connected to each node.


// Solution: Backtracking

// Runtime on LeetCode: 530ms
// Memory Usage on LeetCode: 45.3MB
var maximalPathQuality = function(values, edges, maxTime) {
  let n = values.length;
  let graph = {};
  // set up graph
  for (var i = 0; i < n; i++) {
    graph[i] = [];
  }
  // populate the graph
  for (var [source, target, time] of edges) {
    graph[source].push([target, time]);
    graph[target].push([source, time])
  }

  let maxScore = 0;
  // backtrack from node 0, current time of 0, current score of values[0], and a seen set (set 0 as seen).

  backtrack(0, 0, values[0], new Set([0]));

  function backtrack(node, currTime, score, seen) {
    // if currTime exceeds maxTime, return (no point going any further)
    if (currTime > maxTime) return;
    // if node is 0, update maxScore is necessary
    if (node === 0) maxScore = Math.max(maxScore, score);
    // loop through each neighbor of node
    for (var [neighbor, time] of graph[node]) {
      // if node has been visited already, backtrack without the extra points from the path
      if (seen.has(neighbor)) {
        backtrack(neighbor, currTime + time, score, seen);
      } else {
        // otherwise, set neighbor as seen, and backtrack while taking the extra points
        seen.add(neighbor);
        backtrack(neighbor, currTime + time, score + values[neighbor], seen);
        // backtrack -> delete neighbor from seen
        seen.delete(neighbor);
      }
    }
  }  
  return maxScore;
};

// Four test cases to run function on
console.log(maximalPathQuality([0,32,10,43], [[0,1,10],[1,2,15],[0,3,10]], 49)) // 75
console.log(maximalPathQuality([5,10,15,20], [[0,1,10],[1,2,10],[0,3,10]], 30)) // 25
console.log(maximalPathQuality([1,2,3,4], [[0,1,10],[1,2,11],[2,3,12],[1,3,13]], 50)) // 7
console.log(maximalPathQuality([0,1,2], [[1,2,10]], 10)) // 0