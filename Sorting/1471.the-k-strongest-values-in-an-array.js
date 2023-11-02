// 1471. The k Strongest Values in an Array
// Given an array of integers arr and an integer k.
// A value arr[i] is said to be stronger than a value arr[j] if |arr[i] - m| > |arr[j] - m| where m is the median of the array.
// If |arr[i] - m| == |arr[j] - m|, then arr[i] is said to be stronger than arr[j] if arr[i] > arr[j].
// Return a list of the strongest k values in the array. return the answer in any arbitrary order.
// Median is the middle value in an ordered integer list. More formally, if the length of the list is n, the median is the element in position ((n - 1) / 2) in the sorted list (0-indexed).
  // For arr = [6, -3, 7, 2, 11], n = 5 and the median is obtained by sorting the array arr = [-3, 2, 6, 7, 11] and the median is arr[m] where m = ((5 - 1) / 2) = 2. The median is 6.
  // For arr = [-7, 22, 17, 3], n = 4 and the median is obtained by sorting the array arr = [-7, 3, 17, 22] and the median is arr[m] where m = ((4 - 1) / 2) = 1. The median is 3.


// Solution: Sorting & Two Pointers

// First sort the arr in asc order and get the median.
// Use two pointers starting from index 0 and index n - 1 to get the strongest k values.
// We start from the start and end index because we know they are the furthest points away from the median and will have the largest difference.
  // If arr[i] is stronger than arr[j], take arr[i] and move i up.
  // Otherwise if arr[j] is stronger, take arr[j] and move j down.

// Time Complexity: O(n log(n)) 337ms
// Space Complexity: O(k) 67.1MB
var getStrongest = function(arr, k) {
  arr.sort((a, b) => a - b);
  let n = arr.length, median = arr[Math.floor((n - 1) / 2)];
  let i = 0, j = n - 1, ans = [];
  while (k > 0) {
    if (Math.abs(arr[j] - median) >= Math.abs(arr[i] - median)) {
      ans.push(arr[j--]); 
    } else {
      ans.push(arr[i++]);
    }
    k--;
  }
  return ans;
};

// Three test cases
console.log(getStrongest([1,2,3,4,5], 2)) // [5,1]
console.log(getStrongest([1,1,3,5,5], 2)) // [5,5]
console.log(getStrongest([6,7,11,7,6,8], 5)) // [11,8,6,6,7]