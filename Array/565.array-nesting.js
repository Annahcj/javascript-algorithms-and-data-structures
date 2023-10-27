// 565. Array Nesting
// You are given an integer array nums of length n where nums is a permutation of the numbers in the range [0, n - 1].
// You should build a set s[k] = {nums[k], nums[nums[k]], nums[nums[nums[k]]], ... } subjected to the following rule:
  // The first element in s[k] starts with the selection of the element nums[k] of index = k.
  // The next element in s[k] should be nums[nums[k]], and then nums[nums[nums[k]]], and so on.
  // We stop adding right before a duplicate element occurs in s[k].
// Return the longest length of a set s[k].


// Solution: Cycles

// nums is a permuation of [0, ..., n - 1], which brings out two properties:
  // 1. Each "node" will only have one incoming and one outgoing edge (with the exception of a node pointing to itself).
  // 2. Following on from property 1, each node will be part of exactly one cycle.

// Because every node is part of one cycle, it doesn't matter which node in the cycle we start from, we will still visit all nodes in the cycle.
// Therefore, we only ever need to visit each node once.

// Keep track of nodes we have visited and don't revisit nodes.
// We can count the length of each cycle the very first time we come across it.

// Time Complexity: O(n) 206ms
// Space Complexity: O(n) 54.6MB
var arrayNesting = function(nums) {
  let n = nums.length, seen = Array(n).fill(0), maxLen = 0;
  for (let i = 0; i < n; i++) {
    let num = i, count = 0;
    while (!seen[num]) {
      count++;
      seen[num] = 1;
      num = nums[num];
    }
    maxLen = Math.max(maxLen, count);
  }
  return maxLen;
};

// Two test cases 
console.log(arrayNesting([5,4,0,3,1,6,2])) // 4
console.log(arrayNesting([0,1,2])) // 1