// 1955. Count Number of Special Subsequences
// A sequence is special if it consists of a positive number of 0s, followed by a positive number of 1s, then a positive number of 2s.
// For example, [0,1,2] and [0,0,1,1,1,2] are special.
// In contrast, [2,1,0], [1], and [0,1,2,0] are not special.
// Given an array nums (consisting of only integers 0, 1, and 2), return the number of different subsequences that are special. Since the answer may be very large, return it modulo 109 + 7.
// A subsequence of an array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements. Two subsequences are different if the set of indices chosen are different.


// Solution: Dynamic Programming

// Thoughts:
// We can use dynamic programming to store number of special subsequences
// For e.g: [0,1,2,2]
// The three special subsequences are 
// [0,1,2,2]
//  - - -
// [0,1,2,2]
//  - -   -
// [0,1,2,2]
//  - - - -
// One thing to note is that the subsequence can be of any length, as long as it follows the rules.
// We can create an array 'dp' with the initial setting of [1, 0, 0, 0].
// We loop through nums (pointer = i)
// If nums[i] is 0, it would be the start of a special subsequence, so we increment dp[1] (we use a dummy head) by dp[0] (always will be one)
// If nums[i] is 1, we check how many zeros have been recorded up to this point, set dp[2] to itself + dp[2] + dp[1],
// If nums[i] is 2, we check how many sequences of zeros + ones (in increasing order) have been recorded up to this point, set dp[3] to itself + dp[3] + dp[2]
// We would then return dp[3] (counts for subsequences of zeros, ones, and twos in increasing order)

// Algorithm:
// Set dp to [1, 0, 0, 0], mod to 1000000007
// Loop through nums (pointer = i)
  // Since we have a dummy head for zeros, the correct index we would need to search for is nums[i] + 1, so we set num to nums[i] + 1.
  // Set dp[num] to itself + itself + dp[num - 1] MOD 1000000007
// Return dp[3]

// Time Complexity: O(n) 124ms
// Space Complexity: O(1) 51.3MB
var countSpecialSubsequences = function(nums) {
  let dp = [1, 0, 0, 0], mod = 1000000007;
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i] + 1;
    dp[num] = (dp[num] + dp[num] + dp[num - 1]) % mod;
  }
  return dp[3];
};

// Three test cases
console.log(countSpecialSubsequences([0,1,2,2])) // 3
console.log(countSpecialSubsequences([2,2,0,0])) // 0
console.log(countSpecialSubsequences([0,1,2,0,1,2])) // 7