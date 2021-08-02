// 1822. Sign of the Product of an Array
// There is a function signFunc(x) that returns:
// 1 if x is positive.
// -1 if x is negative.
// 0 if x is equal to 0.
// You are given an integer array nums. Let product be the product of all values in the array nums.
// Return signFunc(product).


// Solution: Calculate Product

// Keep a product variable set to 1 (if we set it to zero, whatever we multiply it by, it will remain 0)
// Loop through nums (pointer = i)
  // multiply product by nums[i]
// - when iteration finishes -
// If product is bigger than 0, return 1
// If product is smaller than 0, return -1
// If product is zero, return 0.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 40.1MB
  var arraySign = function(nums) {
    let product = 1;
    for (var i = 0; i < nums.length; i++) product *= nums[i];
    if (product > 0) return 1;
    else if (product < 0) return -1;
    return 0;
  };
  
  // Three test cases to run function on
  console.log(arraySign([-1,-2,-3,-4,3,2,1])) // 1
  console.log(arraySign([1,5,0,2,-3])) // 0
  console.log(arraySign([-1,1,-1,1,-1])) // -1