// 2367. Number of Arithmetic Triplets
// You are given a 0-indexed, strictly increasing integer array nums and a positive integer diff. A triplet (i, j, k) is an arithmetic triplet if the following conditions are met:
  // i < j < k,
  // nums[j] - nums[i] == diff, and
  // nums[k] - nums[j] == diff.
// Return the number of unique arithmetic triplets.


// Solution: Set

// Since the array is strictly increasing, that means there are no duplicate numbers.
// We can use a set to keep track of whether (num - diff) and (num - diff * 2) exists in the set.

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) 42.7MB
var arithmeticTriplets = function(nums, diff) {
  let seen = new Set(), ans = 0;
  for (let num of nums) {
    if (seen.has(num - diff) && seen.has(num - diff * 2)) ans++;
    seen.add(num);
  }
  return ans;
};

// Two test cases to run function on
console.log(arithmeticTriplets([0,1,4,6,7,10], 3)) // 2
console.log(arithmeticTriplets([4,5,6,7,8,9], 2)) // 2