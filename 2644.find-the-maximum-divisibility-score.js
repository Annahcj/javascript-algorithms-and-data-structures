// 2644. Find the Maximum Divisibility Score
// You are given two 0-indexed integer arrays nums and divisors.
// The divisibility score of divisors[i] is the number of indices j such that nums[j] is divisible by divisors[i].
// Return the integer divisors[i] with the maximum divisibility score. If there is more than one integer with the maximum score, return the minimum of them.


// Solution: Brute Force

// n = length of nums, m = length of divisors
// Time Complexity: O(nm) 407ms
// Space Complexity: O(1) 45.8MB
var maxDivScore = function(nums, divisors) {
  let maxScore = 0, num = Infinity;
  for (let i = 0; i < divisors.length; i++) {
    let divScore = 0;
    for (let j = 0; j < nums.length; j++) {
      divScore += nums[j] % divisors[i] === 0 ? 1 : 0;
    }
    if (divScore > maxScore) maxScore = divScore, num = divisors[i];
    else if (divScore === maxScore) num = Math.min(num, divisors[i]);
  }
  return num;
};

// Two test cases
console.log(maxDivScore([4,7,9,3,9], [5,2,3])) // 3
console.log(maxDivScore([20,14,21,10], [5,7,5])) // 5