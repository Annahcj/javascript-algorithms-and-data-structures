// 1743. Restore the Array From Adjacent Pairs
// There is an integer array nums that consists of n unique elements, but you have forgotten it. However, you do remember every pair of adjacent elements in nums.
// You are given a 2D integer array adjacentPairs of size n - 1 where each adjacentPairs[i] = [ui, vi] indicates that the elements ui and vi are adjacent in nums.
// It is guaranteed that every adjacent pair of elements nums[i] and nums[i+1] will exist in adjacentPairs, either as [nums[i], nums[i+1]] or [nums[i+1], nums[i]]. The pairs can appear in any order.
// Return the original array nums. If there are multiple solutions, return any of them.


// Solution: Find the Beginning

// 1. Organize each adjacent pair ([x, y]) into a hashmap, with x pointing to y, and y pointing to x.
// 2. Find the start: Both the start and end will have only one connection.
// 3. Follow the links from the start until we have the whole array.

// Time Complexity: O(n) 1026ms
// Space Complexity: O(n) 142.6MB
var restoreArray = function(adjacentPairs) {
  let pairs = {}, n = adjacentPairs.length + 1;
  for (let [x, y] of adjacentPairs) {
    if (!pairs[x]) pairs[x] = [];
    if (!pairs[y]) pairs[y] = [];
    pairs[x].push(y);
    pairs[y].push(x);
  }
  
  let start;
  for (let num in pairs) {
    if (pairs[num].length === 1) {
      start = +num;
      break;
    }
  }

  let res = [];
  while (res.length < n) {
    res.push(start);
    let prev = res[res.length - 2]; 
    if (pairs[start][0] !== prev) { // make sure we don't get caught in a cycle
      start = pairs[start][0];
    } else {
      start = pairs[start][1];
    }
  }
  return res;
};

// Two test cases
console.log(restoreArray([[2,1],[3,4],[3,2]])) // [1,2,3,4]
console.log(restoreArray([[4,-2],[1,4],[-3,1]])) // [-2,4,1,-3]