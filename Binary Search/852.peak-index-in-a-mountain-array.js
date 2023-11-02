// 852. Peak Index in a Mountain Array
// Let's call an array arr a mountain if the following properties hold:
  // arr.length >= 3
  // There exists some i with 0 < i < arr.length - 1 such that:
  // arr[0] < arr[1] < ... arr[i-1] < arr[i]
  // arr[i] > arr[i+1] > ... > arr[arr.length - 1]
// Given an integer array arr that is guaranteed to be a mountain, return any i such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].


// Solution: Binary Search

// Binary search for the peak index.
  // If we find the peak, return the index.
  // If on the incline, go right.
  // If on the decline, go left.

// Time Complexity: O(log(n)) 86ms
// Space Complexity: O(1) 42.2MB
var peakIndexInMountainArray = function(arr) {
  let n = arr.length;
  let low = 0, high = n - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid - 1] < arr[mid] && arr[mid + 1] < arr[mid]) return mid;
    if (arr[mid - 1] < arr[mid]) low = mid + 1;
    else high = mid - 1;
  }
};

// Three test cases to run function on
console.log(peakIndexInMountainArray([0,1,0])) // 1
console.log(peakIndexInMountainArray([0,2,1,0])) // 1
console.log(peakIndexInMountainArray([0,10,5,2])) // 1