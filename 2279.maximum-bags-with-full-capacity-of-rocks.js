// 2279. Maximum Bags With Full Capacity of Rocks
// You have n bags numbered from 0 to n - 1. You are given two 0-indexed integer arrays capacity and rocks. The ith bag can hold a maximum of capacity[i] rocks and currently contains rocks[i] rocks. You are also given an integer additionalRocks, the number of additional rocks you can place in any of the bags.
// Return the maximum number of bags that could have full capacity after placing the additional rocks in some bags.


// Solution: Get Diffs and Sort

// Greedy approach, it's always optimal to fill up the bags with less space leftover first.

// 1. Collect each diff (capacity[i] - rocks[i]) in an array.
// 2. Sort the diffs in ascending order.
// 3. Loop through the diffs until we run out of additionalRocks.

// Time Complexity: O(n log(n)) 207ms
// Space Complexity: O(n) 58MB
var maximumBags = function(capacity, rocks, additionalRocks) {
  let diffs = [], ans = 0;
  for (let i = 0; i < capacity.length; i++) {
    let remain = capacity[i] - rocks[i];
    if (remain === 0) ans++;
    else diffs.push(remain);
  }
  diffs.sort((a, b) => a - b);

  for (let i = 0; i < diffs.length; i++) {
    if (diffs[i] > additionalRocks) break;
    additionalRocks -= diffs[i];
    ans++;
  }
  return ans;
};

// Two test cases to run function on
console.log(maximumBags([2,3,4,5], [1,2,4,4], 2)) // 3
console.log(maximumBags([10,2,2], [2,2,0], 100)) // 3