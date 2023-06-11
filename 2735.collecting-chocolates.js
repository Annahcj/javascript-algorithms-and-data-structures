// 2735. Collecting Chocolates
// You are given a 0-indexed integer array nums of size n representing the cost of collecting different chocolates. Each chocolate is of a different type, and originally, the chocolate at ith index is of ith type.
// In one operation, you can do the following with an incurred cost of x:
  // Simultaneously change the chocolate of ith type to (i + 1)th type for all indexes i where 0 <= i < n - 1. When i == n - 1, that chocolate will be changed to type of the chocolate at index 0.
// Return the minimum cost to collect chocolates of all types, given that you can perform as many operations as you would like.


// Solution: 

// Keep track of the minimum state of nums[i] for any number of rotations <= r.
// Find the number of rotations which results in the minimum total cost: (x * rotations) + sum of min cost of each nums[i] for every i

// Time Complexity: O(n^2) 214ms
// Space Complexity: O(n) 47.3MB
var minCost = function(nums, x) {
  let n = nums.length, ans = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let currMinCost = Infinity;
    for (let r = 0; r < n; r++) { // number of rotations
      let cost = nums[((i - r) + n) % n];
      currMinCost = Math.min(currMinCost, cost);
      ans[r] += currMinCost;
    }
  }
  let res = Infinity;
  for (let r = 0; r < n; r++) {
    let rotationCost = x * r;
    res = Math.min(res, ans[r] + rotationCost);
  }
  return res;
};

// Two test cases
console.log(minCost([20,1,15], 5)) // 13
console.log(minCost([1,2,3], 4)) // 6