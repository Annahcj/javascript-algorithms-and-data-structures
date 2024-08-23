// 3260. Find the Largest Palindrome Divisible by K
// You are given two positive integers n and k.
// An integer x is called k-palindromic if:
  // x is a palindrome.
  // x is divisible by k.
// Return the largest integer having n digits (as a string) that is k-palindromic.
// Note that the integer must not have leading zeros.


// Solution: Ad hoc

// Rules for each k:

  // 1: 99999

  // 2: Last digit even -> 8999998

  // 3: Sum of digits divisible by 3 -> 999999 (sum of 9's are always divisible by 3 since 9 is a multiple of 3)

  // 4: Last two digits divisible by 4 -> 889999988

  // 5: Last digit 0 or 5 -> 59999995

  // 6: Last digit even and sum of digits divisible by 3 ->
    // If n is odd, 8998998 (8 is the maximum even digit, and 9 will keep the remainder the same. The middle digit determines the final divisibility and 8 is the maximum that works)
    // If n is even, 89977998 (8 is the maximum even digit, and 9 will keep the remainder the same. The two middle digits determine the final divisibility and 77 is the maximum that works)

  // 7: Pad the outsides with 9's, and change the middle digit(s) until the number is divisible by 7.
    // It's guaranteed that changing the middle digits(s) will end up with at least one number divisible by 7. 
    // e.g. 999_999 remainder
      // 0: 9990999     4
      // 1: 9991999     3
      // 2: 9992999     2
      // 3: 9993999     1
      // 4: 9994999     0
      // 5: 9995999     6
      // 6: 9996999     5
      // 7: 9997999     4
      // 8: 9998999     3
      // 9: 9999999     2
    // See that the numbers decrease by the same amount each digit.
    // Other amounts of 9's result in a different decrease/increase, i.e. might increase by 2, or decrease by 5, but always consistent for each number.
    // Find the remainder by finding the rolling remainder for every digit in the number (it's too big to keep as a number hence it needs to be a string).
    // For every digit from left to right, keep a running remainder: remainder = (remainder * 10 + digit) % 7
    // Proof: 
      // Modular addition rule: (a + b) % c = ((a % c) + (b % c)) % c
      // Modular multiplication rule: (a * b) % c = ((a % c) * (b % c)) % c

  // 8: Last three digits divisible by 8 -> 88899999888
    // If n <= 6, return 8 repeated n times.

  // 9: Sum of digits divisible by 9 -> 99999

// Time Complexity: O(n) 83ms
// Space Complexity: O(n) 53.4MB
function largestPalindrome(n, k) {
  if (k === 1 || k === 3 || k === 9) {
    return '9'.repeat(n);
  } 
  
  if (k === 2) {
    if (n <= 2) return '8'.repeat(n); // 8 or 88
    return `8${'9'.repeat(n - 2)}8`; // 89998
  }
  
  if (k === 4) {
    if (n <= 4) return '8'.repeat(n);
    return `88${'9'.repeat(n - 4)}88`; // 8899988
  }
  
  if (k === 5) {
    if (n <= 2) return '5'.repeat(n); // 5 or 55
    return `5${'9'.repeat(n - 2)}5`; // 59995
  }
  
  if (k === 6) {
    if (n <= 2) return '6'.repeat(n); // 6 or 66
    if (n % 2 === 1) {
      return `8${'9'.repeat((n - 3) / 2)}8${'9'.repeat((n - 3) / 2)}8`; // 8998998
    } else {
      return `8${'9'.repeat((n - 4) / 2)}77${'9'.repeat((n - 4) / 2)}8`; // 89977998 
    }
  }
  
  if (k === 7) {
    let num = Array(n).fill(9);
    for (let i = 9; i >= 0; i--) {
      num[Math.floor((n - 1) / 2)] = i;
      if (n % 2 === 0) {
        num[n / 2] = i;
      }
      if (isDivisibleBy7(num)) return num.join("");
    }
  }
  
  if (k === 8) {
    if (n <= 6) return '8'.repeat(n);
    return `888${'9'.repeat(n - 6)}888`;
  }
};

function isDivisibleBy7(num) {
  let remainder = 0;
  for (let digit of num) {
    remainder = (remainder * 10 + digit) % 7;
  }
  return remainder === 0;
}

// Three test cases
console.log(largestPalindrome(3, 5)) // "595"
console.log(largestPalindrome(1, 4)) // "8"
console.log(largestPalindrome(5, 6)) // "89898"