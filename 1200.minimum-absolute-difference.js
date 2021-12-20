// 1200. Minimum Absolute Difference
// Given an array of distinct integers arr, find all pairs of elements with the minimum absolute difference of any two elements. 


// Solution: Sorting

// 1. Sort arr in asc order
// 2. Find the minimum difference between every pair of consecutive numbers
// 3. Add any consecutive pairs with a difference equal to the minimum difference to the result.

// Time Complexity: O(n log(n)) 164ms
// Space Complexity: O(log(n)) (sorting algo) 49.2MB
var minimumAbsDifference = function(arr) {
  arr.sort((a, b) => a - b);
  let minDiff = Infinity;
  for (var i = 1; i < arr.length; i++) {
    let diff = arr[i] - arr[i - 1];
    if (diff > 0) minDiff = Math.min(minDiff, diff);
  }
  let res = [];
  for (i = 1; i < arr.length; i++) {
    let diff = arr[i] - arr[i - 1];
    if (diff === minDiff) {
      res.push([arr[i - 1], arr[i]]);
    }
  }
  return res;
};

// Three test cases to run function on
console.log(minimumAbsDifference([4,2,1,3])) // [[1,2],[2,3],[3,4]]
console.log(minimumAbsDifference([1,3,6,10,15])) // [[1,3]]
console.log(minimumAbsDifference([3,8,-10,23,19,-4,-14,27])) // [[-14,-10],[19,23],[23,27]]
