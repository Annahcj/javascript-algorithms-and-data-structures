// 2507. Smallest Value After Replacing With Sum of Prime Factors
// You are given a positive integer n.
// Continuously replace n with the sum of its prime factors.
  // Note that if a prime factor divides n multiple times, it should be included in the sum as many times as it divides n.
// Return the smallest value n will take on.


// Solution:

// The sum of prime factors will always be less than or equal to the number itself.
// This is because adding will always result in less than multiplying (with the exception of multiplying by 1, however 1 will never be a prime factor).

// This means that the number will continue to grow smaller until the sum becomes equal to the original number.

var smallestValue = function(n) {
  let num = n, primeFactors = getPrimeFactors(n);
  while (primeFactors.length > 0) {
    let factorsSum = primeFactors.reduce((sum, num) => sum + num, 0);
    if (num === factorsSum) break;
    num = factorsSum;
    primeFactors = getPrimeFactors(num);
  }
  return num;
};

function getPrimeFactors(n) {
  let res = [];
  for (let x = 2; (x * x) <= n; x++) {
    // loop while n is divisible by x
    while (n % x === 0) {
      res.push(x);
      n /= x;
    }
  }
  if (n > 1) res.push(n);
  return res;
}

// Three test cases
console.log(smallestValue(15)) // 5
console.log(smallestValue(3)) // 3
console.log(smallestValue(4)) // 4