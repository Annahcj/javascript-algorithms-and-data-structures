// 370. Range Addition
// You are given an integer length and an array updates where updates[i] = [startIdxi, endIdxi, inci].
// You have an array arr of length length with all zeros, and you have some operation to apply on arr. In the ith operation, you should increment all the elements arr[startIdxi], arr[startIdxi + 1], ..., arr[endIdxi] by inci.
// Return arr after applying all the updates.


// Solution: Prefix Sum

// e.g: length = 5, updates = [[1,3,2]]
// res = [0,0,0,0,0]
// updates[0] = [1,3,2]: res = [0,2,0,0,-2]
// so when we process the final prefix sum, res = [0,2,2,2,0]

// 1. For each update, we add the val onto res[start], and decrement at res[end + 1].
// 2. Calculate the prefix sum for res and return.

// Time Complexity: O(n + k) 112ms
// Space Complexity: O(1) (not including output) 48.6MB
var getModifiedArray = function(length, updates) {
  let res = Array(length).fill(0);
  for (var [start, end, val] of updates) {
    res[start] += val;
    if (end < length - 1) res[end + 1] -= val; // decrement after end index, because we only increment in the range [start, end].
  }  
  for (var i = 1; i < length; i++) {
    res[i] += res[i - 1];
  }
  return res;
};

// Two test cases to run function on
console.log(getModifiedArray(5, [[1,3,2],[2,4,3],[0,2,-2]])) // [-2,0,3,5,3]
console.log(getModifiedArray(10, [[2,4,6],[5,6,8],[1,9,-4]])) // [0,-4,2,2,2,4,4,-4,-4,-4]