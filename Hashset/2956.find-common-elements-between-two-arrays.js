// 2956. Find Common Elements Between Two Arrays
// You are given two 0-indexed integer arrays nums1 and nums2 of sizes n and m, respectively.
// Consider calculating the following values:
  // The number of indices i such that 0 <= i < n and nums1[i] occurs at least once in nums2.
  // The number of indices i such that 0 <= i < m and nums2[i] occurs at least once in nums1.
// Return an integer array answer of size 2 containing the two values in the above order.


// Solution: Hashset

// Create two hashsets for nums1 and nums2.
// Iterate through nums1 to count values present in the hashset for nums2.
// Iterate through nums2 to count values present in the hashset for nums1.

// n = length of nums1, m = length of nums2
// Time Complexity: O(n + m) 88ms
// Space Complexity: O(n + m) 47MB
var findIntersectionValues = function(nums1, nums2) {
  let nums1Set = new Set(nums1), nums2Set = new Set(nums2);
  let intersectNums1 = 0;
  for (let num of nums1) {
    intersectNums1 += nums2Set.has(num) ? 1 : 0;
  }
  let intersectNums2 = 0;
  for (let num of nums2) {
    intersectNums2 += nums1Set.has(num) ? 1 : 0;
  }
  return [intersectNums1, intersectNums2];
};

// Two test cases
console.log(findIntersectionValues([4,3,2,3,1], [2,2,5,2,3,6])) // [3,4]
console.log(findIntersectionValues([3,4,2,3], [1,5])) // [0,0]