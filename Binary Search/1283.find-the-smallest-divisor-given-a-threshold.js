// 1283. Find the Smallest Divisor Given a Threshold
// Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less than or equal to threshold.
// Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: 7/3 = 3 and 10/2 = 5).
// The test cases are generated so that there will be an answer.


// Solution: Binary Search

// Lower bound = 0, upper bound = max of nums (divisors bigger than the max will not make any difference).
// Binary search for the smallest divisor where the division result is less than or equal to the threshold.

// m = max of nums
// Time Complexity: O(n log(m)) 149ms
// Space Complexity: O(1) 43.7MB
var smallestDivisor = function(nums, threshold) {
  let max = 0;
  for (let num of nums) max = Math.max(max, num);
  
  let low = 0, high = max;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (bigEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
      
  function bigEnough(divisor) {
    let sum = 0;
    for (let num of nums) sum += Math.ceil(num / divisor);
    return sum <= threshold;
  }  
};

// Two test cases 
console.log(smallestDivisor([1,2,5,9], 6)) // 5
console.log(smallestDivisor([44,22,33,11,1], 5)) // 44