// 3046. Split the Array
// You are given an integer array nums of even length. You have to split the array into two parts nums1 and nums2 such that:
  // nums1.length == nums2.length == nums.length / 2.
  // nums1 should contain distinct elements.
  // nums2 should also contain distinct elements.
// Return true if it is possible to split the array, and false otherwise.


// Solution: Counting

// If any number has more than 2 occurances, we can't split the array.
// Use a hashmap to store the occurances of each number.
// If an occurance exceeds 2, return false.

// Time Complexity: O(n) 55ms
// Space Complexity: O(n) 51.7MB
var isPossibleToSplit = function(nums) {
  let count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
    if (count[num] > 2) return false;
  }
  return true;
};

// Two test cases
console.log(isPossibleToSplit([1,1,2,2,3,4])) // true
console.log(isPossibleToSplit([1,1,1,1])) // false