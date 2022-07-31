// 2359. Find Closest Node to Given Two Nodes
// You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.
// The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge from node i to node edges[i]. If there is no outgoing edge from i, then edges[i] == -1.
// You are also given two integers node1 and node2.
// Return the index of the node that can be reached from both node1 and node2, such that the maximum between the distance from node1 to that node, and from node2 to that node is minimized. If there are multiple answers, return the node with the smallest index, and if no possible answer exists, return -1.
// Note that edges may contain cycles.


// Solution: Two BFS

// Perform two BFS to:
  // 1. Get shortest distance from node1 to each node -> dist1
  // 2. Get shortest distance from node2 to each node -> dist2
// Go through each node and get the node with the biggest Math.max(dist1[i], dist2[i]), where i is reachable from both node1 & node2.

// Time Complexity: O(n) 212ms
// Space Complexity: O(n) 76.1MB
var closestMeetingNode = function(edges, node1, node2) {
  let n = edges.length;
  let dist1 = getDist(node1);
  let dist2 = getDist(node2); 

  let ans = -1;
  for (let i = 0; i < n; i++) {
    if (dist1[i] === Infinity || dist2[i] === Infinity) continue;
    let maxDist = Math.max(dist1[i], dist2[i]);
    if (ans === -1 || Math.max(dist1[ans], dist2[ans]) > maxDist) {
      ans = i;
    }
  }
  return ans;

  function getDist(startNode) {
    let queue = [[startNode, 0]], dist = Array(n).fill(Infinity);
    dist[startNode] = 0;
    while (queue.length) {
      let [node, steps] = queue.shift();
      if (edges[node] === -1) continue;
      if (dist[edges[node]] > steps + 1) {
        dist[edges[node]] = steps + 1;
        queue.push([edges[node], steps + 1]);
      }
    }
    return dist;
  }
};

// Two test cases to run function on
console.log(closestMeetingNode([2,2,3,-1], 0, 1)) // 2
console.log(closestMeetingNode([1,2,-1], 0, 2)) // 2