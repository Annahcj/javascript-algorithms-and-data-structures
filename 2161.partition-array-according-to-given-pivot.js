// 2161. Partition Array According to Given Pivot
// You are given a 0-indexed integer array nums and an integer pivot. Rearrange nums such that the following conditions are satisfied:
  // Every element less than pivot appears before every element greater than pivot.
  // Every element equal to pivot appears in between the elements less than and greater than pivot.
  // The relative order of the elements less than pivot and the elements greater than pivot is maintained.
    // More formally, consider every pi, pj where pi is the new position of the ith element and pj is the new position of the jth element. For elements less than pivot, if i < j and nums[i] < pivot and nums[j] < pivot, then pi < pj. Similarly for elements greater than pivot, if i < j and nums[i] > pivot and nums[j] > pivot, then pi < pj.
// Return nums after the rearrangement.

 
// Solution: Three Arrays

// Collect the numbers in three separate arrays smaller, equal, and greater.
// Combine and return them at the end.

// Time Complexity: O(n) 441ms
// Space Complexity: O(n) 94.9MB
var pivotArray = function(nums, pivot) {
  let smaller = [], equal = [], greater = [];
  for (let num of nums) {
    if (num < pivot) {
      smaller.push(num);
    } else if (num === pivot) {
      equal.push(num);
    } else {
      greater.push(num);
    }
  }
  return [...smaller, ...equal, ...greater];
};