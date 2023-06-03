// 2708. Maximum Strength of a Group
// You are given a 0-indexed integer array nums representing the score of students in an exam. The teacher would like to form one non-empty group of students with maximal strength, where the strength of a group of students of indices i0, i1, i2, ... , ik is defined as nums[i0] * nums[i1] * nums[i2] * ... * nums[ik​].
// Return the maximum strength of a group the teacher can create.


// Solution: Greedy w/ Sorting

// Sort nums in asc order.

// Positives: Take all positive numbers.
// Negatives: Take an even number of negative numbers so that the product is positive. Take the smallest negatives for the maximum product.

// Note: In the case where there are no positive numbers and less than 2 negative numbers, we must take the maximum number in nums.

// Time Complexity: O(n log(n)) 106ms
// Space Complexity: O(log(n)) (space for sorting) 47.3MB
var maxStrength = function(nums) {
  let n = nums.length, negatives = 0, positives = 0;
  let ans = 1, max = -Infinity, maxNegative = -Infinity;
  nums.sort((a, b) => a - b);
  
  for (let num of nums) {
    if (num < 0) {
      ans *= num;
      negatives++;
      maxNegative = Math.max(maxNegative, num);
    } else if (num > 0) {
      ans *= num;
      positives++;
    }
    max = Math.max(max, num);
  }

  if (positives === 0 && negatives <= 1) {
    return nums[n - 1];
  }
  return negatives % 2 === 1 ? ans / maxNegative : ans;
};

// Two test cases
console.log(maxStrength([3,-1,-5,2,5,-9])) // 1350
console.log(maxStrength([-4,-5,-4])) // 20