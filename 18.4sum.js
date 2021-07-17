// 18. 4Sum
// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target


// Solution 1: Universal K-Sum (with Two Sum)

// First sort the nums in asc order so we can use the two pointer/two sum technique.
// Call kSum with 4, 0(start position), target, and an empty array (to build up quadruplet).

// kSum: params -> k, start, target, arr
// If k is equal to two (we only have two more numbers until a quadruplet is formed), call twoSum on start, the last num of nums, target, and arr (which would now have two numbers in it already), and return.
// Otherwise loop through nums from the starting point until nums.length - k
  // call kSum with k - 1 (how many nums left till quad is formed), i + 1 (the next pos to check), target - nums[i] (the sum which the rest of the numbers must add up to), and [...arr, nums[i]] our quadruplet. 

// Two Sum: params -> i, j, target, arr
// Loop while i < j
  // if nums[i] + nums[j] is equal to target, push into results if we don't already have it.
  // if nums[i] + nums[j] is bigger than target, decrement j.
  // if nums[i] + nums[j] is smaller than target, increment i.

// Time Complexity: O(n^k-1) 120ms
// Space Complexity: O(unique quadruplets) (to check for duplicate quadruplets) 45.6MB
var fourSum = function(nums, target) {
    nums = nums.sort((a, b) => a - b);
    let result = [];
    let done = {};
    const kSum = (k, start, target, arr) => {
    if (k === 2) {
      twoSum(start, nums.length - 1, target, arr);
      return;
    }
    for (var i = start; i < nums.length - k + 1; i++) {
      kSum(k - 1, i + 1, target - nums[i], [...arr, nums[i]]);
    }
  }
  const twoSum = (i, j, target, arr) => {
    while (i < j) {
      let total = nums[i] + nums[j];
      if (total == target) {
        let combo = [...arr, nums[i], nums[j]];
        if (!done[combo]) result.push(combo);
        done[combo] = true;
        i++, j--;
      } else if (total > target) {
        j--;
      } else {
        i++;
      }
    }
  }
    kSum(4, 0, target, []);
    return result;
  };
  
  // Five test cases to run function on
  console.log(fourSum([-3,-1,0,2,4,5],0)) // [[-3,-1,0,4]]
  console.log(fourSum([0,0,0,0],0)) // [[0,0,0,0]]
  console.log(fourSum([2,2,2,2,2,2], 8)) // [[2,2,2,2]] 
  console.log(fourSum([1,0,-1,0,-2,2], 0)) // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
  console.log(fourSum([2,2,2,2,2], 8)) // [[2,2,2,2]]