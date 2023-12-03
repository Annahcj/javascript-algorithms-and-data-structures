// 2951. Find the Peaks
// You are given a 0-indexed array mountain. Your task is to find all the peaks in the mountain array.
// Return an array that consists of indices of peaks in the given array in any order.
// Notes:
  // A peak is defined as an element that is strictly greater than its neighboring elements.
  // The first and last elements of the array are not a peak.


// Solution:

// Find the indices where mountain[i] is larger than both neighboring elements.

// Time Complexity: O(n) 54ms
// Space Complexity: O(1) (not including output) 43.9MB
var findPeaks = function(mountain) {
  let n = mountain.length, peakIndices = [];
  for (let i = 1; i < n - 1; i++) {
    if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1]) {
      peakIndices.push(i);
    }
  }
  return peakIndices;
};

// Two test cases
console.log(findPeaks([2,4,4])) // []
console.log(findPeaks([1,4,3,8,5])) // [1,3]