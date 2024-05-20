// 3153. Sum of Digit Differences of All Pairs
// You are given an array nums consisting of positive integers where all integers have the same number of digits.
// The digit difference between two integers is the count of different digits that are in the same position in the two integers.
// Return the sum of the digit differences between all pairs of integers in nums.


// Solution: Counting

// Deal with each digit position separately.
// For a position j, get the count of occurances for each digit.
// For each digit, count the number of different digits and get the number of pairs: same digit count * different digit count

// n = length of nums, k = number of digits
// Time Complexity: O(n * (k + 10)) 113ms
// Space Complexity: O(10) = O(1) 60.7MB
var sumDigitDifferences = function(nums) {
  let digits = countDigits(nums[0]);
  let n = nums.length, sum = 0;
  for (let j = 0; j < digits; j++) {
    let digitCount = Array(10).fill(0);
    for (let i = 0; i < n; i++) {
      let powTen = 10 ** j;
      let digit = Math.floor(nums[i] / powTen) % 10;
      digitCount[digit]++;
    }
    let digitsLeft = n;
    for (let digit = 0; digit < 10; digit++) {
      sum += digitCount[digit] * (digitsLeft - digitCount[digit]);
      digitsLeft -= digitCount[digit];
    }
  }
  return sum;
};

function countDigits(num) {
  let digits = 0;
  while (num > 0) {
    num = Math.floor(num / 10);
    digits++;
  }
  return digits;
}

// Two test cases
console.log(sumDigitDifferences([13,23,12])) // 4
console.log(sumDigitDifferences([10,10,10,10])) // 0