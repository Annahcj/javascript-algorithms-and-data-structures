// 1295. Find Numbers with Even Number of Digits
// Given an array nums of integers, return how many of them contain an even number of digits.


// Solution: 

// To count the number of digits of a number, divide by 10 until it becomes 0.

// Time Complexity: O(n log(n)) 2ms
// Space Complexity: O(1) 54MB
function findNumbers(nums) {
  return nums.reduce((count, num) => {
    const digits = countDigits(num);
    if (digits % 2 === 0) {
      return count + 1;
    }
    return count;
  }, 0);
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
console.log(findNumbers([12,345,2,6,7896])) // 2
console.log(findNumbers([555,901,482,1771])) // 1