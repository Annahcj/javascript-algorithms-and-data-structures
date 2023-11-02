// 60. Permutation Sequence
// The set [1, 2, 3, ..., n] contains a total of n! unique permutations.
// By listing and labeling all of the permutations in order, we get the following sequence for n = 3:
  // 1. "123"
  // 2. "132"
  // 3. "213"
  // 4. "231"
  // 5. "312"
  // 6. "321"
// Given n and k, return the kth permutation sequence.


// Solution: Logic

// Increasing the ith digit will result in passing (n-i-1)! permutations in sorted order.
// For each digit[i], find the digit where the amount of permutations that we passed + one more round of permutations exceeds the current k.
// When we have found that digit, reduce k by the amount of permutations we passed and move on to the next digit.

// e.g: n = 3, k = 5
  // "123"
  // "132"
  // "213"
  // "231"
  // "312"
  // "321"
// First digit: 3
  // If we use digit "1", there are 2! (2) permutations.
  // If we use digit "2", there are 2! + 2! (4) permutations.
  // If we use digit "3", there are 2! + 2! + 2! (6) permutations.
  // Remove 4 from k (since we have passed 4 permutations), k is now 1
// Second digit: 1
  // If we use digit "1", there is 1! (1) permutation.
  // Remove 1 from k, k is now 0.
// For the final digit, take the remaining digit 2.
// The result is "312".

// Time Complexity: O(n^2) 65ms
// Space Complexity: O(n) 42.7MB
var getPermutation = function(n, k) {
  let digits = Array(n).fill(0).map((_, i) => (i + 1).toString());
  let res = "";
  for (let i = 0; i < n - 1; i++) {
    let perms = 0, amount = factorial(n - i - 1), index = 0;
    while (perms + amount < k) index++, perms += amount;
    res += digits[index];
    k -= perms;
    digits.splice(index, 1);
  }
  return res + digits[0];
};

function factorial(n) {
  let res = 1;
  while (n > 0) {
    res *= n;
    n--;
  }
  return res;
}

// Three test cases
console.log(getPermutation(3, 3)) // "213"
console.log(getPermutation(4, 9)) // "2314"
console.log(getPermutation(3, 1)) // "123"