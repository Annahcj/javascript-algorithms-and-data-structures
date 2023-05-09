// 2634. Filter Elements from Array
// Given an integer array arr and a filtering function fn, return a new array with a fewer or equal number of elements.
// The returned array should only contain elements where fn(arr[i], i) evaluated to a truthy value.


// Solution: Call fn(arr[i], i) for each element in arr and push to the result array.

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 41.3MB
var filter = function(arr, fn) {
  const res = []; 
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) res.push(arr[i]);
  }
  return res;
};