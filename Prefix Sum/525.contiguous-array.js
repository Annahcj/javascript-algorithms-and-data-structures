// 525. Contiguous Array
// Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.


// Solution: Prefix Diff & Hashmap

// Go through nums and count the number of zeros and ones there are so far.
  // Get the difference: zeros count - ones count.
  // If the hashmap already contains the same diff, that means the amount of zeros and ones have increased by the same amount. 
    // The length of the subarray is i - map[diff].
    // Proof: Let's imagine 4 steps ago, there were 2 zeros and 1 one. If we now have 4 zeros and 3 ones, that means we have increased zeros and ones by the same amount.
  // Otherwise, add the diff with the current index into the map.

// Time Complexity: O(n) 106ms
// Space Complexity: O(n) 58.9MB
var findMaxLength = function(nums) {
  let n = nums.length, map = {0: -1};
  let diff = 0, maxLen = 0;
  for (let i = 0; i < n; i++) {
    diff += nums[i] === 1 ? 1 : -1;
    if (map[diff] !== undefined) {
      maxLen = Math.max(maxLen, i - map[diff]);
    } else {
      map[diff] = i;
    }
  }
  return maxLen;
};

// Two test cases
console.log(findMaxLength([0, 1])) // 2
console.log(findMaxLength([0,1,0])) // 2