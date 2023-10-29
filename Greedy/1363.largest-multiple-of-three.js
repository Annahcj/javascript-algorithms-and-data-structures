// 1363. Largest Multiple of Three
// Given an array of digits digits, return the largest multiple of three that can be formed by concatenating some of the given digits in any order. If there is no answer return an empty string.
// Since the answer may not fit in an integer data type, return the answer as a string. Note that the returning answer must not contain unnecessary leading zeros.


// Solution: Greedy

// A number is divisible by 3 if the sum of all digits is divisible by 3.
// Initially we try to take all digits.

// The sum of the digits modulo 3, can be one of three cases: 
  // 0: The sum is already divisible by 3, so we take digits as it is.
  // 1: 
    // remove one digit: We need to remove one of (1, 4, 7) from digits to make the sum divisible by 3.
    // remove two digits: Remove any combination of two of (2, 5, 8).
  // 2: 
    // remove one digit: We need to remove one (2, 5, 8) from digits to make the sum divisible by 3.
    // remove two digits: Remove any combination of two of (1, 4, 7).

// When removing digits, it's always optimal to:
  // 1. Remove the least amount of digits. This means we always try to remove one digit instead of two.
  // 2. Remove the smallest digits.

// If we don't have any digit/digits we need to remove to make the sum divisible by 3, then we can never make a multiple of 3. 

// 1. Count the occurances of each digit in an array of size 10.
// 2. Try to remove (the smallest) one digit in order to make the sum of digits divisible by 3 (if already divisible, do nothing).
// 3. Try to remove (the smallest) two digits in order to make the sum of digits divisible by 3 (if already divisible, do nothing).
// 4. Construct the final number from largest digits to smallest based on the digit counts.

// n = length of digits
// Time Complexity: O(n) 130ms
// Space Complexity: O(1) (not including output) 47.5MB
var largestMultipleOfThree = function(digits) {
  let count = Array(10).fill(0), sum = 0;
  // 1. Count occurances of digits
  for (let digit of digits) {
    count[digit]++;
    sum += digit;
  }
  
  // 2. Try to remove one digit to make sum divisible by three
  let removeOneMap = {
    1: new Set([1, 4, 7]),
    2: new Set([2, 5, 8])
  };
  if (sum % 3 !== 0) {
    let removeOne = removeOneMap[sum % 3];
    for (let i = 1; i < 9; i++) {
      if (count[i] > 0 && removeOne.has(i)) {
        count[i]--;
        sum -= i;
        break;
      }
    }
  }
  
  // 3. Try to remove two digits to make sum divisible by three
  let removeTwoMap = {
    1: new Set([2, 5, 8]),
    2: new Set([1, 4, 7])
  }
  if (sum % 3 !== 0) {
    let removeTwo = removeTwoMap[sum % 3];
    for (let i = 1; i < 9; i++) {
      if (!removeTwo.has(i)) continue;
      while (sum % 3 !== 0 && count[i] > 0) {
        count[i]--;
        sum -= i;
      }
      if (sum % 3 === 0) break;
    }
  }

  if (sum % 3 !== 0) return "";
  if (sum === 0 && count[0] > 0) return '0';
  
  // 4. Construct final number
  let finalNum = "";
  for (let i = 9; i >= 0; i--) {
    let digit = i.toString();
    finalNum += digit.repeat(count[i]);
  }
  return finalNum;
};

// Three test cases
console.log(largestMultipleOfThree([8,1,9])) // "981"
console.log(largestMultipleOfThree([8,6,7,1,0])) // "8760"
console.log(largestMultipleOfThree([1])) // ""