// 2467. Most Profitable Path in a Tree
// There is an undirected tree with n nodes labeled from 0 to n - 1, rooted at node 0. You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// At every node i, there is a gate. You are also given an array of even integers amount, where amount[i] represents:
  // the price needed to open the gate at node i, if amount[i] is negative, or,
  // the cash reward obtained on opening the gate at node i, otherwise.
// The game goes on as follows:
  // Initially, Alice is at node 0 and Bob is at node bob.
  // At every second, Alice and Bob each move to an adjacent node. Alice moves towards some leaf node, while Bob moves towards node 0.
  // For every node along their path, Alice and Bob either spend money to open the gate at that node, or accept the reward. Note that:
    // If the gate is already open, no price will be required, nor will there be any cash reward.
    // If Alice and Bob reach the node simultaneously, they share the price/reward for opening the gate there. In other words, if the price to open the gate is c, then both Alice and Bob pay c / 2 each. Similarly, if the reward at the gate is c, both of them receive c / 2 each.
  // If Alice reaches a leaf node, she stops moving. Similarly, if Bob reaches node 0, he stops moving. Note that these events are independent of each other.
// Return the maximum net income Alice can have if she travels towards the optimal leaf node.


// Solution: DFS

// Bob's path has no variation, only travels straight to node 0.

// 1. Use DFS to find:
  // a. the path for Bob to reach node 0.
  // b. the time for Bob to reach each node on the path to node 0.
// 2. Use DFS to find the path with maximum income for Alice. Use the times from Bob's DFS to calculate the amount Alice will receive at each node.

// Keep track of the parent node of each node in the DFS.
// Make sure to never re-visit a parent node. 
// Since this is a tree, not re-visiting the parent node ensures that we will never visit the same node more than once.

// Time Complexity: O(n) 945ms
// Space Complexity: O(n) 129.4MB
var mostProfitablePath = function(edges, bob, amount) {
  let n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let next = Array(n).fill(-1);
  getPathForBob(bob, -1);
  let bobTimes = getTimesForBob();
  return getIncomeForAlice(0, -1, 0);
  
  function getTimesForBob() {
    let node = 0, path = [];
    while (node !== -1) {
      path.push(node); // find path to node 0
      node = next[node];
    }
    
    let bobTimes = Array(n).fill(Infinity), time = 0;
    for (let i = path.length - 1; i >= 0; i--) {
      bobTimes[path[i]] = time;
      time++;
    }
    return bobTimes;
  }
  
  function getPathForBob(node, parent) {
    next[node] = parent;
    for (let nei of graph[node]) {
      if (nei === parent) continue; // don't revisit nodes we have already been to
      getPathForBob(nei, node);
    }
  }
  
  function getIncomeForAlice(node, parent, time) {
    let income = getIncome(node, time, bobTimes[node]);
    let totalIncome = -Infinity;
    for (let nei of graph[node]) {
      if (nei === parent) continue; // don't revisit nodes we have already been to
      totalIncome = Math.max(totalIncome, income + getIncomeForAlice(nei, node, time + 1));
    }
    return totalIncome === -Infinity ? income : totalIncome; // return current income if we reach a leaf node
  }
  
  function getIncome(node, aliceTime, bobTime) {
    if (aliceTime === bobTime) return amount[node] / 2;
    if (aliceTime > bobTime) return 0;
    return amount[node];
  }
};

// Two test cases
console.log(mostProfitablePath([[0,1],[1,2],[1,3],[3,4]], 3, [-2,4,2,-4,6])) // 6
console.log(mostProfitablePath([[0,1]], 1, [-7280,2350])) // -7280