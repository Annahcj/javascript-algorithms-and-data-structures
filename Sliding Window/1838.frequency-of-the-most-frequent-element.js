// 1838. Frequency of the Most Frequent Element
// The frequency of an element is the number of times it occurs in an array.
// You are given an integer array nums and an integer k. In one operation, you can choose an index of nums and increment the element at that index by 1.
// Return the maximum possible frequency of an element after performing at most k operations.


// Solution: Sort & Sliding Window

// For all elements within a window, the difference of e.g: [1,2,4] with [4,4,4] (turning 1 and 2 into 4) must be less than or equal to k.

// e.g: [1,2,4], k = 2.
// 0: sum = 1, sum + k is greater than 1 * 1. Max freq = 1
// 1: sum = 3, sum + k is greater than 2 * 2. Max freq = 2
// 2: sum = 7,  
  // 7 + k is less than 4 * 3. Move left pointer up, subtract nums[i] from sum. Sum = 6.
  // 6 + k is equal to 4 * 2. Max freq = 2.

// ans = 2.

// Time Complexity: O(n log(n)) 258ms
// Space Complexity: O(log(n)) (space for sorting) 57.4MB
var maxFrequency = function(nums, k) {
  nums.sort((a, b) => a - b);
  
  let i = 0, n = nums.length;
  let sum = 0, ans = 1;
  for (let j = 0; j < n; j++) {
    sum += nums[j];
    while (sum + k < nums[j] * (j - i + 1)) { 
      sum -= nums[i++];
    }
    ans = Math.max(ans, j - i + 1);
  }
  return ans;
};

// Two test cases
console.log(maxFrequency([1,2,4], 5)) // 3
console.log(maxFrequency([1,4,8,13], 5)) // 2