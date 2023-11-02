// 1492. The kth Factor of n
// Given two positive integers n and k.
// A factor of an integer n is defined as an integer i where n % i == 0.
// Consider a list of all factors of n sorted in ascending order, return the kth factor in this list or return -1 if n has less than k factors.


// Solution: Brute Force

// Loop through from 1 to n (i), while keeping track of how many factors there currently are (by decrementing k)
  // if n is divisible by i, 
    // decrement k by one
    // if k is equal to 0, return i
// If the loop finishes, return -1 (not enough factors)

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 39MB
var kthFactor = function(n, k) {
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      k--;
      if (!k) return i;
    }
  }
  return -1;
};

// Five test cases
console.log(kthFactor(12, 3)) // 3
console.log(kthFactor(7, 2)) // 7
console.log(kthFactor(4, 4)) // -1
console.log(kthFactor(1, 1)) // 1
console.log(kthFactor(1000, 3)) // 4