// 2600. K Items With the Maximum Sum
// There is a bag that consists of items, each item has a number 1, 0, or -1 written on it.
// You are given four non-negative integers numOnes, numZeros, numNegOnes, and k.
// The bag initially contains:
  // numOnes items with 1s written on them.
  // numZeroes items with 0s written on them.
  // numNegOnes items with -1s written on them.
// We want to pick exactly k items among the available items. Return the maximum possible sum of numbers written on the items.


// Solution: Take as many 1's as possible, then 0's, then -1's up to k items.

// Time Complexity: O(1) 99ms
// Space Complexity: O(1) 44MB
var kItemsWithMaximumSum = function(numOnes, numZeros, numNegOnes, k) {
  let onesToTake = Math.min(numOnes, k);
  let zerosToTake = Math.min(numZeros, k - onesToTake);
  let negOnesToTake = Math.min(numNegOnes, k - onesToTake - zerosToTake);
  return onesToTake - negOnesToTake;
};

// Two test cases
console.log(kItemsWithMaximumSum(3, 2, 0, 2)) // 2
console.log(kItemsWithMaximumSum(3, 2, 0, 4)) // 3