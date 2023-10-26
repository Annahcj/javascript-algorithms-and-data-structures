// 330. Patching Array
// Given a sorted integer array nums and an integer n, add/patch elements to the array such that any number in the range [1, n] inclusive can be formed by the sum of some elements in the array.
// Return the minimum number of patches required.


// Solution:
// e.g: nums = [1, 5, 10], n = 20
// The logic is to check each missed number from 1 to n, starting from 1.
// miss = 1, i = 0: since nums[i] (1) is equal to miss, increment miss by nums[i], and increment i by one. The range we cover is [1..1]
// miss = 2, i = 1: since nums[i] (5) is bigger than miss, 
  // increment patches by one
  // (this means we need to add a patch (add the number 2))
  // increment miss by miss (or miss *= 2) (miss is now 4)
  // (if we add a patch, that means now the range we cover is [1..3] (miss * 2 - 1))
  // (this logic works because we have previously covered [1..1], so to get for e.g 3, we can simply add a number from the prev range with the newly added patch number)
// miss = 4, i = 1: since nums[i] (5) is bigger than miss,
  // increment patches by one
  // increment miss by miss (miss is now 8)
  // (by adding a new patch (4), we now cover the range [1..7], since we can add a num within our prev range [1..3] with the newly added number (4))
// miss = 8, i = 1: since nums[i] (5) is smaller than miss, increment miss by nums[i] (5) (miss is now 13, because we can add prev range [1..7] with 5 to get any number below 13), increment i by one.
// miss = 13, i = 2: since nums[i] (10) is smaller than miss, increment miss by nums[i] (10) (miss is now 23, because we can add prev range [1..12] with 10 to get any number below 23), increment i by one.
// at this point, the loop stops because miss is bigger than n.

// we return patches (2).

// l = length of nums
// Time Complexity: O(l + log(n)) 98ms
// Space Complexity: O(1) 40.2MB
var minPatches = function(nums, n) {
  let miss = 1, i = 0, patches = 0;
  while (miss <= n) {
    if (i < nums.length && nums[i] <= miss) {
      miss += nums[i++];
    } else {
      miss += miss;
      patches++;
    }
  } 
  return patches;
};

// Three test cases to run function on
console.log(minPatches([1,3], 6)) // 1
console.log(minPatches([1,5,10], 20)) // 2
console.log(minPatches([1,2,2], 5)) // 0