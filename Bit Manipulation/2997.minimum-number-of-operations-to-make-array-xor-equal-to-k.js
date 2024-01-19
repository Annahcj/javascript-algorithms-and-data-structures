// 2997. Minimum Number of Operations to Make Array XOR Equal to K
// You are given a 0-indexed integer array nums and a positive integer k.
// You can apply the following operation on the array any number of times:
// Choose any element of the array and flip a bit in its binary representation. Flipping a bit means changing a 0 to 1 or vice versa.
// Return the minimum number of operations required to make the bitwise XOR of all elements of the final array equal to k.
// Note that you can flip leading zero bits in the binary representation of elements. For example, for the number (101)2 you can flip the fourth bit and obtain (1101)2.


// Solution: Bit by Bit

// Go through each bit (up to the 31st position).
// For each bit, the final XOR for that bit will either be equal to the one in k, or not equal.
  // If the bit is already equal, we don't need any operations.
  // If the bit is not equal, we only need one operation to flip the result.

// Time Complexity: O(n) 89ms
// Space Complexity: O(1) 52.4MB
var minOperations = function(nums, k) {
  let finalXor = 0;
  for (let num of nums) {
    finalXor ^= num;
  }
  let operations = 0;
  for (let i = 0; i < 32; i++) {
    let finalXorBit = finalXor & (1 << i);
    let kBit = k & (1 << i);
    operations += finalXorBit === kBit ? 0 : 1;
  }
  return operations;
};

// Two test cases
console.log(minOperations([2,1,3,4], 1)) // 2
console.log(minOperations([2,0,2,0], 0)) // 0