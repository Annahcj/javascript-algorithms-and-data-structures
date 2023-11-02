// 80. Remove Duplicates from Sorted Array II
// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.
// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
// Return k after placing the final result in the first k slots of nums.
// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.


// Solution: Two Pointers

// We keep two pointers, and keep shifting elements down.
// We check to make sure each number isn't more than a duplicate -> nums[j] !== nums[j - 2]
// BUT! If we keep shifting them down, we might be checking against a new number which we shifted down, so we keep it in a 'prev' variable instead.
// To illustrate: [1,1,1,2,2,3]
// i = 0, j = 0, prev = undefined -> nums[j] !== prev, so update prev to nums[j - 1] (undefined), shift nums[j] down to nums[i], and increment i.
// [1,1,1,2,2,3]
// i = 1, j = 1, prev = undefined -> nums[j] !== prev, so update prev to nums[j - 1] (1), shift nums[j] down to nums[i], and increment i.
// [1,1,1,2,2,3]
// i = 2, j = 2, prev = 1 -> nums[j] === prev, so don't do anything.
// [1,1,1,2,2,3]
// i = 2, j = 3, prev = 1 -> nums[j] !== prev, so update prev to nums[j - 1] (1), shift nums[j] down to nums[i], and increment i.
// [1,1,2,2,2,3]
// i = 3, j = 4, prev = 1 -> nums[j] !== prev, so update prev to nums[j - 1] (2), shift nums[j] down to nums[i], increment i.
// [1,1,2,2,2,3]
// i = 4, j = 5, prev = 2 -> nums[j] !== prev, so update prev to nums[j - 1] (2), shift nums[j] down to nums[i], increment i
// [1,1,2,2,3,3]

// Algorithm:
// Set i to 0, j to 0.
// Set prev (j - 2) to undefined initially. (this is to avoid checking against modified values)
// Loop while j < nums.length *
  // If nums[j] is not equal to prev
    // update prev to nums[j - 1] (for next loop)
    // shift nums[j] down to nums[i]
    // increment i by one
  // *
  // Increment j by one
// Return i

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 40.9MB
  var removeDuplicates = function(nums) {
    let i = 0, j = 0;
    let prev;
    while (j < nums.length) {
      if (nums[j] !== prev) {
        prev = nums[j - 1];
        nums[i] = nums[j];
        i++;
      } 
      j++;
    } 
    // For testing purposes only
    console.log(nums)
    return i;
  };
  
  // Two test cases to run function on
  console.log(removeDuplicates([1,1,1,2,2,3])) // 5  -> [1,1,2,2,3,_]
  console.log(removeDuplicates([0,0,1,1,1,1,2,3,3])) // 7  -> [0,0,1,1,2,3,3,_,_]