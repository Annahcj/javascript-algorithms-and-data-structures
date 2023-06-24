// 1916. Count Ways to Build Rooms in an Ant Colony
// You are an ant tasked with adding n new rooms numbered 0 to n-1 to your colony. You are given the expansion plan as a 0-indexed integer array of length n, prevRoom, where prevRoom[i] indicates that you must build room prevRoom[i] before building room i, and these two rooms must be connected directly. Room 0 is already built, so prevRoom[0] = -1. The expansion plan is given such that once all the rooms are built, every room will be reachable from room 0.
// You can only build one room at a time, and you can travel freely between rooms you have already built only if they are connected. You can choose to build any room as long as its previous room is already built.
// Return the number of different orders you can build all the rooms in. Since the answer may be large, return it modulo 10^9 + 7.


// Solution: Combinatorics and Modular Inverse

// Formula: n! / (size of subtree) * (size of subtree) * (size of subtree) * ... (for the subtrees rooted at each node)
// Reasoning: 
  // n! gives us the total number of permutations (all possible orderings).
  // We want to divide by the size of each subtree because we want to eliminate all permutations where the root of each subtree is not the first element within the individual ordering of the nodes in the subtree.

// Modular inverse: Instead of dividing factorial by the permutations, we instead multiply by the modular inverse. The result can be proven to be the same.

// n = number of nodes, m = modulo
// Time Complexity: O(n + log(m)) 733ms
// Space Complexity: O(n) 149.7MB
var waysToBuildRooms = function(prevRoom) {
  let n = prevRoom.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 1; i < n; i++) {
    graph[prevRoom[i]].push(i);
  }
  let factorial = 1n, MOD = 1000000007n;
  for (let i = 0; i < n; i++) {
    factorial = (factorial * BigInt(i + 1)) % MOD;
  }
  let subtreeSizeProduct = dfs(graph, MOD, 0)[1];
  return (factorial * modularInverse(subtreeSizeProduct, Number(MOD) - 2, MOD)) % MOD;
};

function dfs(graph, MOD, node) {
  let size = 1, ans = 1n;
  for (let child of graph[node]) {
    let [childSize, childSizeProduct] = dfs(graph, MOD, child);
    size += childSize;
    ans = (ans * childSizeProduct) % MOD;
  }
  return [size, BigInt(size) * ans]; // [subtree size, number of permutations]
}

function modularInverse(x, y, mod) { // assuming x = BigInt, y = Number, mod = BigInt
  let currPow = x, ans = 1n;
  while (y > 0) {
    if (y & 1) {
      ans = (ans * currPow) % mod;
    }
    currPow = (currPow * currPow) % mod;
    y >>= 1;
  }
  return ans;
}

// Two test cases
console.log(waysToBuildRooms([-1,0,1])) // 1
console.log(waysToBuildRooms([-1,0,0,1,2])) // 6