// 3715. Sum of Perfect Square Ancestors
// You are given an integer n and an undirected tree rooted at node 0 with n nodes numbered from 0 to n - 1. This is represented by a 2D array edges of length n - 1, where edges[i] = [ui, vi] indicates an undirected edge between nodes ui and vi.
// You are also given an integer array nums, where nums[i] is the positive integer assigned to node i.
// Define a value ti as the number of ancestors of node i such that the product nums[i] * nums[ancestor] is a perfect square.
// Return the sum of all ti values for all nodes i in range [1, n - 1].
// Note: In a rooted tree, the ancestors of node i are all nodes on the path from node i to the root node 0, excluding i itself.


// Solution: DFS

// Two numbers can be multiplied together to be a perfect square if the powers of each prime factor are even.
// e.g. 2 * 8 = 16 (a perfect square).
  // 2 = 2^1
  // 8 = 2^3
  // 2^1 * 2^3 = 2^4
// e.g. 432 * 3 = 1296 (a perfect square).
  // 432 = 2^4 * 3^3
  // 3 = 3^1
  // Multipled together: 2^4 * 3*4

// Numbers with even powers of prime factors will be perfect squares, because they can be split into two halves.
// Remove all even powers from the number, i.e. 2^3 -> 2^1.
// Based on what is left, find ancestors who have the exact same remaining powers.

// There are only 65 prime factors that we need to consider, there are more <100,000, but they can be checked individually.
// They are small enough to join the prime factors in a string as a key in a hashmap.

// DFS through the tree, keeping track of the prime factors of each ancestor in a hashmap.

// Time Complexity: O(n * sqrt(n)) 969ms
// Space Complexity: O(n) 135MB
function sumOfAncestors(n, edges, nums) {
  const graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const ancestors = {};
  return dfs(0, -1);

  function dfs(node, parent) {
    const primeFactors = [...getOddPrimeFactors(nums[node])].join(',');
    let sum = ancestors[primeFactors] || 0;
    ancestors[primeFactors] = (ancestors[primeFactors] || 0) + 1;

    for (let nei of graph[node]) {
      if (nei === parent) continue;
      sum += dfs(nei, node);
    }
    ancestors[primeFactors]--; // backtrack
    return sum;
  }
};

function getOddPrimeFactors(n) {
  const res = new Set();
  for (let x = 2; (x * x) <= n; x++) {
    // loop while n is divisible by x
    while (n % x === 0) {
      if (res.has(x)) {
        res.delete(x);
      } else {
        res.add(x);
      }
      n /= x;
    }
  }
  if (n > 1) {
    if (res.has(n)) {
      res.delete(n);
    } else {
      res.add(n);
    }
  }
  return res;
}

// Three test cases
console.log(sumOfAncestors(3, [[0,1],[1,2]], [2,8,2])) // 3
console.log(sumOfAncestors(3, [[0,1],[0,2]], [1,2,4])) // 1
console.log(sumOfAncestors(4, [[0,1],[0,2],[1,3]], [1,2,9,4])) // 2