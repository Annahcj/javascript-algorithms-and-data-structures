// 1995. Count Special Quadruplets
// Given a 0-indexed integer array nums, return the number of distinct quadruplets (a, b, c, d) such that:
// nums[a] + nums[b] + nums[c] == nums[d], and
// a < b < c < d


// Solution: Brute Force

// (Set all sums in a map)
// Loop through nums from 3 onwards (pointer = d) (since a < b < c < d, the earliest we can find d is from index 3)
  // if map doesn't contain nums[d], set map[nums[d]] to an empty array
  // push a into map[nums[d]] 

// Now, find all the combinations of three numbers in nums (create three nested loops)
// If a is smaller than b, and b is smaller than c
  // let sum be nums[a] + nums[b] + nums[c]
  // If map[sum] exists
    // Loop through each index in map[sum], if the index is less than c, increment count by one.

// Return count.

// Time Complexity: O(n^3) 96ms
// Space Complexity: O(n) 41.4MB
var countQuadruplets = function(nums) {
  let map = {}, count = 0;
  for (let d = 3; d < nums.length; d++) {
    if (!map[nums[d]]) map[nums[d]] = [];
    map[nums[d]].push(d);
  }
  for (let a = 0; a < nums.length; a++) {
    for (let b = 1; b < nums.length; b++) {
      for (let c = 2; c < nums.length; c++) {
        if (a < b && b < c) {
          let sum = nums[a] + nums[b] + nums[c];
          if (map[sum]) {
            for (let s of map[sum]) {
              if (s > c) count++;
            }
          }
        }
      }
    }
  } 
  return count;
};

// Four test cases
console.log(countQuadruplets([1,2,3,6])) // 1
console.log(countQuadruplets([3,3,6,4,5])) // 0
console.log(countQuadruplets([1,1,1,3,5])) // 4
console.log(countQuadruplets([9,6,8,23,39,23])) // 2