// 1300. Sum of Mutated Array Closest to Target
// Given an integer array arr and a target value target, return the integer value such that when we change all the integers larger than value in the given array to be equal to value, the sum of the array gets as close as possible (in absolute difference) to target.
// In case of a tie, return the minimum such integer.
// Notice that the answer is not neccesarilly a number from arr.


// Solution: Binary Search

// Binary search for the highest value with sum of array <= target.
// To account for the absolute difference, we need to compare it with the upper bound index + 1.

// Things to keep in mind:
  // If value is bigger, sum will be bigger
  // If value is smaller, sum will be smaller

// n = length of arr, m = max(arr)
// Time Complexity: O(n log(m)) 85ms
// Space Complexity: O(1) 44.4MB
var findBestValue = function(arr, target) {
  let upperValue = upper_bound(arr, target), lowerValue = upperValue + 1;
  let upperSum = arr.reduce((acc, num) => acc + Math.min(num, upperValue), 0);
  let lowerSum = arr.reduce((acc, num) => acc + Math.min(num, lowerValue), 0);
  let upperDiff = Math.abs(target - upperSum), lowerDiff = Math.abs(target - lowerSum);
  return upperDiff <= lowerDiff ? upperValue : lowerValue;
};

function upper_bound(arr, target) { // highest value with sum of array <= target 
  let low = 0, high = Math.max(...arr);
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (sumLessThanEqualTarget(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function sumLessThanEqualTarget(value) {
    let sum = 0;
    for (let num of arr) {
      sum += Math.min(num, value);
    }
    return sum <= target;
  }
}

// Two test cases
console.log(findBestValue([4,9,3], 10)) // 3
console.log(findBestValue([2,3,5], 10)) // 5