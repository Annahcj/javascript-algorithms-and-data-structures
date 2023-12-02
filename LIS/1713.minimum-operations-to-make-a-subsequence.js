// 1713. Minimum Operations to Make a Subsequence
// You are given an array target that consists of distinct integers and another integer array arr that can have duplicates.
// In one operation, you can insert any integer at any position in arr. For example, if arr = [1,4,1,2], you can add 3 in the middle and make it [1,4,3,1,2]. Note that you can insert the integer at the very beginning or end of the array.
// Return the minimum number of operations needed to make target a subsequence of arr.
// A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, [2,7,4] is a subsequence of [4,2,3,7,2,1,4] (the underlined elements), while [2,4,2] is not.


// Solution: Longest Increasing Subsequence

// We want to find the longest common subsequence between target and arr.
// Since target contains distinct integers, replace the values in arr with the corresponding indices in target.
// Then, find the longest increasing subsequence of target indices in arr.
  // Binary search for the leftmost index in seq >= indices[i]
  // If there is no such index, then we can push indices[i] to the end of the sequence.
  // Otherwise, replace seq[index] with indices[i].

// m = length of target, n = length of arr
// Time Complexity: O(m + n log(n)) 149ms
// Space Complexity: O(m + n) 72.9MB
var minOperations = function(target, arr) {
  let targetIndexMap = new Map(); // {[target[i]]: i, [target[i]]: i, ...}
  for (let i = 0; i < target.length; i++) {
    targetIndexMap.set(target[i], i);
  }
  let indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (targetIndexMap.has(arr[i])) {
      indices.push(targetIndexMap.get(arr[i]));
    }
  }
  let seq = [];
  for (let i = 0; i < indices.length; i++) {
    let seqIndex = lower_bound(seq, indices[i]);
    if (seqIndex === seq.length) {
      seq.push(indices[i]); 
    } else {
      seq[seqIndex] = indices[i];
    }
  }
  return target.length - seq.length;
};

// binary search for leftmost index where arr[index] >= val
function lower_bound(arr, val) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] >= val) high = mid;
    else low = mid + 1;
  }
  return arr[low] >= val ? low : arr.length;
}

// Two test cases
console.log(minOperations([5,1,3], [9,4,2,3,4])) // 2
console.log(minOperations([6,4,8,1,3,2], [4,7,6,2,3,8,6,1])) // 3