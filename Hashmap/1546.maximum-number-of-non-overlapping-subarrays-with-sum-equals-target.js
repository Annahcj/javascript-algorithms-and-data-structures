// 1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target
// Given an array nums and an integer target, return the maximum number of non-empty non-overlapping subarrays such that the sum of values in each subarray is equal to target.


// Solution: Greedy w/ Hashmap

// It is always optimal to have a subarray finish at an earlier index.
// Keep track of the end index of the last subarray with a sum equal to target.
// When we find a subarray with a sum equal to target, we can increase the count only if the current subarray doesn't overlap with the previous end index.

// Use a two-sum like approach: prefix sum and a hashmap.
// Keep track of a map where map[sum] = the last end index of a prefix sum equal to sum

// Time Complexity: O(n) 147ms
// Space Complexity: O(n) 72.2MB
var maxNonOverlapping = function(nums, target) {
  let map = new Map(), n = nums.length;
  let prevEndIndex = -1, sum = 0, ans = 0;
  map.set(0, -1);
  
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    let lastIndex = map.has(sum - target) ? map.get(sum - target) : -2;
    if (lastIndex >= prevEndIndex) {
      prevEndIndex = i;
      ans++;
    }
    map.set(sum, i);
  }
  return ans;
};

// Two test cases
console.log(maxNonOverlapping([1,1,1,1,1], 2)) // 2
console.log(maxNonOverlapping([-1,3,5,1,4,2,-9], 6)) // 2