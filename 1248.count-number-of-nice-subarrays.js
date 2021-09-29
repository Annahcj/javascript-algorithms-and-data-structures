// 1248. Count Number of Nice Subarrays
// Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.
// Return the number of nice sub-arrays.


// Solution: Sliding Window

// Keep a count of possible subarrays, and ans.
// Set left pointer to 0
// Loop through nums (pointer = right)
  // if nums[right] is an odd number, decrement k by one, set count to 0 (now the past count is disregarded)
  // loop while k is equal to 0
    // if nums[left] is odd, increment k by one
    // increment count by one
    // increment left by one
  // increment ans by count
// Return ans

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 48.8MB 
var numberOfSubarrays = function(nums, k) {
  let count = 0, ans = 0;
  let left = 0;
  for (var right = 0; right < nums.length; right++) {
    if (nums[right] % 2 === 1) k--, count = 0;
    while (k === 0) {
      if (nums[left] % 2 === 1) k++;
      count++;
      left++;
    }
    ans += count;
  }
  return ans;
};

// Three test cases to run function on
console.log(numberOfSubarrays([1,1,2,1,1], 3)) // 2
console.log(numberOfSubarrays([2,4,6], 1)) // 0
console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2], 2)) // 16