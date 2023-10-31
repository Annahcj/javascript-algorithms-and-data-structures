// 2453. Destroy Sequential Targets
// You are given a 0-indexed array nums consisting of positive integers, representing targets on a number line. You are also given an integer space.
// You have a machine which can destroy targets. Seeding the machine with some nums[i] allows it to destroy all targets with values that can be represented as nums[i] + c * space, where c is any non-negative integer. You want to destroy the maximum number of targets in nums.
// Return the minimum value of nums[i] you can seed the machine with to destroy the maximum number of targets.


// Solution: Counting w/ Modulo 

// We can have up to <space> number of non-overlapping sequential sequences.
// Each nums[i] will be part of the sequence nums[i] % space.

// Go through nums and get the count of numbers in each sequence.
// Try to choose each nums[i], find the maximum count[nums[i] % space].

// n = length of nums, m = space
// Time Complexity: O(n) 115ms
// Space Complexity: O(min(n, m)) 56.6MB
var destroyTargets = function(nums, space) { 
  let count = new Map();
  for (let num of nums) {
    let seqIndex = num % space;
    count.set(seqIndex, (count.get(seqIndex) || 0) + 1);
  }
  
  let maxCount = 0, ans = 0;
  for (let num of nums) {
    let currCount = count.get(num % space);
    if (currCount >= maxCount) {
      ans = currCount === maxCount ? Math.min(ans, num) : num;
      maxCount = currCount;
    }
  }
  return ans;
};

// Three test cases
console.log(destroyTargets([3,7,8,1,1,5], 2)) // 1
console.log(destroyTargets([1,3,5,2,4,6], 2)) // 1
console.log(destroyTargets([6,2,5], 100)) // 2