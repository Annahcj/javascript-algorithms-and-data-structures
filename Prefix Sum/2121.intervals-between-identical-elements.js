// 2121. Intervals Between Identical Elements
// You are given a 0-indexed array of n integers arr.
// The interval between two elements in arr is defined as the absolute difference between their indices. More formally, the interval between arr[i] and arr[j] is |i - j|.
// Return an array intervals of length n where intervals[i] is the sum of intervals between arr[i] and each element in arr with the same value as arr[i].


// Solution: Prefix Sum

// 1. Make a hashmap for indices of the same numbers. e.g: {number: [index, index], number, [index], ...}
// 2. Calculate the prefix sum for each group of indices.
// 3. Calculate the sum of absolute differences between indices on the left, and on the right.

// Formula for sum of absolute differences for index:
  // left: (arr[index] * numbers on the left) - prefix sum up to pSum[index - 1]
  // right: (total prefix sum - prefix sum up to index) - (arr[index] * numbers on the right)

// Time Complexity: O(n) 512ms
// Space Complexity: O(n) 87.9MB
var getDistances = function(arr) {
  let idxMap = {}, n = arr.length;
  for (let i = 0; i < n; i++) {
    if (!idxMap[arr[i]]) idxMap[arr[i]] = [];
    idxMap[arr[i]].push(i);
  }  

  let sums = Array(n);
  for (let num in idxMap) {
    let idxs = idxMap[num];
    let pSum = Array(idxs.length);
    for (let j = 0; j < idxs.length; j++) {
      let prev = j === 0 ? 0 : pSum[j - 1];
      pSum[j] = prev + idxs[j];
    }
    for (let j = 0; j < idxs.length; j++) {
      let rightRange = idxs.length - 1 - j;
      let leftSum = j === 0 ? 0 : idxs[j] * j - pSum[j - 1];
      let rightSum = j === idxs.length - 1 ? 0 : (pSum[idxs.length - 1] - pSum[j]) - (idxs[j] * rightRange);
      sums[idxs[j]] = leftSum + rightSum;
    }
  }
  return sums;
};

// Two test cases
console.log(getDistances([2,1,3,1,2,3,3])) // [4,2,7,2,4,4,5]
console.log(getDistances([10,5,10,10])) // [5,0,3,4]