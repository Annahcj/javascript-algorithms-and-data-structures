// 1636. Sort Array by Increasing Frequency
// Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.
// Return the sorted array.


// Solution: Count Frequency & Sort

// Count the frequency of each number, then sort by the frequency.
// If two frequencies are equal, sort in descending order.

// Time Complexity: O(n log(n)) 136ms
// Space Complexity: O(n) 40.3MB
var frequencySort = function(nums) {
  let freq = new Map();
  for (var num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  return nums.sort((a, b) => {
    if (freq.get(a) === freq.get(b)) return b - a;
    return freq.get(a) - freq.get(b);
  });
};

// Three test cases to run function on
console.log(frequencySort([1,1,2,2,2,3])) // [3,1,1,2,2,2]
console.log(frequencySort([2,3,1,3,2])) // [1,3,3,2,2]
console.log(frequencySort([-1,1,-6,4,5,-6,1,4,1])) // [5,-1,4,4,-6,-6,1,1,1]