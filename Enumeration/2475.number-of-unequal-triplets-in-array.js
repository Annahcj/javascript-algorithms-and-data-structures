// 2475. Number of Unequal Triplets in Array
// You are given a 0-indexed array of positive integers nums. Find the number of triplets (i, j, k) that meet the following conditions:
  // 0 <= i < j < k < nums.length
  // nums[i], nums[j], and nums[k] are pairwise distinct.
    // In other words, nums[i] != nums[j], nums[i] != nums[k], and nums[j] != nums[k].
// Return the number of triplets that meet the conditions.


// Solution: Brute Force

// Since nums.length <= 100, we can loop through every triplet where i < j < k.

// Time Complexity: O(n^3) 100ms
// Space Complexity: O(1) 41.7MB
var unequalTriplets = function(nums) {
  let n = nums.length, ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] === nums[j]) continue;
      for (let k = j + 1; k < n; k++) {
        if (nums[i] !== nums[k] && nums[j] !== nums[k]) {
          ans++;
        }
      }
    }
  }
  return ans;
};

// Two test cases
console.log(unequalTriplets([4,4,2,4,3])) // 3
console.log(unequalTriplets([1,1,1,1,1])) // 0