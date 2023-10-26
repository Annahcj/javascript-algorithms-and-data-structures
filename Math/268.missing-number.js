// 268. Missing Number
// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.


// Solution: Using Total Sum

// We can calculate the total sum of numbers 0 to n
// Then, calculate the sum in nums.
// Return total sum - nums sum

// Time Complexity: O(n) (technically O(2n) 81ms
// Space Complexity: O(1) 42.8MB
var missingNumber = function(nums) {
  let sum = 0, n = nums.length;
  let totalSum = 0;
  for (var num of nums) sum += num;
  for (var i = 1; i <= n; i++) totalSum += i;
  return totalSum - sum;
};

// Solution 2: Math Trick / Gauss' Formula

// Instead of calculating the total sum manually, we can use Gauss' Formula to calculate this sum in O(1) time.
// n * (n + 1) / 2 -> calculates the total sum of numbers from 1 to n

// Time Complexity: O(n) 119ms
// Space Complexity: O(1) 41.1MB
var missingNumber = function(nums) {
  let sum = 0, n = nums.length;
  let totalSum = n * (n + 1) / 2;
  console.log(totalSum, n)
  for (var num of nums) sum += num;
  return totalSum - sum;
};

// Five test cases to run function on
console.log(missingNumber([2,0])) // 1
console.log(missingNumber([3,0,1])) // 2
console.log(missingNumber([0,1])) // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])) // 8
console.log(missingNumber([0])) // 1