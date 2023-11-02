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

// Solution 2: K-Sum w/ Backtracking
// let res be the array in which we store our quadruplets
// First, sort nums in asc order.
// Call kSum([], 0, 4, target)
// return res

// kSum: (arr, start index, k, target)
  // if k is 2,
    // call twoSum(arr, start, target)
    // return
  // otherwise, loop through from start (pointer = i)
    // if i is not a duplicate,
      // push nums[i] into arr
      // call kSum(arr, i + 1, k - 1, target - nums[i])
      // pop nums[i] out of arr (backtrack)

// twoSum: (arr, start index, target)
  // set two pointers, i to start and j to nums.length - 1
  // loop while i is smaller than j
    // let sum be nums[i] + nums[j]
    // if sum is equal to target (found an answer!)
      // make a deep copy of arr and push it together with nums[i] and nums[j] into res
      // increment i and decrement j
      // increment i while nums[i] is a duplicate (equal to the number before it, we only need it once)
    // otherwise if sum is smaller than target, increment i by one
    // otherwise if sum is bigger than target, decrement j by one

// Time Complexity: O(n^(k-1) + n log(n)) 148ms
// Space Complexity: O(n) 41MB
var fourSum = function(nums, target) {
  let res = [];
  nums.sort((a, b) => a - b);
  kSum([], 0, 4, target);
  return res;

  function kSum(arr, start, k, target) {
    if (k === 2) {
      twoSum(arr, start, target);
      return;
    }
    for (var i = start; i < nums.length; i++) {
      if (i === start || nums[i] !== nums[i - 1]) {
        arr.push(nums[i]);
        kSum(arr, i + 1, k - 1, target - nums[i]);
        arr.pop();
      }
    }
  }

  function twoSum(arr, start, target) {
    let i = start, j = nums.length - 1;
    while (i < j) {
      let sum = nums[i] + nums[j];
      if (sum === target) {
        res.push([...arr, nums[i], nums[j]]);
        i++, j--;
        while (nums[i] === nums[i - 1]) i++;
      }
      else if (sum < target) i++;
      else j--;
    }
  }
};
  
// Five test cases to run function on
console.log(fourSum([-3,-1,0,2,4,5],0)) // [[-3,-1,0,4]]
console.log(fourSum([0,0,0,0],0)) // [[0,0,0,0]]
console.log(fourSum([2,2,2,2,2,2], 8)) // [[2,2,2,2]] 
console.log(fourSum([1,0,-1,0,-2,2], 0)) // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2,2,2,2,2], 8)) // [[2,2,2,2]]