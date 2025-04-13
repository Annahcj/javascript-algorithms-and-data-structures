// 3272. Find the Count of Good Integers
// You are given two positive integers n and k.
// An integer x is called k-palindromic if:
  // x is a palindrome.
  // x is divisible by k.
// An integer is called good if its digits can be rearranged to form a k-palindromic integer. For example, for k = 2, 2020 can be rearranged to form the k-palindromic integer 2002, whereas 1010 cannot be rearranged to form a k-palindromic integer.
// Return the count of good integers containing n digits.
// Note that any integer must not have leading zeros, neither before nor after rearrangement. For example, 1010 cannot be rearranged to form 101.


// Solution: Combinatorics

// We only need to know the first half of the palindrome.
// That will be at most 10^5 combinations, so we can iterate through every combination.
// For every combination,
  // 1. Construct the full number.
  // 2. Check that the number is valid:
    // a. It has leading zeros, skip it.
    // b. If not divisible by k, skip it.
  // 3. Count the number of valid permutations of the number that don't have leading zeros.
    // All permutations without leading zeros = For every non-zero digit, (n-1)!
    // Permutations without duplicates = Divide permutations by (occurances of 1 * occurances of 2 * occurances of 3 * ...).

// Note: Permutations can have duplicates even with different initial combinations, hence we need to keep track of the sorted combinations we have used in a hashset.

// Time Complexity: O(10^(n/2) * n) 1661ms
// Space Complexity: O(10^(n/2)) 69.1MB
function countGoodIntegers(n, k) {
  let totalPerms = 0;
  const seen = new Set();
  comb([]);
  return totalPerms;

  function comb(digits) {
    if (digits.length === Math.ceil(n / 2)) {
      const num = constructPalindrome(digits, n);
      // check for leading zeros and divisible by k, and haven't seen this combination before
      const sortedDigits = num.split("").sort().join("");
      if (isValid(num, k) && !seen.has(sortedDigits)) {
        const perms = countValidPerms(num);
        totalPerms += perms;
        seen.add(sortedDigits);
      }
      return;
    }
    for (let i = 0; i < 10; i++) {
      digits.push(i);
      comb(digits);
      digits.pop();
    }
  }
};

function constructPalindrome(digits, n) {
  const num = [...digits];
  for (let i = digits.length; i < n; i++) {
    num.push(digits[n - i - 1]);
  }
  return num.join("");
}

function isValid(num, k) {
  return num[0] !== '0' && parseInt(num) % k === 0;
}

function countValidPerms(num) {
  const count = Array(10).fill(0), n = num.length;
  let perms = 0;
  for (let digit of num) {
    count[parseInt(digit)]++;
    if (digit !== '0') {
      perms += factorial(n - 1);
    }
  }
  // remove duplicate permutations
  for (let i = 0; i < 10; i++) {
    if (count[i] > 0) {
      perms /= factorial(count[i]);
    }
  }
  return perms;
}

function factorial(n) {
  let ans = 1;
  while (n > 1) {
    ans *= n;
    n--;
  }
  return ans;
}

// Three test cases
console.log(countGoodIntegers(3, 5)) // 27
console.log(countGoodIntegers(1, 4)) // 2
console.log(countGoodIntegers(5, 6)) // 2468