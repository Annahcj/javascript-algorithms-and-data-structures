// 3534. Path Existence Queries in a Graph II
// You are given an integer n representing the number of nodes in a graph, labeled from 0 to n - 1.
// You are also given an integer array nums of length n and an integer maxDiff.
// An undirected edge exists between nodes i and j if the absolute difference between nums[i] and nums[j] is at most maxDiff (i.e., |nums[i] - nums[j]| <= maxDiff).
// You are also given a 2D integer array queries. For each queries[i] = [ui, vi], find the minimum distance between nodes ui and vi. If no path exists between the two nodes, return -1 for that query.
// Return an array answer, where answer[i] is the result of the ith query.
// Note: The edges between the nodes are unweighted.


// Solution: Binary Lifting & Binary Search

// Based on the conditions of an edge, we know the following:
  // We need to sort nums in asc order, while keeping track of the original indices.
  // Each query is based on the values, not the indices - question is what is the minimum number of jumps from nums[queries[i][0]] to nums[queries[i][1]].
// For each nums[i], find the maximum nums[j] where nums[j] - nums[i] <= maxDiff.

// Brute forced approach:
  // For every query, starting from the smaller value, jump from nums[i] to maximum nums[j] until we reach the larger value of the query.
  // This is slow and is worst case O(n) per query.

// Binary lifting approach:
  // For every nums[i], save the maximum nums[j] for every number of moves that is a power of 2.
  // e.g. For nums[i], 
    // lift[i][0] = maximum nums[j] reachable from nums[i] in 1 (2^0) move.
    // lift[i][1] = maximum nums[j] reachable from nums[i] in 2 (2^1) moves.
    // lift[i][2] = maximum nums[j] reachable from nums[i] in 4 (2^2) moves.
  // For every query, binary search for the minimum number of moves m, such that the maximum nums[j] reachable in m moves >= the larger value in the query.

// m = number of queries
// Time Complexity: O(n log(n) + m log(n) log(n)) 1098ms
// Space Complexity: O(n log(n)) 149MB
function pathExistenceQueries(n, nums, maxDiff, queries) {
  nums = nums.map((num, i) => [num, i]).sort((a, b) => a[0] - b[0]);
  const map = {}; // original index -> new index after sorting
  for (let i = 0; i < n; i++) {
    map[nums[i][1]] = i;
  }
  const maxDepth = Math.ceil(Math.log2(n));
  const kthAncestor = new KthAncestor(nums, n, maxDepth, maxDiff);
  const ans = [];
  for (let [u, v] of queries) {
    if (u === v) {
      ans.push(0);
      continue;
    }
    [u, v] = nums[map[u]][0] > nums[map[v]][0] ? [v, u] : [u, v]; // make u the smaller value
    let low = 1, high = n;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const kthMaxValue = kthAncestor.getKthMaxValue(u, mid);
      if (nums[map[kthMaxValue]][0] >= nums[map[v]][0]) high = mid;
      else low = mid + 1;
    }
    const kthMaxValue = kthAncestor.getKthMaxValue(u, low);
    ans.push(nums[map[kthMaxValue]][0] >= nums[map[v]][0] ? low : -1);
  }
  return ans;
};

class KthAncestor {
  constructor(nums, n, maxDepth, maxDiff) {
    this.maxDepth = maxDepth;
    this.lift = null;
    this.build(nums, n, maxDiff);
  }
  build(nums, n, maxDiff) {
    this.lift = Array(this.maxDepth + 1).fill(0).map(() => Array(n).fill(-1)); // lift[d][i] = index of the maximum value using 2^d jumps
    for (let i = 0, j = 0; i < n; i++) {
      while (j < n && nums[j][0] - nums[i][0] <= maxDiff) j++;
      this.lift[0][nums[i][1]] = nums[j - 1][1];
    }
    for (let d = 1; d <= this.maxDepth; d++) {
      for (let i = 0; i < n; i++) {
        const halfParent = this.lift[d - 1][i];
        this.lift[d][i] = this.lift[d - 1][halfParent];
      }
    }
  }
  getKthMaxValue(i, k) { // get the maximum value reachable from node i, in k moves
    let node = i;
    for (let j = 0; j <= this.maxDepth; j++) {
      if ((1 << j) & k) {
        node = this.lift[j][node];
      }
    }
    return node;
  }
}

// Two test cases
console.log(pathExistenceQueries(5, [1,8,3,4,2], 3, [[0,3],[2,4]])) // [1,1]
console.log(pathExistenceQueries(5, [5,3,1,9,10], 2, [[0,1],[0,2],[2,3],[4,3]])) // [1,2,-1,1]