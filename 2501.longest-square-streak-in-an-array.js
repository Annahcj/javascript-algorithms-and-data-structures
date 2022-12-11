// 2501. Longest Square Streak in an Array
// You are given an integer array nums. A subsequence of nums is called a square streak if:
  // The length of the subsequence is at least 2, and
  // after sorting the subsequence, each element (except the first element) is the square of the previous number.
// Return the length of the longest square streak in nums, or return -1 if there is no square streak.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Sorting & Hashmap

// Sort nums in descending order.
// Process nums from largest to smallest, store the current longest streak starting at each number in a hashmap.
// Record the maximum length of a sequence.

// Time Complexity: O(n log(n)) 481ms
// Space Complexity: O(n) 69.8MB
var longestSquareStreak = function(nums) {
  let n = nums.length;
  nums.sort((a, b) => b - a);
  let map = new Map(), ans = 0;
  for (let i = 0; i < n; i++) {
    let square = nums[i] * nums[i];
    if (map.has(square)) {
      map.set(nums[i], map.get(square) + 1);
    } else if (!map.has(nums[i])) {
      map.set(nums[i], 1);
    }
    ans = Math.max(ans, map.get(nums[i]));
  }
  return ans < 2 ? -1 : ans;
};

// Two test cases
console.log(longestSquareStreak([4,3,6,16,8,2])) // 3
console.log(longestSquareStreak([2,3,5,6,7])) // -1