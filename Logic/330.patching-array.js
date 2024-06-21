// 330. Patching Array
// Given a sorted integer array nums and an integer n, add/patch elements to the array such that any number in the range [1, n] inclusive can be formed by the sum of some elements in the array.
// Return the minimum number of patches required.


// Solution: Greedy Logic

// Keep track of the currently fully covered range of numbers, from 1 to `range`.
// When we add a number nums[i] to a full covered range, we can now make any number between nums[i] to nums[i] + range.

// Imagine a range [1,2,3].
// When adding a number 5, the new range is:
  // 1
  // 2
  // 3
  // 5
  // 6 (1 + 5)
  // 7 (2 + 5)
  // 8 (3 + 5)

// If there is a gap between the current covered range and nums[i], we need to add in the missing number `range + 1`.
// Otherwise, we can take nums[i] and extend our range to cover up to range + nums[i].

// Time Complexity: O(n) 54ms
// Space Complexity: O(1) 49.4MB
var minPatches = function(nums, n) {
  let range = 0, patches = 0, i = 0;
  while (range < n) {
    if (i < nums.length && nums[i] - range <= 1) {
      range += nums[i];
      i++;
    } else {
      // e.g. Range is 4, add 5 to get the new range 4 + 5 = 9, since 4 is already covered.
      range += range + 1;
      patches++;
    }
  }
  return patches;
};

// Three test cases
console.log(minPatches([1,3], 6)) // 1
console.log(minPatches([1,5,10], 20)) // 2
console.log(minPatches([1,2,2], 5)) // 0