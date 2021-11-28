// 2089. Find Target Indices After Sorting Array
// You are given a 0-indexed integer array nums and a target element target.
// A target index is an index i such that nums[i] == target.
// Return a list of the target indices of nums after sorting nums in non-decreasing order. If there are no target indices, return an empty list. The returned list must be sorted in increasing order.


// Solution: Sorting

// 1. Sort in asc order
// 2. Get indexes of all numbers equal to target

var targetIndices = function(nums, target) {
  let res = [];
  nums.sort((a, b) => a - b);
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === target) res.push(i);
  }
  return res;
};

// A test case to run function on
console.log(targetIndices([1,2,5,2,3], 2)) // [1,2]