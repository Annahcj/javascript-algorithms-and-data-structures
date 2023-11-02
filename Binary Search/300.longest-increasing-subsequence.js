// 300. Longest Increasing Subsequence
// Given an integer array nums, return the length of the longest strictly increasing subsequence.
// A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].


// Solution 1: Brute Force w/ Dynamic Programming

// Thoughts:
// We can use an array the length of nums, filled with 1's initially.
// For every number in nums (pointer = i), 
  // check every previous number from 0 to i (pointer = j)
    // If nums[j] is smaller than nums[i], set dp[i] to Math.max(dp[i], dp[j] + 1) 
    // (this works because if we store the length of the sequence, any number bigger than the last number in the sequence must be part of an increasing subsequence)

// For e.g: [0,1,0,3,2,3]

// i = 1, nums[i] = 1, dp = [1,1,1,1,1,1]
  // j = 0, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (1), dp[j] + 1 (2)). (dp is now [1,2,1,1,1,1])

// i = 2, nums[i] = 0, dp = [1,2,1,1,1,1]
  // j = 0, nums[j] = 0: nums[j] is not smaller than nums[i], so we move on.
  // j = 1, nums[j] = 1: nums[j] is not smaller than nums[i], so we move on.

// i = 3, nums[i] = 3, dp = [1,2,1,1,1,1]
  // j = 0, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (1), dp[j] + 1 (2)) (dp is now [1,2,1,2,1,1])
  // j = 1, nums[j] = 1: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (2), dp[j] + 1 (3)) (dp is now [1,2,1,3,1,1])
  // j = 2, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (3), dp[j] + 1 (2)).

// i = 4, nums[i] = 2, dp = [1,2,1,3,1,1]
  // j = 0, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (1), dp[j] + 1 (2)) (dp is now [1,2,1,3,2,1])
  // j = 1, nums[j] = 1: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (2), dp[j] + 1 (3)) (dp is now [1,2,1,3,3,1])
  // j = 2, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (3), dp[j] + 1 (2)).
  // j = 3, nums[j] = 3: nums[j] is not smaller than nums[i], so we move on.

// i = 5, nums[i] = 3, dp = [1,2,1,3,3,1]
  // j = 0, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (1), dp[j] + 1 (2)) (dp is now [1,2,1,3,3,2])
  // j = 1, nums[j] = 1: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (2), dp[j] + 1 (3)) (dp is now [1,2,1,3,3,3])
  // j = 2, nums[j] = 0: nums[j] is smaller than nums[i], so we set dp[i] to Math.max(dp[i] (3), dp[j] + 1 (2)).
  // j = 3, nums[j] = 3: nums[j] is not smaller than nums[i], so we move on.
  // j = 4, nums[j] = 2: nums[j] is smaller than nums[i], so we set dp[i] to Math..max(dp[i] (3), dp[j] + 1 (4)). 
  // dp is now [1,2,1,3,3,4]
  // We loop through dp and find the maximum number.
  // Return the maximum number (4).

// Algorithm:
// Initiate a dp array the length of nums, fill it with 1's.
// Loop through nums from 1 to n - 1 (pointer = i)
  // Loop through nums from 0 to i (pointer = j)
    // If nums[j] is smaller than nums[i]
      // Set dp[i] to Math.max(dp[i], dp[j] + 1) (dp[j] + 1 since we are adding one more number to the sequence)
// Loop through dp and find the maximum number.
// Return the max.

// Time Complexity: O(n^2) 176ms
// Space Complexity: O(n) 40.3MB
  var lengthOfLIS = function(nums) {
    let n = nums.length, max = 1;
    let dp = Array(n).fill(1);
    for (var i = 1; i < nums.length; i++) {
      for (var j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }
    for (var h = 0; h < dp.length; h++) max = Math.max(max, dp[h]);
    return max;
  };
  
  
  // Solution 2: Binary Search
  
  // Thoughts:
  // We can intelligently build a sequence.
  // The sequence which we build will always be in increasing order, so the last number is always the biggest number.
  // For e.g: [3,4,5,1,2,3,4]
  // seq = [3] (initialize it with the first item)
  // i = 1, nums[i] = 4, seq = [3]: last num in seq is smaller than nums[i], so we push it in seq.
  // i = 2, nums[i] = 5, seq = [3,4]: last num in seq (4) is smaller than nums[i], so we push it in seq.
  // i = 3, nums[i] = 1, seq = [3,4,5]: last num (5) is bigger than nums[i] (1), so we search for the first num greater than or equal to nums[i]. That number is 3, so we replace 3 with 1.
  // (this logic works because numbers are always increasing, so it doesn't matter if numbers are wrong as long as they are smaller)
  // i = 4, nums[i] = 2, seq = [1,4,5]: last num (5) is bigger than nums[i] (2), so we replace 4 with 2.
  // i = 5, nums[i] = 3, seq = [1,2,5]: last num (5) is bigger than nums[i] (3), so we replace 5 with 3.
  // i = 6, nums[i] = 4, seq = [1,2,3]: last num is smaller than nums[i], so we push it in seq.
  
  // Return the length of seq (4)
  
  // Algorithm:
  // Initiate seq to an array with nums[0].
  // Loop through nums (pointer = i)
    // If last item in seq is smaller than nums[i], push it into seq.
    // Else, call binarySearch for nums[i] (this will find the index of first number greater than or equal to nums[i]) and replace it with nums[i].
  // When iteration is finished, return length of seq.
  
  // Time Complexity: O(n log(n)) 80ms
  // Space Complexity: O(n) 40.5MB
  var lengthOfLIS = function(nums) {
    let seq = [nums[0]];
    for (var i = 1; i < nums.length; i++) {
      if (seq[seq.length - 1] < nums[i]) seq.push(nums[i]);
      else {
        let idx = binarySearch(nums[i]);
        seq[idx] = nums[i];
      }
    }
    function binarySearch(num) {
      let l = 0, r = seq.length;
      while (l < r) {
        let mid = Math.floor((l + r) / 2);
        if (seq[mid] < num) l = mid + 1;
        else if (seq[mid] >= num) r = mid;
      }
      return l;
    }
    return seq.length;
  };
  
  // Four test cases to run function on
  console.log(lengthOfLIS([1,3,6,7,9,4,10,5,6])) // 6
  console.log(lengthOfLIS([10,9,2,5,3,7,101,18])) // 4
  console.log(lengthOfLIS([0,1,0,3,2,3])) // 4
  console.log(lengthOfLIS([7,7,7,7,7,7,7])) // 1