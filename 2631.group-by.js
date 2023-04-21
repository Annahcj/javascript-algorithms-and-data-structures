// 2631. Group By
// Write code that enhances all arrays such that you can call the array.groupBy(fn) method on any array and it will return a grouped version of the array.
// A grouped array is an object where each key is the output of fn(arr[i]) and each value is an array containing all items in the original array with that key.
// The provided callback fn will accept an item in the array and return a string key.
// The order of each value list should be the order the items appear in the array. Any order of keys is acceptable.


// Solution: 

// n = length of the array
// Time Complexity: O(n) 155ms
// Space Complexity: O(n) 67.1MB
Array.prototype.groupBy = function(fn) {
  let obj = {};
  for (let item of this) {
    let key = fn(item);
    if (!obj[key]) obj[key] = [];
    obj[key].push(item);
  }  
  return obj;
};