// 1681. Minimum Incompatibility
// You are given an integer array nums​​​ and an integer k. You are asked to distribute this array into k subsets of equal size such that there are no two equal elements in the same subset.
// A subset's incompatibility is the difference between the maximum and minimum elements in that array.
// Return the minimum possible sum of incompatibilities of the k subsets after distributing the array optimally, or return -1 if it is not possible.
// A subset is a group integers that appear in the array with no particular order.


// Solution: Precompute Bitmasks & DP

// Precompute every bitmask with n/k bits and no duplicate numbers.
// Memoize every dp(currMask), where currMask = the bitmask of the current numbers we have taken.
// For dp(currMask), try taking every precomputed bitmask and only take the new mask if we don't have any overlapping bits.
// Return the minimum possible sum out of all combinations.

// n = length of nums, m = n/k
// Time Complexity: O(2^n * n^m) 873ms
// Space Complexity: O(2^n) 55.1MB
var minimumIncompatibility = function(nums, k) {
  let n = nums.length, allUsed = (1 << n) - 1;
  let masks = getValidMasks(nums, n / k); // precompute every valid mask with n/k 1-bits
  let memo = Array(1 << n).fill(-1);
  let res = dp(0);
  return res === Infinity ? -1 : res;
  
  function dp(currMask) {
    if (currMask === allUsed) return 0;  
    if (memo[currMask] !== -1) return memo[currMask];
    
    let ans = Infinity;
    for (let [mask, incompatibility] of masks) {
      if ((currMask & mask) !== 0) continue; // bits have overlap
      let newMask = currMask | mask;
      ans = Math.min(ans, incompatibility + dp(newMask));
    }
    return memo[currMask] = ans;
  }  
};

function getValidMasks(nums, m) {
  let masks = [], n = nums.length;
  for (let mask = 0; mask < (1 << n); mask++) {
    let oneBits = 0, set = new Set(), hasDuplicate = false;
    let min = Infinity, max = -Infinity;
    for (let j = 0; j < 32; j++) {
      if ((mask >> j) & 1) {
        let num = nums[j];
        if (set.has(num)) {
          hasDuplicate = true;
          break;
        }
        oneBits++;
        set.add(num);
        min = Math.min(min, num);
        max = Math.max(max, num);
      }
    }
    if (!hasDuplicate && oneBits === m) {
      masks.push([mask, max - min]);
    }
  }
  return masks;
}

// Three test cases
console.log(minimumIncompatibility([1,2,1,4], 2)) // 4
console.log(minimumIncompatibility([6,3,8,1,3,1,2,2], 4)) // 6
console.log(minimumIncompatibility([5,3,3,6,3,3], 3)) // -1