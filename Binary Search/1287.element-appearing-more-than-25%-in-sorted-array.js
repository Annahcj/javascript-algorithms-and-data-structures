// 1287. Element Appearing More Than 25% In Sorted Array
// Given an integer array sorted in non-decreasing order, there is exactly one integer in the array that occurs more than 25% of the time, return that integer.


// Solution 1: Sliding Window Approach

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


// Solution 2: Binary Search in each Quarter

// The integer appearing more than 25% of the time is bound to appear at least once in each "quarter" segment of the arr.
// Go through each four quarters of the array and use binary search to find the leftmost and rightmost indices of arr[i] (arr[i] = start of the quarter).

// Time Complexity: O(4log(n)) 60ms
// Space Complexity: O(1) 42.7MB
var findSpecialInteger = function(arr) {
  let n = arr.length, quarter = Math.floor(n / 4) + 1;
  for (let i = 0; i < n; i += quarter) {
    let leftBound = bisect_left(arr, arr[i]);
    let rightBound = bisect_right(arr, arr[i]);
    if (rightBound - leftBound + 1 >= quarter) return arr[i];
  }
};

// Find leftmost index of val
function bisect_left(arr, val) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] >= val) high = mid;
    else low = mid + 1;
  }
  return low;
}

// Find rightmost index of val
function bisect_right(arr, val) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (arr[mid] <= val) low = mid;
    else high = mid - 1;
  }
  return low;
}

// Two test cases
console.log(findSpecialInteger([1,2,2,6,6,6,6,7,10])) // 6
console.log(findSpecialInteger([1,1])) // 1