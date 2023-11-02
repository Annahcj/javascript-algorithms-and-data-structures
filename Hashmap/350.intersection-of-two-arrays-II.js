// 350. Intersection of Two Arrays II
// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.


// Solution: Hashmap for Frequencies

// Use hashmap to store frequencies of each number in nums1
// Loop through nums2 (pointer = i)
  // if freq of num2[i] is bigger than 0
    // push nums2[i] into res
    // decrease frequency of nums2[i] by one
// return res

// len1 = length of nums1, len2 = length of nums2
// Time Complexity: O(len1 + len2) 86ms
// Space Complexity: O(min(len1, len2)) 40.7MB
var intersect = function(nums1, nums2) {
  let freq = new Map(), res = [];
  for (var i = 0; i < nums1.length; i++) {
    freq.set(nums1[i], freq.get(nums1[i]) + 1 || 1);
  }  
  for (i = 0; i < nums2.length; i++) {
    if (freq.get(nums2[i]) > 0) {
      res.push(nums2[i]);
      freq.set(nums2[i], freq.get(nums2[i]) - 1);
    }
  }
  return res;
};

// follow-up question -> if input is sorted
var intersectSorted = function(nums1, nums2) {
  let res = [];
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) i++;
    else if (nums1[i] > nums2[j]) j++;
    else {
      res.push(nums1[i]);
      i++, j++;
    }
  }
  return res;
};

console.log(intersectSorted([1,2,5], [1,2,2,3,4])) // [1,2]
console.log(intersectSorted([3,7,8], [1,2,2,3,7])) // [3,7]

// Two test cases to run function on
console.log(intersect([1,2,2,1], [2,2])) // [2,2]
console.log(intersect([4,9,5], [9,4,9,8,4])) // [4,9]