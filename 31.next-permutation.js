// 31. Next Permutation
// Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.


// Solution 1: Back to Front Traversal

// Instead of using brute force and generating every possible permutation, there is a much more efficient way.
// Traverse the array from back to front and find the first number that is smaller than the one before it.
// When we get to that point, traverse all the elements to the right of the number to find the closest greatest number (the smallest number that is still greater than it),
// then swap them, and break out of the loop.
// Finally, reverse the remaining numbers on the right, and you have your next biggest permutation.

// Time Complexity: O(n) 112ms
// Space Complexity: O(1) 40.7MB

var nextPermutation = function(nums) {
    let j;
    for (var i = nums.length - 1; i > 0; i--) {
      if (nums[i] > nums[i - 1]) {
        j = findClosest(nums, i - 1, i);
        [nums[i - 1], nums[j]] = [nums[j], nums[i - 1]];
        break;
      }
    }
    reverse(nums, i);
    // returning just for testing purposes, the problem states that you shouldn't return anything.
    return nums;
  };

  // helper function to find smallest greater number
  function findClosest(nums, i, j) {
    let k = j;
    while (k < nums.length) {
      k++;
      // reason for '<=': its important to find the last occurance of the smallest greater number, not the first, or there will be an issue when we reverse the remaining numbers.
      if (nums[k] <= nums[j] && nums[k] > nums[i]) j = k;
    }
    return j;
  }
  
  // helper function to reverse numbers
  function reverse(nums, i) {
    let j = nums.length - 1;
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++, j--;
    }
  }
  
  // Five test cases to run function on
  console.log(nextPermutation([2,3,1])) // [3,1,2]
  console.log(nextPermutation([2,3,1,3,3])) // [2,3,3,1,3]
  console.log(nextPermutation([1,2,3])) // [1,3,2]
  console.log(nextPermutation([3,2,1])) // [1,2,3]
  console.log(nextPermutation([1,1,5])) // [1,5,1]