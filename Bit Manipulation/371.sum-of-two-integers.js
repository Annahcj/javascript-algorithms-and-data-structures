// 371. Sum of Two Integers
// Given two integers a and b, return the sum of the two integers without using the operators + and -.


// Solution: Bitwise XOR & AND

// Bitwise XOR will find the sum of a and b not including the carry.
// Bitwise AND will find the carry after adding a and b together. Since carry will get "carried" over to the left, we need to shift all bits 1 to the left.
// Until there is no more carry (b !== 0), 
  // 1. Get the sum not including carry.
  // 2. Get the carry.
  // 3. Set b to be the carry. (this way, we will add the carry to the sum on the next iteration).
// We keep adding the carry to the sum until there is no more carry.

// Time Complexity: O(1) 89ms
// Space Complexity: O(1) 41.8MB
var getSum = function(a, b) {
  while (b !== 0) {
    let carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
};

// Two test cases
console.log(getSum(1, 2)) // 3
console.log(getSum(2, 3)) // 5