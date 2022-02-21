// 2183. Count Array Pairs Divisible by K
// Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) such that:
  // 0 <= i < j <= n - 1 and
  // nums[i] * nums[j] is divisible by k.


// Solution: GCD

// e.g: k = 12
// a = 6, b = 8.

// The factors of 12 are: 1, 2, 3, 4, 6, 12

// The gcd of two numbers is the result of multiplying all its common prime factors together.
// The prime factors of k (12) is: 2 * 2 * 3

// gcd(6, 12) = 6 = 2 * 3
// gcd(8, 12) = 4 = 2 * 2

// 12 / 6 = 2. Meaning any other number which is divisible by 2 can be paired with 6.
// The prime factors of 8 are: 2 * 2 * 2. We don't care about any extra factors, as long as its divisble by 2, it can be paired together.
// In this example, 8 has three 2's, and can be paired together with 6.

// Let's try 8.
// 12 / 4 = 3. Meaning any other number which is divisble by 3 can be paired with 8.
// The prime factors of 6 are: 2 * 3. It can be paired with 8.

// 1. Record all factors of k.
// 2. For each number,
  // a. Get the gcd of k and the number.
  // b. Get the remainder: k / gcd. Then, any number divisble by this remainder can be paired with the current number.
  // c. Update the factor count for future numbers:
    // Add to the count of all factors of k where: nums % factor === 0.

// Time Complexity: O(n sqrt(n)) 283ms
// Space Complexity: O(k) 54.9MB
var countPairs = function(nums, k) {
  let factors = [], count = Array(k + 1).fill(0), ans = 0;
  for (let i = 1; i <= k; i++) {
    if (k % i === 0) factors.push(i);
  }
  for (let num of nums) {
    let gcd_num = gcd(k, num), rem = k / gcd_num;
    ans += count[rem];
    for (let factor of factors) {
      if (num % factor === 0) count[factor]++;
    }
  }
  return ans;
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases to run function on
console.log(countPairs([1,2,3,4,5], 2)) // 7
console.log(countPairs([1,2,3,4], 5)) // 0