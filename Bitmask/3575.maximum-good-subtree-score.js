// 3575. Maximum Good Subtree Score
// You are given an undirected tree rooted at node 0 with n nodes numbered from 0 to n - 1. Each node i has an integer value vals[i], and its parent is given by par[i].
// A subset of nodes within the subtree of a node is called good if every digit from 0 to 9 appears at most once in the decimal representation of the values of the selected nodes.
// The score of a good subset is the sum of the values of its nodes.
// Define an array maxScore of length n, where maxScore[u] represents the maximum possible sum of values of a good subset of nodes that belong to the subtree rooted at node u, including u itself and all its descendants.
// Return the sum of all values in maxScore.
// Since the answer may be large, return it modulo 10^9 + 7.


// Solution: DFS w/ Bitmasks & Hashmaps

// Precompute the bitmask of each node value.

// For each node in the tree, 
// iterate through each child while keeping track of the current distinct (bitmask, max score) combinations.
// Update the map while iterating through each child.

// Note: This solution is TLE.
function goodSubtreeSum(vals, par) {
  const n = vals.length;
  // precompute bitmasks
  const bitmasks = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let bitmask = 0, val = vals[i];
    while (val > 0) {
      const digit = val % 10;
      if (bitmask & (1 << digit)) {
        bitmask = -1;
        break;
      }
      bitmask = bitmask | (1 << digit);
      val = Math.floor(val / 10);
    }
    bitmasks[i] = bitmask;
  }  
  const graph = Array(n).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    if (par[i] !== -1) {
      graph[par[i]].push(i);
    }
  }
  const MOD = 1000000007;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const memo = Array(n).fill(null);
    const map = dfs(memo, i);
    ans = (ans + Math.max(...map.values())) % MOD;
  }
  return ans;

  function dfs(memo, node) {
    if (memo[node] !== null) return memo[node];
    const map = new Map([[0, 0]]);
    if (bitmasks[node] !== -1) {
      map.set(bitmasks[node], vals[node]);
    }
    for (let nei of graph[node]) {
      const neiMap = dfs(memo, nei);
      for (let [mask, score] of map) {
        for (let [neiMask, neiScore] of neiMap) {
          if (!(mask & neiMask)) { // no overlap, combine
            map.set(mask | neiMask, Math.max(map.get(mask | neiMask) || 0, score + neiScore));
          }
        }
      }
    }
    return memo[node] = map;
  }
};

// Two test cases
console.log(goodSubtreeSum([2,3], [-1,0])) // 8
console.log(goodSubtreeSum([1,5,2], [-1,0,0])) // 15