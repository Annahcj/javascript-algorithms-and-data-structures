// 1574. Shortest Subarray to be Removed to Make Array Sorted
// Given an integer array arr, remove a subarray (can be empty) from arr such that the remaining elements in arr are non-decreasing.
// A subarray is a contiguous subsequence of the array.
// Return the length of the shortest subarray to remove.


// Solution: Two Pointers

// Logic:
// Find the longest sequence of increasing nums from right to left,
// and from left to right.
// Find the shortest middle subarray to 'merge' these two sequences.
// For e.g: [1,2,3,10,4,2,3,5]
// From right to left, the index we stop at will be 5 
//             j
// [1,2,3,10,4,2,3,5]
// Then go from left to right (i) while arr[i] is smaller than or equal to arr[j], 
// keep track of the shortest length of the subarray to be removed (min),
// and then increase j until arr[j] is bigger than or equal to arr[i]

// repeat the above steps while i < j AND arr[i] is still part of an increasing sequence.

// Algorithm:
// (Find longest increasing from right to left)
// Loop from back to front (j) while arr[j] is smaller than or equal to arr[j + 1] 
// Loop through from front to back (i), while i < j AND arr[i] is part of increasing sequence *
  // Increment j until arr[j] is bigger than or equal to arr[i]
  // Update min (minimum subarray) if (j - i - 1) is smaller than min
  // Increment i by one.
// *
// If min is smaller than 0, return 0, otherwise return min.

// Time Complexity: O(n) 92ms
// Space Complexity: O(1) 50MB
  var findLengthOfShortestSubarray = function(arr) {
    let len = arr.length;
    let j = len - 1;
    while (j === len - 1 || (j >= 0 && arr[j] <= arr[j + 1])) {
      j--;
    }
    j++;
    let min = j;
    let i = 0;
    while (i === 0 || (i < j && arr[i] >= arr[i - 1])) {
      while (arr[i] > arr[j] && j < len) {
        j++;
      }
      min = Math.min(min, j - i - 1);
      i++;
    }
    return min < 0 ? 0 : min;
  };
  
  // Eight test cases to run function on
  console.log(findLengthOfShortestSubarray([5,6,7,8,1,2])) // 2
  console.log(findLengthOfShortestSubarray([16,10,0,3,22,1,14,7,1,12,15])) // 8
  console.log(findLengthOfShortestSubarray([1,2,3,10,0,7,8,9])) // 2
  console.log(findLengthOfShortestSubarray([13,0,14,7,18,18,18,16,8,15,20])) // 8
  console.log(findLengthOfShortestSubarray([1,2,3,10,4,2,3,5])) // 3
  console.log(findLengthOfShortestSubarray([5,4,3,2,1])) // 4
  console.log(findLengthOfShortestSubarray([1,2,3])) // 0
  console.log(findLengthOfShortestSubarray([1])) // 0