// 1822. Sign of the Product of an Array
// There is a function signFunc(x) that returns:
// 1 if x is positive.
// -1 if x is negative.
// 0 if x is equal to 0.
// You are given an integer array nums. Let product be the product of all values in the array nums.
// Return signFunc(product).


// Solution: Logic

// If nums contains at least one 0, the product will be 0.
// If there is an even number of negative numbers, the product will be positive. 
// If there is an odd number of negative numbers, the product will be negative.

// Time Complexity: O(n) 62ms
// Space Complexity: O(1) 44.6MB
var arraySign = function(nums) {
  let negative = 0;
  for (let num of nums) {
    if (num === 0) return 0;
    negative += num < 0 ? 1 : 0;
  }
  return negative % 2 === 1 ? -1 : 1;
};
  
// Three test cases to run function on
console.log(arraySign([-1,-2,-3,-4,3,2,1])) // 1
console.log(arraySign([1,5,0,2,-3])) // 0
console.log(arraySign([-1,1,-1,1,-1])) // -1