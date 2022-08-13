// 798. Smallest Rotation with Highest Score
// You are given an array nums. You can rotate it by a non-negative integer k so that the array becomes [nums[k], nums[k + 1], ... nums[nums.length - 1], nums[0], nums[1], ..., nums[k-1]]. Afterward, any entries that are less than or equal to their index are worth one point.
  // For example, if we have nums = [2,4,1,3,0], and we rotate by k = 2, it becomes [1,3,0,2,4]. This is worth 3 points because 1 > 0 [no points], 3 > 1 [no points], 0 <= 2 [one point], 2 <= 3 [one point], 4 <= 4 [one point].
// Return the rotation index k that corresponds to the highest score we can achieve if we rotated nums by it. If there are multiple answers, return the smallest such index k.


// Solution: Math Logic

// Two cases:
  // Gain a point: We know for sure that rotating nums[0] to nums[n - 1] will gain a point.
  // Lose a point: When nums[i] is rotated to an index smaller than nums[i], we lose a point.
    // Populate lose, where lose[k] = the amount of points we lose when rotating k times. 
    // The formula is: i - nums[i] + 1 (rotations to move nums[i] to position nums[i])
    // and to account for negative indexes: (i - nums[i] + 1 + n) % n
    // Since we lose a point if the rotations >= k, we can use prefix sum to accumulate the points we lose.
// Find the index k where we lose the least number of points.

// Credit to Lee215 for the solution idea.

// Time Complexity: O(n) 73ms
// Space Complexity: O(n) 52.4MB
var bestRotation = function(nums) {
  let n = nums.length, lose = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    lose[(i - nums[i] + 1 + n) % n]--;
  }
  let ans = 0;
  for (let i = 1; i < n; i++) {
    lose[i] += lose[i - 1] + 1;
    if (lose[i] > lose[ans]) ans = i;
  }
  return ans;
};

// Two test cases to run function on
console.log(bestRotation([2,3,1,4,0])) // 3
console.log(bestRotation([1,3,0,2,4])) // 0