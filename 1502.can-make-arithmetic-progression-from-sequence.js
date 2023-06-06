// 1502. Can Make Arithmetic Progression From Sequence
// A sequence of numbers is called an arithmetic progression if the difference between any two consecutive elements is the same.
// Given an array of numbers arr, return true if the array can be rearranged to form an arithmetic progression. Otherwise, return false.


// Solution 1: Sorting

// Sort arr in asc order.
// Check whether the difference between each adjacent pair of elements are the same.

// Time Complexity: O(n log(n)) 58ms
// Space Complexity: O(log(n)) (space for sorting) 42.4MB
var canMakeArithmeticProgression = function(arr) {
  arr.sort((a, b) => a - b);
  let diff = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== diff) return false;
  }
  return true;
};


// Solution 2: Hashset

// 1. Find the minimum and maximum numbers in arr and add all numbers to a set.
// 2. Based on the min, max, and the length of arr, we can figure out the difference in the sequence.
  // diff = (max - min) / (n - 1)
// 3. Based on the difference, we can start from the min element, increase by the difference, and check if the set contains each of these numbers.

// Time Complexity: O(n) 65ms
// Space Complexity: O(n) 43.5MB
var canMakeArithmeticProgression = function(arr) {
  let n = arr.length, set = new Set();
  let min = arr[0], max = arr[0];
  for (let i = 0; i < n; i++) {
    min = Math.min(min, arr[i]);
    max = Math.max(max, arr[i]);
    set.add(arr[i]);
  }
  let diff = (max - min) / (n - 1);
  let num = min;
  for (let i = 0; i < n; i++) {
    if (!set.has(num)) return false;
    num += diff;
  }
  return true;
};

// Two test cases
console.log(canMakeArithmeticProgression([3,5,1])) // true
console.log(canMakeArithmeticProgression([1,2,4])) // false