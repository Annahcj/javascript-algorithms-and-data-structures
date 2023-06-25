// 2748. Number of Beautiful Pairs
// You are given a 0-indexed integer array nums. A pair of indices i, j where 0 <= i < j < nums.length is called beautiful if the first digit of nums[i] and the last digit of nums[j] are coprime.
// Return the total number of beautiful pairs in nums.
// Two integers x and y are coprime if there is no integer greater than 1 that divides both of them. In other words, x and y are coprime if gcd(x, y) == 1, where gcd(x, y) is the greatest common divisor of x and y.


// Solution: 

// We can take advantage of the fact that we only care about one digit (1-9).
// Go through nums and keep track of the count of occurances of each first digit.
// For each nums[i], go through each digit from 1-9 and add the occurance count to the answer if nums[i] and the digit are coprime.

// n = length of nums, m = nums[i]
// Time Complexity: O(n log(m)) 133ms
// Space Complexity: O(1) 47MB
var countBeautifulPairs = function(nums) {
  let count = Array(10).fill(0), ans = 0;
  for (let num of nums) {
    let lastDigit = num % 10;
    for (let i = 1; i < 10; i++) {
      if (gcd(i, lastDigit) === 1) {
        ans += count[i];
      }
    }
    count[firstDigit(num)]++;
  }
  return ans;
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function firstDigit(num) {
  return Number(num.toString()[0]);
}

// Two test cases
console.log(countBeautifulPairs([2,5,1,4])) // 5
console.log(countBeautifulPairs([11,21,12])) // 2