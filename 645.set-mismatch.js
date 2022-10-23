// 645. Set Mismatch
// You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.
// You are given an integer array nums representing the data status of this set after the error.
// Find the number that occurs twice and the number that is missing and return them in the form of an array.


// Solution: Mark Numbers as Negative

// Mark visited numbers as negative based on their index.
  // For a number 2, mark the number at index 2 as negative.
  // When we come across the duplicate number, if the number at the index nums[i] is negative, we have found a duplicate.
  // Since numbers are from 1 to n, offset all indexes by -1.

// Get the sum of all the numbers.
  // Subtract the duplicate number from the total sum. This is the sum with a missing number.
  // To get the missing number: sum of (1 + 2 + 3 + ... + n) - sum with missing number

// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 44.4MB
var findErrorNums = function(nums) {
  let n = nums.length, duplicate, sum = 0, nSum = 0;
  for (let i = 0; i < n; i++) {
    let num = nums[i];
    let index = Math.abs(num) - 1;
    if (nums[index] < 0) duplicate = Math.abs(num);
    nums[index] = -nums[index];
    sum += Math.abs(num);
    nSum += i + 1;
  }
  let sumWithMissingNum = sum - duplicate;
  return [duplicate, nSum - sumWithMissingNum];
};

// Two test cases
console.log(findErrorNums([1,2,2,4])) // [2,3]
console.log(findErrorNums([1,1])) // [1,2]