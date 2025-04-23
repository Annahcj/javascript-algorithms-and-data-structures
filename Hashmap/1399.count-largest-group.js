// 1399. Count Largest Group
// You are given an integer n.
// Each number from 1 to n is grouped according to the sum of its digits.
// Return the number of groups that have the largest size.


// Solution: Hashmap & Counting

// Iterate through every number 1 through to n, and use a hashmap to keep track of the frequency of digit sums for every number.
// Keep track of the running maximum digit sum frequency, and also the frequency of numbers which have this maximum frequency.

// Note: The maximum sum of digits where n <= 10000 is 36 (9999).

// Time Complexity: O(n log(n)) 5ms
// Space Complexity: O(37) 54.2MB
function countLargestGroup(n) {
  const count = {};
  let maxCount = 0, maxCountFreq = 0;
  for (let i = 1; i <= n; i++) {
    const digitSum = sumDigits(i);
    count[digitSum] = (count[digitSum] || 0) + 1;
    const currCount = count[digitSum];
    if (currCount > maxCount) {
      maxCount = currCount;
      maxCountFreq = 1;
    } else if (currCount === maxCount) {
      maxCountFreq++;
    }
  }
  return maxCountFreq;
};

function sumDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

// Two test cases
console.log(countLargestGroup(13)) // 4
console.log(countLargestGroup(2)) // 2