// 2635. Apply Transform Over Each Element in Array
// Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.
// The returned array should be created such that returnedArray[i] = fn(arr[i], i).


// Solution: Call fn(arr[i], i) for each element in arr and populate the result

// Time Complexity: O(n) 70ms
// Space Complexity: O(n) 41.8MB
var map = function(arr, fn) {
  const res = Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    res[i] = (fn(arr[i], i));
  }
  return res;
};