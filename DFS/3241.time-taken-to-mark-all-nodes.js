// 3241. Time Taken to Mark All Nodes
// There exists an undirected tree with n nodes numbered 0 to n - 1. You are given a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the tree.
// Initially, all nodes are unmarked. For each node i:
  // If i is odd, the node will get marked at time x if there is at least one node adjacent to it which was marked at time x - 1.
  // If i is even, the node will get marked at time x if there is at least one node adjacent to it which was marked at time x - 2.
// Return an array times where times[i] is the time when all nodes get marked in the tree, if you mark node i at time t = 0.
// Note that the answer for each times[i] is independent, i.e. when you mark node i all other nodes are unmarked.


// Solution: DFS w/ Rerooting

// 1. DFS starting from node 0.
  // Calculate the maximum time taken to reach all nodes for every subtree, subtreeMax[i] = max time taken within subtree rooted at node i, starting from node 0.
  // For every node, store the two maximum subtrees' maximum times (for rerooting calculation).

// 2. DFS from node 0 and try to take every node i as the new root.
  // We can use the results from node 0, as the only change is taking the parent node as a child node, the rest stays the same.
  // To calculate the max time after changing the root from node -> nei,
    // Take node(parent of nei)'s maximum time, excluding nei's max time if it was the greatest before the reroot.
    // All other max times for nei stays the same, the only change is the parent node becomes a child node.
  // Update nei's two maximum times when rerooting, and reset it when we backtrack.

// Time Complexity: O(n) 2008ms
// Space Complexity: O(n) 170.5MB
function timeTaken(edges) {
  const n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const subtreeMaxTime = Array(n).fill(0).map(() => []);
  subtreeMaxTimesFrom0();
  const times = Array(n).fill(0);
  reroot();
  return times;

  function subtreeMaxTimesFrom0(node = 0, parent = -1) {
    let maxTime = 0;
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      const neiTime = subtreeMaxTimesFrom0(nei, node) + (nei % 2 === 1 ? 1 : 2);
      subtreeMaxTime[node] = getMaxTwo(subtreeMaxTime[node], {node: nei, time: neiTime});
      maxTime = Math.max(maxTime, neiTime);
    }
    return maxTime;
  }

  function reroot(node = 0, parent = -1) {
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      const parentMaxTime = getMaxTimeExcluding(subtreeMaxTime[node], nei) + (node % 2 === 1 ? 1 : 2);
      const prevMaxTimes = [...subtreeMaxTime[nei]];
      subtreeMaxTime[nei] = getMaxTwo(subtreeMaxTime[nei], {node, time: parentMaxTime});
      reroot(nei, node);
      subtreeMaxTime[nei] = prevMaxTimes;
    }
    times[node] = subtreeMaxTime[node].length > 0 ? subtreeMaxTime[node][0].time : 0;
  }
};

function getMaxTwo(times, newTime) {
  times.push(newTime);
  return times.sort((a, b) => b.time - a.time).slice(0, 2);
}

function getMaxTimeExcluding(maxTimes, nodeToExclude) {
  const maxTimesExcluding = maxTimes.filter((mt) => mt.node !== nodeToExclude);
  if (maxTimesExcluding.length === 0) {
    return 0;
  }
  return maxTimesExcluding[0].time;
}

// Three test cases
console.log(timeTaken([[0,1],[0,2]])) // [2,4,3]
console.log(timeTaken([[0,1]])) // [1,2]
console.log(timeTaken([[2,4],[0,1],[2,3],[0,2]])) // [4,6,3,5,5]