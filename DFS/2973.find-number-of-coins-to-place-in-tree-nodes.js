// 2973. Find Number of Coins to Place in Tree Nodes
// You are given an undirected tree with n nodes labeled from 0 to n - 1, and rooted at node 0. You are given a 2D integer array edges of length n - 1, where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree.
// You are also given a 0-indexed integer array cost of length n, where cost[i] is the cost assigned to the ith node.
// You need to place some coins on every node of the tree. The number of coins to be placed at node i can be calculated as:
  // If size of the subtree of node i is less than 3, place 1 coin.
  // Otherwise, place an amount of coins equal to the maximum product of cost values assigned to 3 distinct nodes in the subtree of node i. If this product is negative, place 0 coins.
// Return an array coin of size n such that coin[i] is the number of coins placed at node i.


// Solution: Post-order DFS

// For each subtree, return the count of nodes and the three maximum and three minimum cost values (since the product of two negative numbers is a positive number, it can be bigger than the two max positive numbers)
// We need the minimum values because the negative values can possible create a larger positive product.
// To find the maximum product of 3 cost values in the subtree, we take the maximum out of these three situations:
  // 1. Taking the three maximum positive values.
  // 2. Taking the maximum positive value and the two minimum negative values.
  // 3. Take the three maximum values out of the positive and negative values combined.

// Time Complexity: O(n) 491ms
// Space Complexity: O(n) 105.4MB
var placedCoins = function(edges, cost) {
  let n = cost.length, graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let coin = Array(n);
  dfs(0, -1);
  return coin;
  
  function dfs(node, parent) { // return [count of nodes in subtree, array of three max positive values, array of two min negative values]
    let nodeCount = 1, maxPositiveCosts = [], minNegativeCosts = [];
    if (cost[node] >= 0) maxPositiveCosts.push(cost[node]);
    else minNegativeCosts.push(cost[node]);

    for (let nei of graph[node]) {
      if (nei === parent) continue;
      let [neiNodeCount, neiMaxCosts, neiMinCosts] = dfs(nei, node);
      nodeCount += neiNodeCount;
      maxPositiveCosts = getMaxThree(maxPositiveCosts, neiMaxCosts, 'max');
      minNegativeCosts = getMaxThree(minNegativeCosts, neiMinCosts, 'min');
    }
    if (nodeCount < 3) {
      coin[node] = 1;
      return [nodeCount, maxPositiveCosts, minNegativeCosts];
    }

    let maxProduct = -Infinity;
    // product of three maximum positive cost values
    if (maxPositiveCosts.length >= 3) {
      maxProduct = Math.max(maxProduct, getProduct(maxPositiveCosts.slice(0, 3)));
    }
    // product of maximum positive cost value and top 2 minimum negative cost values
    if (maxPositiveCosts.length >= 1 && minNegativeCosts.length >= 2) {
      maxProduct = Math.max(maxProduct, getProduct([maxPositiveCosts[0], minNegativeCosts[0], minNegativeCosts[1]]));
    }
    // product of the maximum three positive and negative values combined (when we don't have enough values to meet the other two conditions)
    let topThreeMaxAndMinCombined = getMaxThree(maxPositiveCosts, minNegativeCosts, 'max');
    maxProduct = Math.max(maxProduct, getProduct(topThreeMaxAndMinCombined));
    if (maxProduct < 0) {
      coin[node] = 0;
    } else {
      coin[node] = maxProduct;
    }
    return [nodeCount, maxPositiveCosts, minNegativeCosts];
  }
};

function getProduct(arr) {
  let product = 1;
  for (let value of arr) {
    product *= value;
  }
  return product;
}

function getMaxThree(topThree, extra, sortOrder) {
  return [...topThree, ...extra].sort((a, b) => sortOrder === 'max' ? b - a : a - b).slice(0, 3);
}

// Two test cases
console.log(placedCoins([[0,1],[0,2],[0,3],[0,4],[0,5]], [1,2,3,4,5,6])) // [120,1,1,1,1,1]
console.log(placedCoins([[0,1],[0,2]], [1,2,-2])) // [0,1,1]