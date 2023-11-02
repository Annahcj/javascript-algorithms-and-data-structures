// 525. Contiguous Array
// Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.


// Solution: Prefix Sum & Hashmap

// Loop through nums and count the number of zeros and ones there are so far.
  // Get the difference: zeros count - ones count.
  // If the hashmap already contains the diff, that means the amount of zeros and ones have increased by the same amount. 
    // i - map.get(diff) = length of the subarray.
    // Proof: Let's imagine 4 steps ago, there were 2 zeros and 1 one. If we now have 4 zeros and 3 ones, that means we have increased zeros and ones by the same amount.
  // Otherwise, add the diff with the current index into the map.

// Time complexity: O(n) 139ms
// Space Complexity: O(n) 51.6MB
var findMaxLength = function(nums) {
  let map = new Map();
  map.set(0, -1); // for equal counts
  
  let zeros = 0, ones = 0;
  let ans = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === 0) zeros++;
    else ones++;
    
    let key = zeros - ones;
    if (map.has(key)) {
      ans = Math.max(ans, i - map.get(key));
    } else {
      map.set(key, i);
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(findMaxLength([0, 1])) // 2
console.log(findMaxLength([0,1,0])) // 2