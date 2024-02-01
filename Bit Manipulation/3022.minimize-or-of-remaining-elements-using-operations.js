// 3022. Minimize OR of Remaining Elements Using Operations
// You are given a 0-indexed integer array nums and an integer k.
// In one operation, you can pick any index i of nums such that 0 <= i < nums.length - 1 and replace nums[i] and nums[i + 1] with a single occurrence of nums[i] & nums[i + 1], where & represents the bitwise AND operator.
// Return the minimum possible value of the bitwise OR of the remaining elements of nums after applying at most k operations.


// Solution: Bit by Bit

// Starting from the most significant bit to the least significant, for each bit index check whether it's possible to remove all occurances of the set bits at that specific bit index.
// Accumulate the previous removed bits, so for each bit index which can be removed within k moves, add that bit to the result and check whether it's possible to remove the new bit, as well as all the other bits in the result.
  // e.g. We know it's possible to remove 1000 within k moves, so in the next iteration check whether it's possible to remove 1100 within k moves.

// To check whether it's possible to remove all set bits in a mask (e.g. 1010),
  // When we encounter a number which overlaps with the mask (num & mask > 0), combine nums[i] & nums[i + 1] until the total AND result becomes 0.
  // It's optimal to go from left-to-right until the total AND result becomes 0, because if the total AND result hasn't become 0, we know that each number still has overlap with the mask and needs to be combined with the next number anyway.
  // If the number of operations <= k, then it's possible.
  // Edge case: In the case where the total AND result > 0 and we reach the end of nums, we need to go backwards and combine it with a previous left number. The only case where this isn't possible is when the number of operations is n, meaning every number in the array overlaps with the mask.

// e.g. bit representation of nums = [0001,1010,1000,0010], mask = 1010
  // 1010 has overlap with mask (1010 & 1010 = 1010). 
    // Combine 1010 with 1000 (1010 & 1000 = 1000)
    // Combine 1000 with 0010 (1000 & 0010 = 0000)
  // Number of operations = 2

// Time Complexity: O(29n) 128ms
// Space Complexity: O(1) 59.8MB
var minOrAfterOperations = function(nums, k) {
  let n = nums.length, mask = 0;
  for (let bitIndex = 29; bitIndex >= 0; bitIndex--) {
    mask |= (1 << bitIndex);
    let i = 0, operations = 0;
    while (i < n) {
      if (nums[i] & mask) { // has overlap
        let overlap = nums[i] & mask;
        i++;
        while (i < n) {
          overlap &= nums[i];
          operations++;
          i++;
          if (overlap === 0) break;
        }
        if (overlap > 0) operations++; // reached the end of nums but there is still overlap, then we need to combine with a previous number
      } else {
        i++;
      }
    }
    if (operations > k) {
      mask ^= (1 << bitIndex); // unset the bit if this bit can't be removed
    }
  }
  return inverse(mask);
};

function inverse(mask) {
  let inverseMask = 0;
  for (let i = 0; i <= 29; i++) {
    let bitSet = mask & (1 << i);
    if (!bitSet) inverseMask |= (1 << i);
  }
  return inverseMask;
}

// Three test cases
console.log(minOrAfterOperations([1,10,8,2], 2)) // 0
console.log(minOrAfterOperations([3,5,3,2,7], 2)) // 3
console.log(minOrAfterOperations([10,7,10,3,9,14,9,4], 1)) // 15