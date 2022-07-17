// 2342. Max Sum of a Pair With Equal Sum of Digits
// You are given a 0-indexed array nums consisting of positive integers. You can choose two indices i and j, such that i != j, and the sum of digits of the number nums[i] is equal to that of nums[j].
// Return the maximum value of nums[i] + nums[j] that you can obtain over all possible indices i and j that satisfy the conditions.


// Solution: Hashmap of Max Numbers

// Similar to two sum - use a hashmap to keep track of the running maximum number for a given digit sum -> { digitSum: max num, digitSum: max num, ... }
// For each nums[i], create a pair with the current maximum stored in the hashmap for digitSum(nums[i]).

// Time Complexity: O(n log(n)) 169ms
  // log(n) to find the digit sum of a number
// Space Complexity: O(n) 53MB
var maximumSum = function(nums) {
  let maxSum = new Map(), ans = 0;
  for (let num of nums) {
    let digitSum = getDigitSum(num);
    if (maxSum.has(digitSum)) {
      let max = maxSum.get(digitSum);
      ans = Math.max(ans, num + max);
    }
    maxSum.set(digitSum, Math.max((maxSum.get(digitSum) || 0), num));
  }
  return ans === 0 ? -1 : ans;
};

function getDigitSum(num) {
  let sum = 0;
  while (num > 0) {
    sum += (num % 10);
    num = Math.floor(num / 10);
  }
  return sum;
}

// Two test cases to run function on
console.log(maximumSum([18,43,36,13,7])) // 54
console.log(maximumSum([10,12,19,14])) // -1