// 992. Subarrays with K Different Integers
// Given an integer array nums and an integer k, return the number of good subarrays of nums.
// A good array is an array where the number of different integers in that array is exactly k.
// For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
// A subarray is a contiguous part of an array.


// Solution: Sliding Window w/ Hashmap

// Create a function 'subarrays', which counts the number of subarrays of any length with At MOST k distinct numbers
// subarrays: (k)
  // create a hashmap 'count' which records the frequency of each number
  // set left to 0, ans (answer) to 0

  // loop from 0 to n (pointer = right)
    // if count[nums[right]] is equal to 0 or null (new to the subarray anyway), decrement k by one
    // increment count[nums[right]] by one

    // loop while k is smaller than 0
      // decrement count[nums[left]] by one
      // if count[nums[left]] is equal to 0 (whichever is fastest), increment k by one
      // increment left pointer by one
    
    // add right - left + 1 to ans
  // return ans

// Return subarrays(k) - subarrays(k - 1) (this way, it returns the number of subsequences that contain exactly k distinct numbers)

// Time Complexity: O(n) 112ms
// Space Complexity: O(k) 47.2MB
var subarraysWithKDistinct = function(nums, k) {
  return subarrays(k) - subarrays(k - 1);

  function subarrays(k) {
    let count = {};
    let left = 0, ans = 0;
    for (let right = 0; right < nums.length; right++) {
      if (!count[nums[right]]) k--;
      count[nums[right]] = (count[nums[right]] || 0) + 1;
      while (k < 0) {
        count[nums[left]]--;
        if (count[nums[left]] === 0) k++;
        left++;
      }
      ans += right - left + 1;
    }
    return ans;
  }  
};

// Two test cases
console.log(subarraysWithKDistinct([1,2,1,2,3], 2)) // 7
console.log(subarraysWithKDistinct([1,2,1,3,4], 3)) // 3