// 1248. Count Number of Nice Subarrays
// Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.
// Return the number of nice sub-arrays.


// Solution: Sliding Window

// Maintain a sliding window of k odd numbers.
// When the count of odd numbers exceeds k, move the left pointer up.

// To account for subarrays that start with even numbers, count the number of even numbers on the left of the first odd number in the subarray.
// This count determines the number of subarrays that would start with an even number, but still includes exactly k odd numbers.

// n = length of nums
// Time Complexity: O(n) 79ms
// Space Complexity: O(1) 58.1MB
var numberOfSubarrays = function(nums, k) {
  let n = nums.length, odd = 0;
  let leftEven = 0, subarrays = 0;
  for (let j = 0, i = 0; j < n; j++) {
    odd += nums[j] % 2 === 1 ? 1 : 0;
    while (odd > k) {
      odd -= nums[i] % 2 === 1 ? 1 : 0;
      i++;
      leftEven = 0; // reset even count on the left since we're moving the window up
    }
    if (odd === k) {
      // update the count of even numbers on the left side of the window
      while (nums[i] % 2 === 0) {
        leftEven++;
        i++;
      }
      subarrays += leftEven + 1;
    }
  }
  return subarrays;
};

// Three test cases 
console.log(numberOfSubarrays([1,1,2,1,1], 3)) // 2
console.log(numberOfSubarrays([2,4,6], 1)) // 0
console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2], 2)) // 16