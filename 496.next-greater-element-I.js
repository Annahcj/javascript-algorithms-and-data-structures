// 496. Next Greater Element I
// The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
// You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.
// For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.
// Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.


// Solution: Stack

// we can pre-compute the next greater number of each number in nums2, and store them in a map.
// for e.g: [1,3,4,2]
// loop through from back to front (pointer = i)
  // keeping popping from stack while stack is not empty AND last element in stack is smaller than nums2[i]
  // if stack is not empty, store stack[stack.length - 1] as the next greatest element of nums2[i]
  // otherwise, set -1 for nums2[i] (no greater element)

// now, loop through nums1, and simply get the values from the map.

// explanation of -> while (stack.length && nums2[i] >= stack[stack.length - 1]) stack.pop()
  // this works because we need the next greater element, 
  // meaning anything smaller than the current element doesn't need to be counted.

// n = nums1.length, m = nums2.length
// Time Complexity: O(n + m) 98ms
// Space Complexity: O(n) 40.2MB
var nextGreaterElement = function(nums1, nums2) {
  let map = new Map();
  let stack = [];
  for (var i = nums2.length - 1; i >= 0; i--) {
    while (stack.length && nums2[i] >= stack[stack.length - 1]) stack.pop();
    if (stack.length) {
      map.set(nums2[i], stack[stack.length - 1]);
    } else {
      map.set(nums2[i], -1);
    }
    stack.push(nums2[i]);
  }  
  for (var j = 0; j < nums1.length; j++) {
    nums1[j] = map.get(nums1[j]);
  }
  return nums1;
};

// A test case to run function on
console.log(nextGreaterElement([4,1,2], [1,3,4,2])) // [-1,3,-1]