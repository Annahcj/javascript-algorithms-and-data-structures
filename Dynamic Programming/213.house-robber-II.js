// 213. House Robber II
// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.
// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


// Solution: DP

// Since the last house is now adjacent to the first house, that means we can't rob both of them.
// We can actually split this into two calculations of the original house robber problem:
  // 1. 0 to n - 1
  // 2. 1 to n
// Simply return the best of the two situations.
// We only need to worry about the first and last house since that is the connection point and the only irregular spot.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 38.9MB
var rob = function(nums) {
  let n = nums.length;
  if (n === 1) return nums[0];
  return Math.max(robBest(0, n - 1), robBest(1, n));

  function robBest(start, end) {
    let prevPrev = 0;
    let prev = 0;
    for (var i = start; i < end; i++) {
      let temp = prev;
      let curr = Math.max(prevPrev + nums[i], prev);
      prev = curr;
      prevPrev = temp;
    }
    return prev;
  }
};

// Three test cases to run function on
console.log(rob([2,3,2])) // 3
console.log(rob([1,2,3,1])) // 4
console.log(rob([1,2,3])) // 3