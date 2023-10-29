// 1287. Element Appearing More Than 25% In Sorted Array
// Given an integer array sorted in non-decreasing order, there is exactly one integer in the array that occurs more than 25% of the time, return that integer.


// Solution: Sliding Window Approach

// Thoughts:
// 25% means the length of the arr divided by 4.
// Since it needs to be MORE than 25%, we can round it down if there are decimals, and add one more.
// For e.g: [1,2,2,6,6,6,6,7,10]
// the length of the above arr is 9, so 25% is 2.25. 
// there is no such index as 2.25, so we do Math.floor -> 2.
// Now, looping through the arr, if we find that arr[i] equals arr[i + Math.floor(25%)], return arr[i].

// Algorithm:
// Set percent (25%) to Math.floor(arr.length / 4)
// Loop through arr (pointer = i)
  // If arr[i] equals arr[i + percent], return arr[i]
// If the loop finishes, return -1. (the question doesn't require this, but this is to handle other cases where there is no element that appears more than 25% of the time)

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 40.8MB
var findSpecialInteger = function(arr) {
  let percent = Math.floor(arr.length / 4);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + percent]) return arr[i];
  }
  return -1;
};

// Two test cases
console.log(findSpecialInteger([1,2,2,6,6,6,6,7,10])) // 6
console.log(findSpecialInteger([1,1])) // 1