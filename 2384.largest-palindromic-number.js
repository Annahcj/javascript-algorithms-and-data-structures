// 2384. Largest Palindromic Number
// You are given a string num consisting of digits only.
// Return the largest palindromic integer (in the form of a string) that can be formed using digits taken from num. It should not contain leading zeroes.
// Notes:
  // You do not need to use all the digits of num, but you must use at least one digit.
  // The digits can be reordered.
  

// Solution: Counting & Greedy

// 1. Count the number of occurances of each digit in num.

// 2. Construct the first half of the number. 
  // It is always optimal to put larger digits earlier on.
  // Going from 9 to 0, add digits to the end of result while the count > 1. 
  // We use two occurances per new digit since it needs to be symmetrical.

// 3. Get the largest possible single digit as the middle of the palindrome.

// 4. Add the second half of the palindrome. This is just the symmetrical right side of the left half.

// Time Complexity: O(n) 135ms
// Space Complexity: O(n) 54.2MB
var largestPalindromic = function(num) {
  let count = Array(10).fill(0);
  for (let char of num) {
    let digit = Number(char);
    count[digit]++;
  }

  let res = [];
  for (let i = 9; i >= 0; i--) {
    if (i === 0 && res.length === 0) break; // no leading zeros
    while (count[i] > 1) {
      res.push(i.toString());
      count[i] -= 2;
    }
  }
  
  let hasSingleMid = false;
  for (let i = 9; i >= 0; i--) {
    if (count[i] > 0) {
      res.push(i.toString());
      hasSingleMid = true;
      break;
    }
  }
  for (let i = res.length - (hasSingleMid ? 2 : 1); i >= 0; i--) {
    res.push(res[i]);
  }
  return res.join("");
};

// Three test cases to run function on
console.log(largestPalindromic("444947137")) // "7449447"
console.log(largestPalindromic("00009")) // "9"
console.log(largestPalindromic("0000")) // "0"