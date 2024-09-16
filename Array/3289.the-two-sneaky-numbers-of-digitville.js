// 3289. The Two Sneaky Numbers of Digitville
// In the town of Digitville, there was a list of numbers called nums containing integers from 0 to n - 1. Each number was supposed to appear exactly once in the list, however, two mischievous numbers sneaked in an additional time, making the list longer than usual.
// As the town detective, your task is to find these two sneaky numbers. Return an array of size two containing the two numbers (in any order), so peace can return to Digitville.


// Solution: Modify Array In-place

// Re-use the input array nums by turning numbers into negatives when visited.
// When nums[index] is positive, that means it has been visited twice.

// Time Complexity: O(n) 43ms
// Space Complexity: O(1) 51.1MB
var getSneakyNumbers = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + 1; // offset all numbers by 1 to remove 0's
  }
  let sneaky = [];
  for (let num of nums) {
    let index = Math.abs(num);
    if (nums[index] < 0) {
      sneaky.push(index - 1);
    }
    nums[index] = -nums[index];
  }
  return sneaky;
};

// Three test cases
console.log(getSneakyNumbers([0,1,1,0])) // [0,1]
console.log(getSneakyNumbers([0,3,2,1,3,2])) // [2,3]
console.log(getSneakyNumbers([7,1,5,4,3,4,6,0,9,5,8,2])) // [4,5]