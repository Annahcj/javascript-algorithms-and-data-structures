// 2560. House Robber IV
// There are several consecutive houses along a street, each of which has some money inside. There is also a robber, who wants to steal money from the homes, but he refuses to steal from adjacent homes.
// The capability of the robber is the maximum amount of money he steals from one house of all the houses he robbed.
// You are given an integer array nums representing how much money is stashed in each house. More formally, the ith house from the left has nums[i] dollars.
// You are also given an integer k, representing the minimum number of houses the robber will steal from. It is always possible to steal at least k houses.
// Return the minimum capability of the robber out of all the possible ways to steal at least k houses.


// Solution: Binary Search

// Binary search for minimum maximum nums[i].
// To check whether it is possible to take k non-adjacent houses with maximum score of nums[i],
  // Greedily take k houses with nums[i] <= max.
  // When we find nums[i] <= max, take the house and skip to nums[i + 2] (It is optimal to take a house earlier than later).

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(m)) 124ms
// Space Complexity: O(1) 50.7MB
var minCapability = function(nums, k) {
  let min = nums[0], max = nums[0];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    min = Math.min(min, nums[i]);
    max = Math.max(max, nums[i]);
  }
  let low = min, high = max;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isEnough(max) { // greedily take k houses with nums[i] <= max
    let houses = 0;
    for (let i = 0; i < n; i++) {
      if (nums[i] <= max) {
        houses++;
        i++;
      }
      if (houses === k) return true;
    }
    return false;
  }
};

// Two test cases
console.log(minCapability([2,3,5,9], 2)) // 5
console.log(minCapability([2,7,9,3,1], 2)) // 2