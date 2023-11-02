// 941. Valid Mountain Array
// Given an array of integers arr, return true if and only if it is a valid mountain array.
// Recall that arr is a mountain array if and only if:
  // arr.length >= 3
  // There exists some i with 0 < i < arr.length - 1 such that:
    // arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    // arr[i] > arr[i + 1] > ... > arr[arr.length - 1]


// Solution: One Pass

// If we are going uphill, 
  // if we have already gone downhill before, return false.
  // mark up as true.
// If we are going downhill, we have to have gone uphill before.
  // If we haven't gone uphill before, return false.
  // Mark downhill as true.
// If we are going on flat land, return false.
// After the iteration is finished, return true if both uphill and downhill are marked as true.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 41.8MB
var validMountainArray = function(arr) {
  let up = 0, down = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      if (down === 1) return false;
      up = 1;
    } else if (arr[i] < arr[i - 1]) {
      if (up === 0) return false;
      down = 1;
    } else {
      return false;
    }
  }
  return up === 1 && down === 1;
};

// Three test cases
console.log(validMountainArray([2,1])) // false
console.log(validMountainArray([3,5,5])) // false
console.log(validMountainArray([0,3,2,1])) // true