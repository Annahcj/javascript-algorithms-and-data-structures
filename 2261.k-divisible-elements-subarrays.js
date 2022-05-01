// 2261. K Divisible Elements Subarrays
// Given an integer array nums and two integers k and p, return the number of distinct subarrays which have at most k elements divisible by p.
// Two arrays nums1 and nums2 are said to be distinct if:
  // They are of different lengths, or
  // There exists at least one index i where nums1[i] != nums2[i].
// A subarray is defined as a non-empty contiguous sequence of elements in an array.


// Solution: Brute Force

// Generate each possible subarray and get the count of numbers divisible by p.
// If the count <= k, add the subarray (turned into a string joined by commas) to a set.
// Lastly, return the size of the set.

// Time Complexity: O(n^3) 2595ms
// Space Complexity: O(n^3) (loose bound) 111MB
var countDistinct = function(nums, k, p) {
  let n = nums.length, unique = new Set();
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      // subarray from i to j inclusive
      let count = 0;
      for (let k = i; k <= j; k++) {
        if (nums[k] % p === 0) count++;
      }
      if (count <= k) unique.add(nums.slice(i, j + 1).join(","));
    }
  }
  return unique.size;
};

// Two test cases to run function on
console.log(countDistinct([2,3,3,2,2], 2, 2)) // 11
console.log(countDistinct([1,2,3,4], 4, 1)) // 10