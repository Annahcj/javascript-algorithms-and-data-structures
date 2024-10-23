// 3326. Minimum Division Operations to Make Array Non Decreasing
// You are given an integer array nums.
// Any positive divisor of a natural number x that is strictly less than x is called a proper divisor of x. For example, 2 is a proper divisor of 4, while 6 is not a proper divisor of 6.
// You are allowed to perform an operation any number of times on nums, where in each operation you select any one element from nums and divide it by its greatest proper divisor.
// Return the minimum number of operations required to make the array non-decreasing.
// If it is not possible to make the array non-decreasing using any number of operations, return -1.


// Solution: Greedy

// Starting from back to front, reduce every nums[i] if it is bigger than nums[i + 1].
// To reduce nums[i], find the first (smallest) number that divides nums[i]:
  // nums[i] / first divisor = greatest divisor
  // The first divisor is always a prime number, because if it had a divisor that divisor would be the first divisor of nums[i].
  // A prime number has no proper divisors, so each number can only be reduced at most once.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n sqrt(m)) 268ms
// Space Complexity: O(1) 67.1MB
function minOperations(nums) {
  let n = nums.length, operations = 0;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      let smallestDivisor = getSmallestDivisor(nums[i]);
      if (smallestDivisor === -1 || smallestDivisor > nums[i + 1]) return -1;
      nums[i] = smallestDivisor;
      operations++;
    }
  }
  return operations;
};

function getSmallestDivisor(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return i;
    }
  }
  return -1;
}

// Three test cases
console.log(minOperations([25,7])) // 1
console.log(minOperations([7,7,6])) // -1
console.log(minOperations([1,1,1,1])) // 0