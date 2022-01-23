// 2098. Subsequence of Size K With the Largest Even Sum
// You are given an integer array nums and an integer k. Find the largest even sum of any subsequence of nums that has a length of k.
// Return this sum, or -1 if such a sum does not exist.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Sorting

// Sort nums in desc order.
// Get the sum of the first k numbers.
// If the sum is even, return the sum.
// Otherwise, get the max of:
  // 1. Replacing the smallest odd number with the next largest even number
  // 2. Replacing the smallest even number with the next largest odd number

// Time Complexity: O(n log(n)) 182ms
// Space Complexity: O(log(n)) (sorting algo) 48.6MB
var largestEvenSum = function(nums, k) {
  nums.sort((a, b) => b - a);
  
  let sum = 0, minOdd = -1, minEven = -1;
  for (var i = 0; i < k; i++) {
    sum += nums[i];
    if (nums[i] % 2 === 0) minEven = nums[i];
    else minOdd = nums[i];
  }
  
  if (sum % 2 === 0) return sum;
  
  let nextOdd = -1, nextEven = -1;
  for (i = k; i < nums.length; i++) {
    if (nums[i] % 2 === 0 && nextEven === -1) nextEven = nums[i];
    else if (nums[i] % 2 === 1 && nextOdd === -1) nextOdd = nums[i];
    if (nextEven > -1 && nextOdd > -1) break;
  }
  
  let choice1 = minOdd === -1 || nextEven === -1 ? -1 : sum - minOdd + nextEven;
  let choice2 = minEven === -1 || nextOdd === -1 ? -1 : sum - minEven + nextOdd;
  let res = Math.max(choice1, choice2);
  return res;
};

// Three test cases to run function on
console.log(largestEvenSum([4,1,5,3,1], 3)) // 12
console.log(largestEvenSum([4,6,2], 3)) // 12
console.log(largestEvenSum([1,3,5], 1)) -1