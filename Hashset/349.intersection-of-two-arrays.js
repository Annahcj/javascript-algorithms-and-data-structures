// 349. Intersection of Two Arrays
// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.


// Solution: Hashset

// 1. Add all numbers from nums1 into a hashset.
// 2. Go through each number in nums2.
  // If it exists in nums1Set, add the number to the answer and remove it from nums1Set to prevent duplicates in the answer.

// n = length of nums1, m = length of nums2
// Time Complexity: O(n + m) 49ms
// Space Complexity: O(n) 50.4MB
var intersection = function(nums1, nums2) {
  let nums1Set = new Set(nums1), intersection = [];
  for (let num of nums2) {
    if (nums1Set.has(num)) {
      intersection.push(num);
      nums1Set.delete(num);
    }
  }
  return intersection;
};

// Follow Up solution: Two Pointers for Sorted Arrays

// Assuming the input is sorted, we can use two pointers for a constant space solution.

// Time Complexity: O(n + m) (assuming the input is sorted) 107ms
// Space Complexity: O(1) 40.2MB
var intersection = function(nums1, nums2) {
  nums1.sort((a, b) => a - b); 
  nums2.sort((a, b) => a - b);
  let i = 0, j = 0;
  let res = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      res.push(nums1[i]);
      i++, j++;
    } else if (nums1[i] < nums2[j]) i++;
    else j++;
    while (i > 0 && i < nums1.length && nums1[i] === nums1[i - 1]) i++; // skip over duplicates
    while (j > 0 && j < nums2.length && nums2[j] === nums2[j - 1]) j++; // skip over duplicates
  }
  return res;
};

// Two test cases
console.log(intersection([1,2,2,1], [2,2])) // [2]
console.log(intersection([4,9,5], [9,4,9,8,4])) // [9,4]