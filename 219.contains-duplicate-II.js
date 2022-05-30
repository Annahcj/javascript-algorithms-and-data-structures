// 219. Contains Duplicate II
// Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.


// Solution: Set & Sliding Window 

// Use a set to keep track of whether a number exists within the window of size k.
// Explanations:
// if (i > k) numsSet.delete(nums[i - k - 1])
  // nums[i - k - 1] is guaranteed to be the only occurance in between i - k - 1 and i,
  // because if it wasn't, we would have already found a pair and returned true.

// Time Complexity: O(n) 118ms
// Space Complexity: O(k) 55.8MB
var containsNearbyDuplicate = function(nums, k) {
  let numsSet = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (i > k) numsSet.delete(nums[i - k - 1]);
    if (numsSet.has(nums[i])) return true;
    numsSet.add(nums[i]);
  }
  return false;
};

// Three test cases to run function on
console.log(containsNearbyDuplicate([1,2,3,1], 3)) // true
console.log(containsNearbyDuplicate([1,0,1,1], 1)) // true
console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2)) // false