// 2215. Find the Difference of Two Arrays
// Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:
  // answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
  // answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
// Note that the integers in the lists may be returned in any order.


// Solution: Hashset

// Time Complexity: O(n) 115ms
// Space Complexity: O(n) 49.1MB
var findDifference = function(nums1, nums2) {
  let set1 = new Set(nums1), set2 = new Set(nums2);
  let res1 = new Set(), res2 = new Set();
  for (let num of nums1) {
    if (!set2.has(num)) res1.add(num);
  }
  for (let num of nums2) {
    if (!set1.has(num)) res2.add(num);
  }
  return [[...res1], [...res2]];
};

// A test case
console.log(findDifference([1,2,3], [2,4,6])) // [[1,3],[4,6]]