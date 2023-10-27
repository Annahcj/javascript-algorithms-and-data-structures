// 945. Minimum Increment to Make Array Unique
// You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.
// Return the minimum number of moves to make every value in nums unique.


// Solution: Sort

// Make each number one more than the previous number.

// Add the difference between nextNum (one more than previous num) and num, or 0. 
  // In the case of [1,3], nextNum for 3 is 2, so the difference is negative. 
  // We then set nextNum to be 3 + 1 (4).

// Time Complexity: O(n log(n)) 368ms
// Space Complexity: O(log(n)) (space for sorting) 54.4MB
var minIncrementForUnique = function(nums) {
  nums.sort((a, b) => a - b);
  
  let nextNum = nums[0], ans = 0;
  for (var num of nums) {
    ans += Math.max(nextNum - num, 0); 
    nextNum = Math.max(nextNum, num) + 1;
  }
  return ans;
};

// Two test cases
console.log(minIncrementForUnique([1,2,2])) // 1
console.log(minIncrementForUnique([3,2,1,2,1,7])) // 6