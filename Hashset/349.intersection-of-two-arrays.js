// 349. Intersection of Two Arrays
// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.


// Solution: Hashsets

// Hashsets keep the unique values only, so we can turn nums1 and nums2 into two hashsets.
// Loop through set1 and get the values that are also present in set2.

// n = nums1.length, m = nums2.length
// Time Complexity: O(n + m) 91ms
// Space Complexity: O(n + m) 39.7MB
var intersection = function(nums1, nums2) {
  let set1 = new Set(nums1), set2 = new Set(nums2);
  let res = [];
  for (var num of set1) {
    if (set2.has(num)) res.push(num);
  }
  return res;
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

// Two test cases to run function on
console.log(intersection([1,2,2,1], [2,2])) // [2]
console.log(intersection([4,9,5], [9,4,9,8,4])) // [9,4]