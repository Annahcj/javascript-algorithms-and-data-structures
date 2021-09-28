// 922. Sort Array By Parity II
// Given an array of integers nums, half of the integers in nums are odd, and the other half are even.
// Sort the array so that whenever nums[i] is odd, i is odd, and whenever nums[i] is even, i is even.
// Return any answer array that satisfies this condition.


// Solution: Stack

// Use two stacks of
  // 1. Even numbers in an odd index
  // 2. Odd numbers in an even index
// Then, 
  // continuously pop an index from evenNums and oddNums,  
  // swap the two numbers 
// Return nums

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 45.1MB
var sortArrayByParityII = function(nums) {
  let evenNums = [], oddNums = [];
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0 && i % 2 !== 0) {
      // even num, odd i
      evenNums.push(i);
    } else if (nums[i] % 2 === 1 && i % 2 === 0) {
      // odd num, even i
      oddNums.push(i);
    }
  } 
  while (evenNums.length) {
    let idx1 = evenNums.pop(), idx2 = oddNums.pop();
    let temp = nums[idx1];
    nums[idx1] = nums[idx2];
    nums[idx2] = temp;
  }
  return nums; 
};

// Three test cases to run function on
console.log(sortArrayByParityII([648,831,560,986,192,424,997,829,897,843])) // [4,5,2,7]
console.log(sortArrayByParityII([4,2,5,7])) // [4,5,2,7]
console.log(sortArrayByParityII([2,3])) // [2,3]