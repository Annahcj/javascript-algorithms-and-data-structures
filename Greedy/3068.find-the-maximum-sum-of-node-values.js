// 3068.find-the-maximum-sum-of-node-values.js
// 3068. Find the Maximum Sum of Node Values
// There exists an undirected tree with n nodes numbered 0 to n - 1. You are given a 0-indexed 2D integer array edges of length n - 1, where edges[i] = [u[i], v[i]] indicates that there is an edge between nodes u[i] and v[i] in the tree. You are also given a positive integer k, and a 0-indexed array of non-negative integers nums of length n, where nums[i] represents the value of the node numbered i.
// Alice wants the sum of values of tree nodes to be maximum, for which Alice can perform the following operation any number of times (including zero) on the tree:
  // Choose any edge [u, v] connecting the nodes u and v, and update their values as follows:
    // nums[u] = nums[u] XOR k
    // nums[v] = nums[v] XOR k
// Return the maximum possible sum of the values Alice can achieve by performing the operation any number of times.


// Solution: Greedy

// We can XOR any pair of nodes, no matter whether they are adjacent or not.
// All nodes in the tree are connected, so if we follow the path from node a -> node b, we will doubly XOR every node except node a and b, hence flipping each node value back to the original value except node a and b.
// Based on that observation, we can also know that we can flip any even number of nodes, no matter what nodes they are.

// Count the number of nodes where the flipped value is greater than the original value.
// If this count is even, we can flip all of those node values.
// If this count is odd, we must either flip or un-flip one of those node values - the one which has the minimum difference with the original value.
  // Un-flip one of the flipped node values, or flip one of the unflipped node values.

// Time Complexity: O(n) 108ms
// Space Complexity: O(1) 60MB
var maximumValueSum = function(nums, k, edges) {
  let sum = 0, flipped = 0, minFlippedDiff = Infinity;
  for (let val of nums) {
    if ((val ^ k) > val) {
      sum += val ^ k;
      flipped++;
      minFlippedDiff = Math.min(minFlippedDiff, (val ^ k) - val);
    } else {
      sum += val;
      minFlippedDiff = Math.min(minFlippedDiff, val - (val ^ k));
    }
  }
  return flipped % 2 === 0 ? sum : sum - minFlippedDiff;
};

// Three test cases
console.log(maximumValueSum([1,2,1], 3, [[0,1],[0,2]])) // 6
console.log(maximumValueSum([2,3], 7, [[0,1]])) // 9
console.log(maximumValueSum([7,7,7,7,7,7], 3, [[0,1],[0,2],[0,3],[0,4],[0,5]])) // 42