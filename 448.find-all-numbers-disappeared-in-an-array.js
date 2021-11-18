// 448. Find All Numbers Disappeared in an Array
// Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.


// Solution: 

// Since the numbers are in the range of [1, n], we can use the indexes to our advantage.
// Modify the original array by turning the number at position nums[number - 1] (since they are 1-indexed) to a negative number to indicate that it exists.
// For e.g: [3,2,2] ->
  // 3: turn nums[2] to a negative number [3,2,-2]
  // 2: turns nums[1] to a negative number [3,-2,-2]
  // 2: since nums[1] is already negative, leave it. [3,-2,-2]
// Loop through nums, if nums[i] is negative, add i + 1 to our result array.
// Return the result array.

// Time Complexity: O(n) 108ms
// Space Complexity: O(1) 47MB
var findDisappearedNumbers = function(nums) {
  let n = nums.length;
  for (var i = 0; i < n; i++) {
    let num = Math.abs(nums[i]);
    if (nums[num - 1] > 0) nums[num - 1] = -nums[num - 1];
  }
  let res = [];
  for (i = 0; i < n; i++) {
    if (nums[i] > 0) res.push(i + 1);
  }  
  return res;
};

// Two test cases to run function on
console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1])) // [5,6]
console.log(findDisappearedNumbers([1,1])) // [2]