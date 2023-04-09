// 2614. Prime In Diagonal
// You are given a 0-indexed two-dimensional integer array nums.
// Return the largest prime number that lies on at least one of the diagonals of nums. In case, no prime is present on any of the diagonals, return 0.
// Note that:
  // An integer is prime if it is greater than 1 and has no positive integer divisors other than 1 and itself.
  // An integer val is on one of thediagonals of nums if there exists an integer i for which nums[i][i] = val or an i for which nums[i][nums.length - i - 1] = val.


// Solution: 

// Go through each diagonal and record the maximum prime number.
// To check if the number is prime, check its divisibility with each number from 2 to sqrt(num).

// n = nums.length
// Time Complexity: O(n sqrt(n)) 86ms
// Space Complexity: O(1) 49.8MB
var diagonalPrime = function(nums) {
  let n = nums.length, ans = 0;
  for (let i = 0; i < n; i++) {
    if (isPrime(nums[i][i])) ans = Math.max(ans, nums[i][i]);
    if (isPrime(nums[i][n - i - 1])) ans = Math.max(ans, nums[i][n - i - 1]);
  }
  return ans;
};

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Two test cases
console.log(diagonalPrime([[1,2,3],[5,6,7],[9,10,11]])) // 11
console.log(diagonalPrime([[1,2,3],[5,17,7],[9,11,10]])) // 17