// 1460. Make Two Arrays Equal by Reversing Subarrays
// You are given two integer arrays of equal length target and arr. In one step, you can select any non-empty subarray of arr and reverse it. You are allowed to make any number of steps.
// Return true if you can make arr equal to target or false otherwise.


// Solution 1: Greedy & Sorting

// Sort both target and arr in asc order, then compare every target[i] and arr[i].

// Time Complexity: O(n log(n)) 54ms
// Space Complexity: O(log(n)) 51.7MB
var canBeEqual = function(target, arr) {
  target.sort((a, b) => a - b);
  arr.sort((a, b) => a - b);
  for (let i = 0; i < target.length; i++) {
    if (target[i] !== arr[i]) {
      return false;
    }
  }
  return true;
};


// Solution 2: Greedy & Counting

// We can make any permutation of numbers through reversing subarrays.
// Hence, if target and arr contains the same occurances of numbers, then it's always possible to convert arr to target.

// Use two hashmaps to count the occurances of numbers in target and arr.
// At the end, go through each count of occurances and compare any differences.
// If the distinct count of numbers in target and arr are not equal, then the values are not equal.
// If any of the counts don't match, then the array elements are not identical.

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 52.4MB
var canBeEqual = function(target, arr) {
  let n = target.length;
  let targetCount = {}, arrCount = {};
  let targetDistinctCount = 0, arrDistinctCount = 0;
  for (let i = 0; i < n; i++) {
    targetCount[target[i]] = (targetCount[target[i]] || 0) + 1;
    arrCount[arr[i]] = (arrCount[arr[i]] || 0) + 1;
    if (targetCount[target[i]] === 1) {
      targetDistinctCount++;
    }
    if (arrCount[arr[i]] === 1) {
      arrDistinctCount++;
    }
  }
  if (targetDistinctCount !== arrDistinctCount) {
    return false;
  }
  for (let num in targetCount) {
    if (targetCount[num] !== arrCount[num]) {
      return false;
    }
  } 
  return true;
};

// Three test cases
console.log(canBeEqual([1,2,3,4], [2,4,1,3])) // true
console.log(canBeEqual([7], [7])) // true
console.log(canBeEqual([3,7,9], [3,7,11])) // false